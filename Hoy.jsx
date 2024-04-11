import { useState, useEffect, useRef, useContext } from "react"
import { Link } from "react-router-dom";
import Loader from "../../Componentes/globales/Loader/Loader";
import { Recomendar } from "../../Componentes/Hoy/Recomendar"
import { ClimaDeHoy } from "../../Componentes/Hoy/ClimaDeHoy";

//llamados a back
import { listarCultivos } from "../../peticiones/cultivos";
import { listarCultivosDataName } from "../../peticiones/cultivos";
import { actualizarEstado } from "../../peticiones/cultivos";
import { listarUsuarioId } from "../../peticiones/usuarios";

//iconos
import { FaRegCheckSquare } from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";
import LogoDark from "../../assets/Iconos/exito-darkmode.png"
import LogoClaro from "../../assets/Iconos/exito.png"

//estilos
import { Accordion } from "flowbite-react";
import { Tema } from "../../App";


export function Hoy(){
    const {darkMode} = useContext(Tema)
    const [loaded, setLoaded] = useState(false);
    const [cultivosUser, setCultivosUser] = useState([]);
    const [fechaHoy, setFechaHoy] = useState(new Date());

    const [climaHoy, setClimaHoy] = useState();
    const [temperaturaHoy, setTemperaturaHoy] = useState();

    const [tareasRiego, setTareasRiego] = useState([]);
    const [tareasPoda, setTareasPoda] = useState([]);
    const [tareasFertilizante, setTareasFertilizante] = useState([]);
    const [tareasPesticida, setTareasPesticida] = useState([]);

    //por ahora
    const [usuarioId, setUsuarioId] = useState(localStorage.getItem("usuarioId"));

    const cantidadRiego = useRef()
    const diasTotalesRef = useRef()
    
    var podaLista = []
    var riegoLista = []
    var fertilizanteLista = []
    var fumigarLista = []


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 2000); // Tiempo en milisegundos para simular la carga

        async function datosClima() {
            try {
                const dataUsuario = await listarUsuarioId(usuarioId)
                console.log('DATA',dataUsuario)

                try {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${dataUsuario.latitud}&longitude=${dataUsuario.longitud}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&forecast_days=1`);
                    if (!response.ok) {
                        throw new Error('Error en la solicitud a la API');
                    }
                    const data = await response.json();
                    console.log('clima', data)
                    setTemperaturaHoy(data.current.temperature_2m)

                    console.log('datos', data.current_units.temperature_2m)

                    setClimaHoy({
                        temperatura: data.current.temperature_2m,
                        temperaturaMedida: data.current_units.temperature_2m,
                        humedad: data.current.relative_humidity_2m,
                        humedadMedida: data.current_units.relative_humidity_2m,
                        vviento: data.current.wind_speed_10m,
                        vvientoMedida: data.current_units.wind_speed_10m,
                        dviento: data.current.wind_direction_10m,
                        dvientoMedida: data.current_units.wind_direction_10m,
                        codigo: data.current.weather_code
                    })
                } catch (error) {
                    console.log('error en la API', error)
                }

            } catch (error) {
                console.log(error)
                throw error
            }

        }
        datosClima()

        async function guardarCultivos() {
            const cultivos = await listarCultivos(usuarioId);
            //por ahora la prueba con el priemro
            setCultivosUser(cultivos);
            console.log(cultivos)
        }
        guardarCultivos();
        
        return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
    }, []);

    useEffect(() => {
        if (cultivosUser && cultivosUser.length != 0) {
            (async () => {
                for (const cultivo of cultivosUser) {
                    var cultivoData = {};
    
                    try {
                        const data = await listarCultivosDataName(cultivo.cultivo)
                        cultivoData = data[0]
                    } catch (error) {
                        return console.log(error)
                    }
    
                    const fecha1 = new Date(cultivo.plantacion)
                    const fecha2 = new Date(fechaHoy)
                    await calcularDias(fecha1, fecha2)
    
                    //regar
                    if (cultivo.regar) {
                        for (let i=0;i<cultivo.regar.dias.length ;i++){
                            if(diasTotalesRef.current === cultivo.regar.dias[i]) {
                                const minimo = cultivoData.temperatura.minima
                                const medio = cultivoData.temperatura.media
                                const maximo = cultivoData.temperatura.maxima

                                await cantidadAgua(temperaturaHoy, minimo, medio, maximo, cultivoData)
                                riegoLista=[...riegoLista, {regar: true, estado:[i, cultivo.regar.hecho[i]], nombre: cultivo.nombre, idCultivo:cultivo._id, cantidad: cantidadRiego.current*cultivo.numeroCultivos}];
                            }
                        }
                    }
                    setTareasRiego(riegoLista)

                    //podar
                    if (cultivo.podar) {
                        for (let i=0;i<cultivo.podar.dias.length ;i++){
                            if(diasTotalesRef.current === cultivo.podar.dias[i]) {
                                podaLista=[...podaLista, {podar: true, estado:[i, cultivo.podar.hecho[i]], nombre: cultivo.nombre}];
                            }
                        }
                    }
                    setTareasPoda(podaLista)

                    //fertilizar
                    if (cultivo.fertilizar) {
                        for (let i=0;i<cultivo.fertilizar.dias.length ;i++){
                            if(diasTotalesRef.current === cultivo.fertilizar.dias[i]) {
                                fertilizanteLista=[...fertilizanteLista, {fertilizar: true, estado:[i, cultivo.fertilizar.hecho[i]], nombre: cultivo.nombre}];
                            }
                        }
                    }
                    setTareasFertilizante(fertilizanteLista)

                    //pesticida
                    if (cultivo.fumigar) {
                        fumigarLista=[...fumigarLista, {fumigar: true, estado:[1, cultivo.fumigar.hechos[1]], nombre: cultivo.nombre, cantidad: cultivo.fumigar.cantidad*cultivo.numeroCultivos, medida: cultivo.fumigar.medida, pesticida: cultivo.fumigar.pesticida}];
                        for (let i=0;i<cultivo.fumigar.dias.length ;i++){
                            if(diasTotalesRef.current === cultivo.fumigar.dias[i]) {
                                fumigarLista=[...fumigarLista, {fumigar: true, estado:[i, cultivo.fumigar.hechos[i]], nombre: cultivo.nombre, cantidad: cultivo.fumigar.cantidad*cultivo.numeroCultivos, medida: cultivo.fumigar.medida, pesticida: cultivo.fumigar.pesticida}];
                            }
                        }
                    }
                    setTareasPesticida(fumigarLista)
                }
            })();
        } else {
            console.log('no hay cultivos')
        }
    }, [cultivosUser]);

        //funciones
    async function calcularDias(fecha1, fecha2) {
        var cont = 0;
        for (let i = 0; fecha1 <= fecha2; i++) {
            fecha1.setDate(fecha1.getDate() + 1);
            cont++
            // console.log('soy', cultivo.nombre,'tengo días', cont, 'mi fecha es', fecha1)
        }
        // console.log('tengo días', cont)
        diasTotalesRef.current =  cont
    }

    async function Check(e, posicion, id, tarea, estado, lista, actualizarLista) {
        e.preventDefault();
        var cambio;
        if(estado === 0 ){
            cambio = 1;
        } else {
            cambio = 0
        }
        try {
            await actualizarEstado(posicion, id, tarea, cambio)
            const nuevasTareas = [...lista];
            const tareaIndex = nuevasTareas.findIndex(tarea => tarea.idCultivo === id);
            nuevasTareas[tareaIndex].estado[1] = cambio;
            actualizarLista(nuevasTareas);
        } catch (error) {
            console.log(error)
        }
    }

    async function cantidadAgua(temperaturaHoy, minimo, medio, maximo, cultivoData) {
        const diferencia1 = Math.abs(temperaturaHoy - minimo)
        const diferencia2 = Math.abs(temperaturaHoy - medio)
        const diferencia3 = Math.abs(temperaturaHoy - maximo)

        const diferenciaMin = Math.min(diferencia1, diferencia2, diferencia3)

        if (diferenciaMin === diferencia1) {
            cantidadRiego.current = cultivoData.riego.cantidadBaja
        } else if (diferenciaMin === diferencia2) {
            cantidadRiego.current = cultivoData.riego.cantidadMedia
        } else {
            cantidadRiego.current = cultivoData.riego.cantidadAlta
        }
    }
    
    return(
        <>
        {!loaded ? (
          <Loader /> // Muestra el loader mientras se simula la carga
        ) : (
        <div className="flex flex-col py-12 gap-8 items-center">
            <h1 className="dark:text-white text-Verde-oscuro-800 font-titulo text-2xl text-center">Hoy es {fechaHoy.toLocaleDateString()} </h1>

            <ClimaDeHoy climaHoy={climaHoy} fechaHoy={fechaHoy} />

            <Recomendar/>

            <h2 className="dark:text-white text-Verde-oscuro-800 font-titulo text-2xl text-center mt-10">Todas tus Tareas de Hoy</h2>
            {
                tareasRiego.length > 0 || tareasFertilizante.length > 0 || tareasPesticida.length > 0 || tareasPoda.length > 0 ?
                <section className="w-full md:w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">

                    {
                        tareasRiego.length > 0 ?
                        <section className="pb-8 pt-4">
                            <Accordion collapseAll className="border-none w-full">
                                <Accordion.Panel defaultOpen className="border-none ">
                                    <Accordion.Title className="dark:text-white dark:bg-Verde-oscuro-800 dark:hover:bg-Verde-oscuro-800 hover:bg-Verde-claro-800 bg-Verde-claro-800 border-none text-Verde-oscuro-800 text-2xl font-titulo focus:ring-0 focus:ring-transparent first:rounded-none md:first:rounded-t">
                                        Riego:
                                    </Accordion.Title>
                                    <Accordion.Content className=" dark:bg-Verde-claro-800 bg-Verde-claro-400 border-none last:rounded-none">
                                        <ul className="text-Verde-oscuro-800 flex flex-col gap-4">
                                            {
                                                tareasRiego.map((p, i) => {
                                                    // console.log('soy p', p);
                                                    return (
                                                        <>
                                                            <li key={i} className="text-lg flex gap-4 items-center">
                                                                <button 
                                                                    onClick={(e) => Check(e, p.estado[0], p.idCultivo, 'regar', p.estado[1], tareasRiego, setTareasRiego)}> 
                                                                    {p.estado[1] === 1 ? <FaRegCheckSquare/> : <ImCheckboxUnchecked/>} 
                                                                </button>
                                                                <p className={p.estado[1] === 1 ? `line-through` : 'no-underline'}>Para "{p.nombre}" regar {p.cantidad} ml</p>
                                                            </li> 
                                                        </>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                            
                        </section> : null
                    }

                    {
                        tareasPoda.length > 0 ?
                        <section className="pb-8 pt-4">
                            <Accordion collapseAll className="border-none w-full">
                                <Accordion.Panel className="border-none ">
                                    <Accordion.Title className="dark:text-white dark:bg-Verde-oscuro-800 dark:hover:bg-Verde-oscuro-800 hover:bg-Verde-claro-800 bg-Verde-claro-800 border-none text-Verde-oscuro-800 text-2xl font-titulo focus:ring-0 focus:ring-transparent first:rounded-none md:first:rounded-t">
                                        Podar:
                                    </Accordion.Title>
                                    <Accordion.Content className=" dark:bg-Verde-claro-800 bg-Verde-claro-400 border-none last:rounded-none">
                                        <ul className="text-Verde-oscuro-800 flex flex-col gap-4">
                                            {
                                                tareasPoda.map((p, i) => {
                                                    console.log('soy p', p);
                                                    return (
                                                        <>
                                                            <li key={i} className="text-xl flex gap-4 items-center">
                                                                <button 
                                                                    onClick={(e) => Check(e, p.estado[0], p.idCultivo, 'podar', p.estado[1], tareasPoda, setTareasPoda)}> 
                                                                    {p.estado[1] === 1 ? <FaRegCheckSquare/> : <ImCheckboxUnchecked/>} 
                                                                </button>
                                                                <p className={p.estado[1] === 1 ? `line-through` : 'no-underline'}>Para {p.nombre} ml</p>
                                                            </li> 
                                                        </>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                            
                        </section> : null
                    }

                    {
                        tareasFertilizante.length > 0 ?
                        <section className="pb-8 pt-4">
                            <Accordion collapseAll className="border-none w-full">
                                <Accordion.Panel className="border-none ">
                                    <Accordion.Title className="dark:text-white dark:bg-Verde-oscuro-800 dark:hover:bg-Verde-oscuro-800 hover:bg-Verde-claro-800 bg-Verde-claro-800 border-none text-Verde-oscuro-800 text-2xl font-titulo focus:ring-0 focus:ring-transparent first:rounded-none md:first:rounded-t">
                                        Fertilizar:
                                    </Accordion.Title>
                                    <Accordion.Content className=" dark:bg-Verde-claro-800 bg-Verde-claro-400 border-none last:rounded-none">
                                        <ul className="text-Verde-oscuro-800 flex flex-col gap-4">
                                            {
                                                tareasFertilizante.map((p, i) => {
                                                    console.log('soy p', p);
                                                    return (
                                                        <>
                                                            <li key={i} className="text-xl flex gap-4 items-center">
                                                                <button 
                                                                    onClick={(e) => Check(e, p.estado[0], p.idCultivo, 'fertilizar', p.estado[1], tareasFertilizante, setTareasFertilizante)}> 
                                                                    {p.estado[1] === 1 ? <FaRegCheckSquare/> : <ImCheckboxUnchecked/>} 
                                                                </button>
                                                                <p className={p.estado[1] === 1 ? `line-through` : 'no-underline'}>Para {p.nombre} ml</p>
                                                            </li> 
                                                        </>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </section> : null
                    }

                    {
                        tareasPesticida.length > 0 ?
                        <section className="pb-8 pt-4">
                            <Accordion collapseAll className="border-none w-full">
                                <Accordion.Panel className="border-none ">
                                    <Accordion.Title className="dark:text-white dark:bg-Verde-oscuro-800 dark:hover:bg-Verde-oscuro-800 hover:bg-Verde-claro-800 bg-Verde-claro-800 border-none text-Verde-oscuro-800 text-2xl font-titulo focus:ring-0 focus:ring-transparent first:rounded-none md:first:rounded-t">
                                        Fumigar:
                                    </Accordion.Title>
                                    <Accordion.Content className=" dark:bg-Verde-claro-800 bg-Verde-claro-400 border-none last:rounded-none">
                                        <ul className="text-Verde-oscuro-800 flex flex-col gap-4">
                                            {
                                                tareasPesticida.map((p, i) => {
                                                    console.log('soy p', p);
                                                    return (
                                                        <>
                                                            <li key={i} className="text-xl flex gap-4 items-center">
                                                                <button 
                                                                    onClick={(e) => Check(e, p.estado[0], p.idCultivo, 'fumigar', p.estado[1], tareasPesticida, setTareasPesticida)}> 
                                                                    {p.estado[1] === 1 ? <FaRegCheckSquare/> : <ImCheckboxUnchecked/>} 
                                                                </button>
                                                                <p className={p.estado[1] === 1 ? `line-through` : 'no-underline'}>Aplicar {p.cantidad}{p.medida} de {p.pesticida} para "{p.nombre}"</p>
                                                            </li> 
                                                        </>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </section> : null
                        
                    }
                </section>
                : !cultivosUser || cultivosUser.length === 0 ?
                    <>
                        <div className="my-10 text-Verde-oscuro-800 dark:text-white text-lg"> No tienes Cultivos Registrados <Link to={'/tuscultivos'} className="underline">¡Agrega uno!</Link></div>
                        {
                            darkMode
                            ? (<img src={LogoDark} alt="Logo de Cultivos" className="h-36" />)
                            : (<img src={LogoClaro} alt="Logo de Cultivos" className="h-36" />)
                        }
                    </>

                :
                <>
                    <div className="my-10 text-Verde-oscuro-800 dark:text-white text-lg"> No tienes Tareas El Día de Hoy ¡Descansa!</div>
                    {
                        darkMode
                        ? (<img src={LogoDark} alt="Logo de Cultivos" className="h-36" />)
                        : (<img src={LogoClaro} alt="Logo de Cultivos" className="h-36" />)
                    }
                </>
            }
            

        </div>
      )}
      </>
      );
}
