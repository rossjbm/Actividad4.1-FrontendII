import { BiSolidChevronLeft, BiSolidChevronRight  } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { Calendario } from './Calendario';
import Loader from "../../Componentes/globales/Loader/Loader";
import { listarCultivos } from "../../peticiones/cultivos";

export function CalendarioGeneral() {
    const date = new Date();
    const [mesMostrar,setMesMotrar] = useState('')
    const [anoMostrar,setAnoMostrar] = useState(date.getFullYear())
    const [mes, setMes]= useState(0)
    const [loaded, setLoaded] = useState(false);
    const [usuarioId] = useState(localStorage.getItem("usuarioId"));
    const [cultivoId,setCultivoId] = useState('')
    const [listaCultivos,setListaCultivos] = useState([])


    const cambiarMes = (cantidad) =>{
        const resultado = Number(mes) + cantidad
        setMes(resultado)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoaded(true);
        }, 500); // Tiempo en milisegundos para simular la carga
      
        return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
    }, []);
    useEffect(() => {
        async function actualizarCultivos() {
          const lista = await listarCultivos(usuarioId);
          if(lista) {
            setListaCultivos(lista)
            setCultivoId(lista[0]._id)
          }
        }
        actualizarCultivos();
      }, []);

      const handleSelectChange = (event) => {
        setCultivoId(event.target.value)
      };

    return <>
    {!loaded ? (
      <Loader /> // Muestra el loader mientras se simula la carga
    ) : (
        <div className='flex pt-6 items-center h- justify-center flex-col'>
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
            <div className='bg-Marron-400 border-black border flex flex-col items-center lg:w-4/6 lg:p-1 lg:rounded-xl xl:w-5/12 xl:m-10 xl:p-5 xl:rounded-2xl w-full py-2'>
                <div className='  w-auto drop-shadow-lg px-6 py-1 rounded-xl items-center'>
                    <div className='font-titulo text-sm w-auto'>
                        <form className="max-w-sm mx-auto">
                            {
                                listaCultivos[0] && listarCultivos.length > 0 ?
                                    <select  onChange={handleSelectChange} className="bg-Verde-claro-600 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-Verde-oscuro-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {listaCultivos.map((e,i)=>( 
                                        <option key={i} value={e._id}>{e.cultivo}</option>
                                    ))}
                                    </select >
                                : <div className="bg-Verde-claro-600 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-Verde-oscuro-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <p>No tienes Cultivos Registrados</p>
                                  </div>
                            }
                        </form>
                        
                    </div>
                </div>
                <Calendario setAnoMostrar={setAnoMostrar} setMesMotrar={setMesMotrar} mes={mes} usuarioId={usuarioId} cultivoId={cultivoId}/>                
            </div>
        </div>
      )}
      </>
  }