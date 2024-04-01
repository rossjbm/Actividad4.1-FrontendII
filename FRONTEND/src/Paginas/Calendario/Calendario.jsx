import { useEffect, useState } from "react";



// [{'dia':1,'Tareas':[agua,podar...]}...]

export function Calendario({setAnoMostrar,setMesMotrar,mes}){
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    const [mesAnterior,setMesAnterior] = useState([])
    const [mesActual,setMesActual] = useState([])
    const [mesSiguiente,setMesSiguiente] = useState([])
    const [semanaDia,setSemanaDia]= useState([])
    const date = new Date();

    
    
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

            console.log(ano);
            setAnoMostrar(ano)
            setMesMotrar(mesMostrar);

        const diaSemana = Array.from({ length: diaDeLaSemana }, (_, i) => i + 1);
        const diasAnterior = Array.from({ length: diasDelMesAnterior }, (_, i) => i + 1);
        const diasActual = Array.from({ length: diasDelMesActual }, (_, i) => i + 1);
        const diasSiguiente = Array.from({ length: diasDelMesSiguiente }, (_, i) => i + 1);

            const limitado =  diasSiguiente.slice(0,(42-(diaSemana.length+diasActual.length)))

        setSemanaDia(diaSemana)
        setMesAnterior(diasAnterior.reverse())
        setMesActual(diasActual)
        setMesSiguiente(limitado)
    },[mes])


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
                    <div className="bg-Verde-oscuro-400 flex px-1 border rounded-md border-black h-14 w-full opacity-50">
                        <p>{mesAnterior[i]}</p>
                    </div>
                ))}
                {mesActual.map((e,i)=>(
                    <div className="bg-Verde-claro-400 flex px-1 border rounded-md border-black h-14 w-full">
                        <p>{e}</p>
                    </div>
                ))}
                {mesSiguiente.map((e,i)=>(
                    <div className="bg-Verde-claro-400 flex px-1 border rounded-md border-black h-14 w-full opacity-50">
                        <p>{e}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>

}
