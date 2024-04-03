import { useContext } from "react"
import { NavLink } from "react-router-dom"
import Error from "../../assets/Iconos/error.png"
import Otro from "../../assets/Iconos/exito.png"

import { Tema } from "../../App"

export function Recomendar() {

    const {darkMode, setDarkMode} = useContext(Tema)

    return(<>
        <div className="flex flex-col items-center gap-5 bg-[#4E6530CC] p-4 rounded-3xl text-white">
            <h3 className="text-lg">¿Hoy quieres sembrar algo nuevo?</h3>
            <h3 className="text-lg font-semibold underline"><NavLink to={'/condiciones'}>Presiona aquí para saber si es lo ideal</NavLink></h3>
        </div>
        {
            darkMode ? <img src={Otro} alt="" /> : <img src={Error} alt="" />
        }
    </>)
}