import React from 'react';
import { useContext } from 'react';
//imagenes
import imagenError from "../../assets/Iconos/error.png";
import imagenExito from "../../assets/Iconos/exito.png";
import imagenExitoMO from "../../assets/Iconos/exito-darkmode.png";
import imagenErrorMO from "../../assets/Iconos/error-darkmode.png";

import { Tema } from "../../App"


const Alerta = ({ titulo, mensaje, tipo, onClose }) => {
    const modalClasses = `fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50`;
    const modalContentClasses = `bg-Marron-400 p-6 rounded-lg shadow-lg flex flex-col items-center dark:bg-Verde-oscuro-600 w-5/6 md:w-1/2`;
    const alertClasses = `text-black text-center text-lg font-texto dark:bg-Verde-oscuro-600 dark:text-white`;
    const tituloClasses = `text-xl mb-2 font-titulo dark:bg-Verde-oscuro-600 dark:text-white`;
    const imagenClasses = `mt-8 mb-5 w-28`; 

    const {darkMode} = useContext(Tema)
    var imagenUrl = "";
    // Lógica para seleccionar la imagen según el tipo de alerta
    if (darkMode) {
        imagenUrl = tipo === 'error' ? imagenErrorMO : imagenExitoMO;
    } else {
        imagenUrl = tipo === 'error' ? imagenError : imagenExito;
    }


    return (
        <div className={modalClasses} onClick={onClose}>
            <div className={modalContentClasses} onClick={(e) => e.stopPropagation()}>
                <h2 className={tituloClasses}>{titulo}</h2>
                <div className={alertClasses}>{mensaje}</div>
                <img src={imagenUrl} alt={tipo} className={imagenClasses} />
                <button
                    className="mt-4 px-4 py-2 border border-lime-950 bg-lime-900 hover:bg-gray-500 rounded-md text-white font-titulo focus:outline-none"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Alerta;
