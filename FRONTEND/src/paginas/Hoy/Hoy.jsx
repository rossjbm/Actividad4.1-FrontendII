

import { Recomendar } from "../../componentes/Hoy/Recomendar"

export function Hoy(){

    return(<>
        <div className="flex flex-col py-12 gap-8 items-center">
            <h1 className="dark:text-white text-Verde-oscuro-800 font-titulo text-2xl text-center">Tus Tareas de Hoy</h1>

            <Recomendar/>
        </div>
    
    </>)
}