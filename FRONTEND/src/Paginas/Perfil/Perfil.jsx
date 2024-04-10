//import React, { useState, useEffect } from 'react';

const Perfil = () => {

    return (
        <>
        <div className="flex justify-center items-center p-20">
            <div className="p-4 rounded-lg shadow-md w-96 bg-Marron-400 dark:bg-Verde-oscuro-800">
                <h2 className="text-xl mb-4 text-center font-titulo dark:text-white">Perfil</h2>

                <form className="space-y-4 ">
                    <label htmlFor="nombreCompleto" className="block font-titulo dark:text-white">Nombre Completo:</label>
                    
                    <label htmlFor="usuarioUnico" className="block font-titulo dark:text-white">Usuario:</label>

                    <label htmlFor="correo" className="block font-titulo dark:text-white">Correo:</label>
                </form>                
            </div>
        </div>
    </>
    );
}

export default Perfil;