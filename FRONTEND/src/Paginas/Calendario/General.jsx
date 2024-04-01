import { BiSolidChevronLeft, BiSolidChevronRight  } from "react-icons/bi";
import { useState } from 'react';
import { Calendario } from './Calendario';

export function CalendarioGeneral() {
    const date = new Date();
    const [mesMostrar,setMesMotrar] = useState('')
    const [anoMostrar,setAnoMostrar] = useState(date.getFullYear())
    const [mes, setMes]= useState(0)

    const cambiarMes = (cantidad) =>{
        const resultado = Number(mes) + cantidad
        console.log(resultado);
        setMes(resultado)
    }

    return <>
        <div className='flex mt-6 items-center justify-center flex-col'>
            <div className='flex flex-row text-center mb-8 items-center'>
                <button onClick={()=>{cambiarMes(-1)}}>
                    <BiSolidChevronLeft className="text-4xl"/>
                </button>
                <div className='bg-Verde-claro-400 border-black border drop-shadow-lg px-14 rounded-xl items-center flex flex-col'>
                    <p className='font-titulo text-2xl' >{mesMostrar}</p>
                    <p className='font-texto text-xs'>{anoMostrar}</p>
                </div>
                <button onClick={()=>{cambiarMes(+1)}}>
                    <BiSolidChevronRight className="text-4xl"/>
                </button>
            </div>
            <div className='bg-Marron-400 border-black border flex flex-col items-center w-full py-2'>
                <div className='bg-Verde-claro-400 border-black border w-auto drop-shadow-lg px-6 py-1 rounded-xl items-center'>
                    <p className='font-titulo text-sm w-auto'>Zanahoria</p>
                </div>
                <Calendario setAnoMostrar={setAnoMostrar} setMesMotrar={setMesMotrar} mes={mes}/>                
            </div>
        </div>
    </>
  }