import { NavLink } from "react-router-dom"
import { ModoOscuro } from "../../ModoOscuro/ModoOscuro" 

//iconos
import { RiPlantFill } from "react-icons/ri"
import { VscTasklist } from "react-icons/vsc";
import { FaUserLarge } from "react-icons/fa6"
import { FaRegCalendarCheck } from "react-icons/fa"


export function NavInferior() {

    return(<>
        <nav className='h-24 w-full flex px-2 fixed bottom-0 lg:hidden font-titulo dark:bg-Verde-oscuro-800  bg-Verde-oscuro-400  text-white'>
            <ul className='grid grid-cols-5 w-full items-center justify-around'>
                <li className="flex justify-center">
                    <NavLink to={'/tuscultivos'} className={({isActive}) => (isActive ? `bg-Verde-oscuro-800 dark:bg-Verde-claro-800 p-2 rounded-full` : 'w-auto hover:bg-Verde-oscuro-800 dark:hover:bg-Verde-claro-800 p-2 rounded-full')}><RiPlantFill className="text-4xl"/></NavLink>
                </li>
                <li className="flex justify-center">
                    <NavLink to={'/calendario'} className={({isActive}) => (isActive ? `bg-Verde-oscuro-800 dark:bg-Verde-claro-800 p-2 rounded-full` : 'w-auto hover:bg-Verde-oscuro-800 dark:hover:bg-Verde-claro-800 p-2 rounded-full')}><FaRegCalendarCheck className="text-4xl"/></NavLink>
                </li>
                <li className="flex items-center justify-center">
                    <ModoOscuro/>
                </li>
                <li className="flex items-center justify-center">
                    <NavLink to={'/hoy'} className={({isActive}) => (isActive ? `bg-Verde-oscuro-800 dark:bg-Verde-claro-800 p-2 rounded-full` : 'w-auto hover:bg-Verde-oscuro-800 dark:hover:bg-Verde-claro-800 p-2 rounded-full')}><VscTasklist className="text-4xl"/></NavLink>
                </li>
                <li className="flex items-center justify-center">
                    <NavLink to={'/perfil'} className={({isActive}) => (isActive ? `bg-Verde-oscuro-800 dark:bg-Verde-claro-800 p-2 rounded-full` : 'w-auto hover:bg-Verde-oscuro-800 dark:hover:bg-Verde-claro-800 p-2 rounded-full')}><FaUserLarge className="text-3xl"/></NavLink>
                </li>
            </ul>
        </nav>
    
    </>)
}