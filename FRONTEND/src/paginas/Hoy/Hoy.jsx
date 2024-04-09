import { useState, useEffect, useRef } from "react"
import Loader from "../../Componentes/globales/Loader/Loader";
import { Recomendar } from "../../Componentes/Hoy/Recomendar"

//llamados a back
import { listarCultivos } from "../../peticiones/cultivos";
import { listarCultivosDataName } from "../../peticiones/cultivos";

//iconos
import { FaRegCheckSquare } from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";

export function Hoy(){
    const [loaded, setLoaded] = useState(false);
    const [cultivosUser, setCultivosUser] = useState([]);
    const [fechaHoy, setFechaHoy] = useState(new Date());
    const [temperaturaHoy, setTemperaturaHoy] = useState(15);

    const [tareasTodas, setTareasTodas] = useState([]);

    //por ahora
    const [usuarioId, setUsuarioId] = useState("66087d688f59b6724beff8e5");

    const riegoRef = useRef()
    const diasTotalesRef = useRef()
    const podaRef = useRef()
    const fertilizanteRef = useRef()

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoaded(true);
        }, 2000); // Tiempo en milisegundos para simular la carga
      
        return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
      }, []);
      
    useEffect(() => {
        async function guardarCultivos() {
            const cultivos = await listarCultivos(usuarioId);

            //por ahora la prueba con el priemro
            setCultivosUser(cultivos);
        }
        guardarCultivos();
        // guardarFechas();
    }, []);

    useEffect(() => {
        if (cultivosUser && cultivosUser.length != 0) {
            Promise.all(
                cultivosUser.map(async cultivo => {

                    var cultivoData = {};

                    try {
                        const data = await listarCultivosDataName(cultivo.nombre)
                        cultivoData = data[0]
                        // console.log('soy data',cultivoData.nombre)
                    } catch (error) {
                        return console.log(error)
                    }

                    const fecha1 = new Date(cultivo.plantacion)
                    const fecha2 = new Date(fechaHoy)
                    await calcularDias(fecha1, fecha2)

                    //riego
                    if (diasTotalesRef % cultivoData.riego.frecuencia === 0 || cultivoData.riego.frecuencia === 0) {
                        // console.log('estoy en el if')
                        const minimo = cultivoData.temperatura.minima
                        const medio = cultivoData.temperatura.media
                        const maximo = cultivoData.temperatura.maxima

                        await cantidadAgua(temperaturaHoy, minimo, medio, maximo, cultivoData)
                    } else {
                        riegoRef.current = false
                    }

                    // console.log('current', riegoRef.current)
                    // console.log('diasTotales', diasTotalesRef.current)

                    const resultado = {
                        riego: {
                            tarea: riegoRef.current,
                            estado: 'uncheck'
                        },
                        diasTotales: diasTotalesRef.current,
                        nombre: cultivo.nombre
                    }

                    // console.log('soy resultado', resultado)
                    return resultado
                })
            ).then(resultados => {
                setTareasTodas(...tareasTodas, resultados);
            });
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
        if (cont >= 0) {
            diasTotalesRef.current =  cont
        } else {
            diasTotalesRef.current =  false
        }

    }

    async function cantidadAgua(temperaturaHoy, minimo, medio, maximo, cultivoData) {
        const diferencia1 = Math.abs(temperaturaHoy - minimo)
        const diferencia2 = Math.abs(temperaturaHoy - medio)
        const diferencia3 = Math.abs(temperaturaHoy - maximo)

        // console.log('diferencia minima', diferencia1)
        // console.log('diferencia media', diferencia2)
        // console.log('diferencia maxima', diferencia3)

        const diferenciaMin = Math.min(diferencia1, diferencia2, diferencia3)

        if (diferenciaMin === diferencia1) {
            // console.log('baja cantidad:', cultivoData.riego.cantidadBaja)
            riegoRef.current = cultivoData.riego.cantidadBaja
        } else if (diferenciaMin === diferencia2) {
            // console.log('media cantidad:', cultivoData.riego.cantidadMedia)
            riegoRef.current = cultivoData.riego.cantidadMedia

        } else {
            // console.log('alta cantidad:', cultivoData.riego.cantidadAlta)
            riegoRef.current = cultivoData.riego.cantidadAlta
        }
    }

    function checkTarea(e, i){
        e.preventDefault();
        setTareasTodas(tareasTodas.map((tarea, index) => {
            if (index === i) {
                return {
                    ...tarea,
                    riego: {
                        ...tarea.riego,
                        estado: tarea.riego.estado === 'check' ? 'uncheck' : 'check'
                    }
                };
            }
            return tarea;
        }));
    }

    // console.log('soy cultivos', cultivosUser)
    console.log('soy tareasTotales', tareasTodas)
    console.log(fechaHoy.toLocaleDateString())
    
    return(
        <>
        {!loaded ? (
          <Loader /> // Muestra el loader mientras se simula la carga
        ) : (
        <div className="flex flex-col py-12 gap-8 items-center">
            <h1 className="dark:text-white text-Verde-oscuro-800 font-titulo text-2xl text-center">Hoy es {fechaHoy.toLocaleDateString()} </h1>

            <Recomendar/>
            
            <section className="w-4/5">
                <h2 className="dark:text-white text-Verde-oscuro-800 font-titulo text-2xl text-center">Todas tus Tareas de Hoy</h2>

                <section className="p-6">
                    <h3 className="text-2xl dark:text-white text-Verde-oscuro-800 font-titulo mb-8">Riego</h3>
                    <ul className="dark:text-white text-Verde-oscuro-800 flex flex-col gap-4">
                        {
                            tareasTodas.map((tareariego, i) => {
                                return(<>
                                    <li key={i} className="text-xl flex gap-4 items-center">
                                        <button 
                                            onClick={(e) => checkTarea(e, i)}> 
                                            {tareariego.riego.estado === 'check' ? <FaRegCheckSquare/> : <ImCheckboxUnchecked/>} 
                                        </button>
                                        <p className={tareariego.riego.estado === 'check' ? `line-through` : 'no-underline'}>Para {tareariego.nombre} regar {tareariego.riego.tarea}ml</p>
                                    </li>
                                </>)
                            })
                        }
                    </ul>
                </section>
            </section>
        </div>
      )}
      </>
      );
}
