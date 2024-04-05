import { useContext } from "react"
import { NavLink } from "react-router-dom"


export function Recomendar() {

    return(<>
        <div className="flex flex-col items-center gap-5 bg-[#4E6530CC] p-4 rounded-3xl text-white">
            <h3 className="text-lg">¿Deseas sembrar algo nuevo?</h3>
            <h3 className="text-lg font-semibold underline"><NavLink to={'/condiciones'}>Presiona aquí para saber si es lo ideal</NavLink></h3>
        </div>
    </>)
}