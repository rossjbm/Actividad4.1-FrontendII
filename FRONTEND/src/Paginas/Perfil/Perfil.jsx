import React, { useState, useEffect } from 'react';
import { listarUsuarioId } from '../../peticiones/usuarios';

const Perfil = () => {

    const [usuarioId, setUsuarioId] = useState(localStorage.getItem("usuarioId"));
    const [dataUsuario, setDataUsuario] = useState({});


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 1000); // Tiempo en milisegundos para simular la carga

        async function extraerDatos() {
            try {
                const data = await listarUsuarioId(usuarioId)
                console.log('DATA USUARIO',data)
                setDataUsuario(data)
            } catch (error) {
                console.log(error)
                throw error
            }

        }
        extraerDatos()
        
        return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
    }, []);


    return (
        <>
        <div className="flex justify-center items-center p-20">
            <div className="p-4 rounded-lg shadow-md w-96 bg-Marron-400 dark:bg-Verde-oscuro-800">
                <h2 className="text-xl mb-4 text-center font-titulo dark:text-white">Perfil</h2>

                <form className="space-y-4 ">
                    <label htmlFor="nombreCompleto" className="block font-titulo dark:text-white">Nombre Completo: {dataUsuario.nombreCompleto} </label>
                    
                    <label htmlFor="usuarioUnico" className="block font-titulo dark:text-white">Usuario: {dataUsuario.usuarioUnico}</label>

                    <label htmlFor="correo" className="block font-titulo dark:text-white">Correo: {dataUsuario.correo}</label>
                </form>                
            </div>
        </div>
    </>
    );
}

export default Perfil;