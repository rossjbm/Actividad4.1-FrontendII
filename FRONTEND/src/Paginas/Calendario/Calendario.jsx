import { useEffect, useState } from "react";
import { porCultivo } from "../../peticiones/calendario";


export function Calendario({setAnoMostrar,setMesMotrar,mes,usuarioId,cultivoId}){
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    const [mesAnterior,setMesAnterior] = useState([])
    const [mesActual,setMesActual] = useState([])
    const [mesSiguiente,setMesSiguiente] = useState([])
    const [semanaDia,setSemanaDia]= useState([])
    const [VidaUtil,setVidaUtil] = useState([])
    const [ajusteVidaUtil,setAjusteVidaUtil] = useState([])
    const [regarDias,setRegarDias] = useState([])
    const [fertilizarDias,setFertilizarDias] = useState ([])
    const [podarDias,setPodarDias] = useState([])
    const [frutosCreciendoDias,setFrutosCreciendoDias] = useState([])
    const [cosechaDias,setCosechaDias] = useState([])
    const [muerteDias,setMuerteDias] = useState([])
    
    const date = new Date();
    const hoy = date.getDate();

    
    
    useEffect(()=>{
                // Número de días del mes anterior
        const diasDelMesAnterior = new Date(date.getFullYear(), date.getMonth() + mes, 0).getDate();
            // Número de días del mes actual
        const diasDelMesActual = new Date(date.getFullYear(), date.getMonth() + mes + 1, 0).getDate();
            // Número de días del mes siguiente
        const diasDelMesSiguiente = new Date(date.getFullYear(), date.getMonth() + mes + 2, 0).getDate();
            // Día de la semana en que comenzó el mes actual (0 es domingo, 1 es lunes, etc.)
        const diaDeLaSemana = new Date(date.getFullYear(), date.getMonth() + mes, 1).getDay();
            //mes que se muestra
        let index = ((date.getMonth() + mes % meses.length) + meses.length) % meses.length;
        const mesMostrar = meses[index];
        let ano = date.getFullYear() + Math.floor((date.getMonth() + mes) / meses.length);

            
            setAnoMostrar(ano)
            setMesMotrar(mesMostrar);

        const diaSemana = Array.from({ length: diaDeLaSemana }, (_, i) => i + 1);
        const diasAnterior = Array.from({ length: diasDelMesAnterior }, (_, i) => i + 1);
        const diasActual = Array.from({ length: diasDelMesActual }, (_, i) => i + 1);
        const diasSiguiente = Array.from({ length: diasDelMesSiguiente }, (_, i) => i + 1);

            const limitado =  diasSiguiente.slice(0,(42-(diaSemana.length+diasActual.length)))
            const anterior = diasAnterior.reverse().slice(0,diaSemana.length)
            

        setSemanaDia(diaSemana)
        setMesAnterior(anterior.reverse())
        setMesActual(diasActual)
        setMesSiguiente(limitado)
        
        tareas()
    },[mes, cultivoId])

    const tareas = async () =>{
        const riego = await porCultivo(usuarioId,cultivoId)

        

        

        
        let vida = Array.from({length: riego.cultivo.vidaUtil.muerte}, (_, i) => i);
        let frutasCreciendo = await (Array.from({length: riego.cultivo.etapasFruto.fin}, (_, i) => i)).slice(riego.cultivo.etapasFruto.inicio)

        // calculamos las vida util 

        const fechaDada = new Date(riego.cultivo.fechaPlantada);

        const diferenciaEnTiempo = date - fechaDada;
        const diferenciaEnDias = diferenciaEnTiempo / (1000 * 3600 * 24);
        const DiasDesdePlantamiento = Math.abs(Math.round(diferenciaEnDias))
        const MesActualDate = new Date(date.getFullYear(), date.getMonth()+ mes + 1);
        
        const descontarParaTerminarMes = (new Date(fechaDada.getFullYear(), fechaDada.getMonth() + 1, 0).getDate()) - fechaDada.getDate();
        

        if (fechaDada < MesActualDate) {
            
            // cortamos para ajustar al mes completo 
            setVidaUtil(vida.slice(0,descontarParaTerminarMes))
            vida = vida.slice(descontarParaTerminarMes); 
            fechaDada.setMonth(fechaDada.getMonth() + 1);

            // saltos para ajustar dia cuando se encuentra inclompleto en el mes
            if (fechaDada.getMonth() == MesActualDate.getMonth()){
                setAjusteVidaUtil(fechaDada.getDate())
            }else{
                setAjusteVidaUtil(0)
            }
            //recorremos para saber cuantos meses han pasado hasta el actual 
            while (fechaDada <= MesActualDate) {
                const ultimoDiaDelMes = new Date(fechaDada.getFullYear(), fechaDada.getMonth() + 1, 0).getDate();
                setVidaUtil(vida.slice(0,ultimoDiaDelMes))
                vida= vida.slice(ultimoDiaDelMes);

                // Pasamos al primer día del próximo mes
                fechaDada.setMonth(fechaDada.getMonth() + 1);
            }
        } else if (fechaDada > MesActualDate) {
            setVidaUtil([])
        } else {
            
        }
        
        if (riego.cultivo.fertilizarPorDia.dias) {
            setFertilizarDias(riego.cultivo.fertilizarPorDia.dias)
        }else{setFertilizarDias([])}
        if (riego.cultivo.podarPorDia.dias) {
            setPodarDias(riego.cultivo.podarPorDia.dias)
        }else{setPodarDias([])}
        setCosechaDias([riego.cultivo.vidaUtil.cosecha - 1])
        setMuerteDias([riego.cultivo.vidaUtil.muerte - 1])
        setFrutosCreciendoDias(frutasCreciendo)
        
        setRegarDias(riego.cultivo.regarPorDia.dias)
        
    }

    return <>
    <div className="w-full flex flex-row">
    <ul className="w-2 pl-2">
                <li className="mt-12">
                    1
                </li>
                <li className="mt-8">
                    2
                </li>
                <li className="mt-8">
                    3
                </li>
                <li className="mt-8">
                    4
                </li>
                <li className="mt-8">
                    5
                </li>
                <li className="mt-8">
                    6
                </li>
            </ul>
        
        <div className="pl-3 w-full ">
            <div className="font-titulo w-full text-center grid grid-cols-7">
                <p>DOM</p>
                <p>LUN</p>
                <p>MAR</p>
                <p>MIE</p>
                <p>JUE</p>
                <p>VIE</p>
                <p>SAB</p>
            </div>
            <div className="font-texto w-full text-center grid grid-cols-7">
                {semanaDia.map((_,i)=>(
                    <div key={i} className="bg-Verde-oscuro-400 flex px-1 border rounded-md border-black h-14 w-full opacity-50">
                        <p>{mesAnterior[i]}</p>
                    </div>
                ))}
                {mesActual.map((e,i)=>(
                    <div key={i} className="bg-Verde-claro-400 flex flex-wrap  border rounded-md border-black min-h-14 w-full">
                        <div className={`${e == hoy ? '':''} w-1/3 h-1/2 items-start`}> 
                            <p>{e}</p>
                        </div>
                        <div className="w-2/3 h-1/2 ">
                            <p>cli</p>
                        </div>
                        <div className="w-full flex align-middle flex-wrap justify-around h-1/2">
                            {fertilizarDias.length < 1 ? <img className={`h-4 w-4 sm:h-6 sm:w-5  max-h-14 ${ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (fertilizarDias.includes(VidaUtil[i-ajusteVidaUtil])? "":'hidden'):'hidden'}`} src={ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (fertilizarDias.includes(VidaUtil[i-ajusteVidaUtil])? "/src/assets/IconosCalendario/fertilizante.png":null):null}/> :null }
                            {podarDias.length < 1 ? <img className={`h-4 w-4 sm:h-6 sm:w-5  max-h-14 ${ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (podarDias.includes(VidaUtil[i-ajusteVidaUtil])? "":'hidden'):'hidden'}`} src={ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (podarDias.includes(VidaUtil[i-ajusteVidaUtil])? "/src/assets/IconosCalendario/tijeras.png":null):null}/>:null}
                            <img className={`h-4 w-4 sm:h-6 sm:w-5  max-h-14 ${ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (frutosCreciendoDias.includes(VidaUtil[i-ajusteVidaUtil])? "":'hidden'):'hidden'}`} src={ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (frutosCreciendoDias.includes(VidaUtil[i-ajusteVidaUtil])? "/src/assets/IconosCalendario/crecimiento.png":null):null}/>
                            <img className={`h-4 w-4 sm:h-6 sm:w-5  max-h-14 ${ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (regarDias.includes(VidaUtil[i-ajusteVidaUtil])? "":'hidden'):'hidden'}`} src={ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (regarDias.includes(VidaUtil[i-ajusteVidaUtil])? "/src/assets/IconosCalendario/regadera.png":null):null}/>
                            <img className={`h-4 w-4 sm:h-6 sm:w-5  max-h-14 ${ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (cosechaDias.includes(VidaUtil[i-ajusteVidaUtil])? "":'hidden'):'hidden'}`} src={ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (cosechaDias.includes(VidaUtil[i-ajusteVidaUtil])? "/src/assets/IconosCalendario/zanahoria.png":null):null}/>
                            <img className={`h-4 w-4 sm:h-6 sm:w-5  max-h-14 ${ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (muerteDias.includes(VidaUtil[i-ajusteVidaUtil])? "":'hidden'):'hidden'}`} src={ajusteVidaUtil < e && VidaUtil[i-ajusteVidaUtil]+1 ? (muerteDias.includes(VidaUtil[i-ajusteVidaUtil])? "/src/assets/IconosCalendario/muerte.png":null):null}/>
                        </div>
                    </div>
                ))}
                {mesSiguiente.map((e,i)=>(
                    <div key={i} className="bg-Verde-claro-400 flex px-1 border rounded-md border-black h-14 w-full opacity-50">
                        <p>{e}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>

}
