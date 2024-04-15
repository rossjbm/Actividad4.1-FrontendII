import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import Alerta from '../../Recomendar/Alerta';
import RigoPlant from '../../../assets/icono-rigoplant.png'

//iconos
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export function Pie({headerMostrar}){

    const [correo, setCorreo] = useState('')

    //alerta
    const [tipo, setTipo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [titulo, setTitulo] = useState('');
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const cambiando = (e) => {
        setCorreo(e.target.value);
    };

    const validarCorreo = () => {
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if (emailRegex.test(correo)) {
            return false
        } else {
            return true
        }
    }

    const subida = () => {
        const errorCorreo = validarCorreo()

        if (errorCorreo) {
            console.log('error al enviar correo')
            return errorCorreo
        }

        fetch(`http://localhost:3000/contacto`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({correo: correo})
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                setCorreo("");
                console.log('exito')
                setMostrarAlerta(true);
                setMensaje('Se ha enviado un mensaje a tu correo electrónico')
                setTitulo('¡Ya Estamos en Contacto!')
                setTipo('exito')
            }
        })
        .catch ((error) => {
            setMostrarAlerta(true);
            setMensaje('Ocurrió un error al enviar Correo');
            setTitulo('Error')
            setTipo('error')
            throw ("Error:", error)
        }) 
    };

    return(<>
        <footer className={`p-6 font-texto text-Verde-oscuro-800 dark:text-white bg-Marron-400 dark:bg-Marron-900 lg:m-0 ${headerMostrar ? 'mb-20' : 'm-0'}`}>
            <div className='flex flex-row'>
                <div className='w-2/5 hidden lg:flex flex-col'>
                    <h3 className='font-titulo text-center text-2xl mb-6'>Somos RigoPlant</h3>
                    <div className='grid grid-cols-2 justify-center items-center w-11/12 gap-2'>
                        <div className='w-auto '>
                            <img src={RigoPlant} alt="Icono RigoPlant" className='max-h-60'/>
                        </div>
                        <p className='text-base'>RigoPlant es la mejor opción para el riego eficiente de tus cultivos. Con recordatorios diarios, te guiará en las tareas necesarias para mantener tus plantas saludables y bien cuidadas.</p>

                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 w-full lg:w-3/5  lg:flex-col gap-12 lg:border-l-2 border-Verde-oscuro-400'>
                    <form className='flex flex-col items-center justify-start gap-6 w-full'>
                        <label htmlFor="correo" className='font-titulo text-xl lg:text-2xl'>Contáctanos</label>
                        <div className='flex bg-white border-4 border-Verde-oscuro-400 w-11/12 lg:w-5/6 rounded-full'>
                        <input 
                            type="email" 
                            name='correo' 
                            id='correo' 
                            placeholder='Ingresa tu correo eletrónico' 
                            className='w-3/5 rounded-full border-none py-3 px-4 text-Verde-oscuro-800 focus:border-none focus:ring-0'
                            onChange={cambiando}
                        />
                        <button onClick={(e) => (e.preventDefault(), subida())} className='font-titulo lg:text-lg outline outline-Verde-oscuro-400 w-2/5 h-full rounded-full bg-Verde-oscuro-400 hover:bg-Verde-oscuro-600 text-white'>¡Enviar Ahora!</button>
                        </div>
                    </form>
                    <div className='flex flex-row justify-around items-start mb-10'>
                        <div>
                            <h3 className='text-lg font-titulo'>Sobre Nosotros</h3>
                            <ul className='pl-2 mt-3 flex flex-col gap-2 text-base'>
                                <li><NavLink to={'/politica'}>Políticas</NavLink></li>
                                <li><NavLink to={'/terminos'}>Términos</NavLink></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className='text-lg font-titulo'>Redes Sociales</h3>
                            <div className='mt-3 flex justify-around'>
                                <button className='text-xl text-Verde-oscuro-800 dark:text-Verde-claro-800 hover:scale-110'><RiInstagramFill/></button>
                                <button className='text-xl text-Verde-oscuro-800 dark:text-Verde-claro-800 hover:scale-110'><FaFacebook/></button>
                                <button className='text-xl text-Verde-oscuro-800 dark:text-Verde-claro-800 hover:scale-110'><FaYoutube/></button>
                                <button className='text-xl text-Verde-oscuro-800 dark:text-Verde-claro-800 hover:scale-110'><FaGithub/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-3 border-t-2 border-Verde-oscuro-400'>
                <p className='text-center text-sm lg:text-base'>© 2024 RigoPlant® - Todos los derechos reservados</p>
            </div>
        </footer>
        {mostrarAlerta ? <Alerta titulo={titulo} mensaje={mensaje} tipo={tipo} onClose={() => setMostrarAlerta(false)} /> : null}
    </>)
}