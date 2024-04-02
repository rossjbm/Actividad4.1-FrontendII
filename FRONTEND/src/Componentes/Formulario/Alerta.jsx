import React from 'react';
import imagenError from "../../assets/Iconos/error.png";
import imagenExito from "../../assets/Iconos/exito.png";


const Alerta = ({ titulo, mensaje, tipo, onClose }) => {
    const modalClasses = `fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50`;
    const modalContentClasses = `bg-Marron-400 p-6 rounded-lg shadow-lg flex flex-col items-center`;
    const alertClasses = `text-black text-center text-lg font-texto`;
    const tituloClasses = `text-xl font-bold mb-2 font-titulo`;
    const imagenClasses = `mt-4 mb-2 w-22 h-22`; 

    // Lógica para seleccionar la imagen según el tipo de alerta
    const imagenUrl = tipo === 'error' ? imagenError : imagenExito;

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
