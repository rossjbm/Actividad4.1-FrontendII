import { NavLink } from 'react-router-dom'

import RigoPlant from '../../../assets/icono-rigoplant.png'
import { ModoOscuro } from '../../ModoOscuro/ModoOscuro'


export function Encabezado({ isLogin, setIsLogin }) {

    const cerrarsesion = (e) => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuarioId");
        setIsLogin(false);
        window.location.href = "http://localhost:5000/iniciosesion"
    }

    return (<>
        <header className='flex justify-center lg:justify-between h-20 w-full py-1 pl-6 pr-8 bg-Marron-400 dark:bg-Marron-900 '>
            <section className='flex items-center'>
                <div className='h-16 w-16'>
                    <img src={RigoPlant} alt="Icono de RigoPlant" className='' />
                </div>
                <h1 className='hidden md:flex text-3xl font-titulo text-Verde-oscuro-800 dark:text-white'>RigoPlant</h1>
            </section>
            <nav className='hidden lg:flex text-xl font-titulo text-Verde-oscuro-800 dark:text-white'>
                <ul className='flex flex-row items-center justify-center gap-14'>
                    <li>
                        <NavLink to={'/tuscultivos'} className={({ isActive }) => (isActive ? `bg-[#9C8C6D66] p-2 rounded-xl` : 'hover:bg-[#9C8C6D66] p-2 rounded-xl')}>Tus Cultivos</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/calendario'} className={({ isActive }) => (isActive ? `bg-[#9C8C6D66] p-2 rounded-xl` : 'hover:bg-[#9C8C6D66] p-2 rounded-xl')}>Calendario</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/hoy'} className={({ isActive }) => (isActive ? `bg-[#9C8C6D66] p-2 rounded-xl` : 'hover:bg-[#9C8C6D66] p-2 rounded-xl')}>Hoy</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/perfil'} className={({ isActive }) => (isActive ? `bg-[#9C8C6D66] p-2 rounded-xl` : 'hover:bg-[#9C8C6D66] p-2 rounded-xl')}>Perfil</NavLink>
                    </li>
                    <li>
                        {
                            isLogin
                            ? (<NavLink to={'/iniciosesion'} className='hover:bg-[#9C8C6D66] p-2 rounded-xl'>Iniciar Sesion</NavLink>)
                            : (<button onClick={cerrarsesion} className='hover:bg-[#9C8C6D66] p-2 rounded-xl'>Cerrar Sesion</button>)
                        }
                    </li>
                    <li>
                        <ModoOscuro />
                    </li>
                </ul>
            </nav>
        </header>

    </>)
}