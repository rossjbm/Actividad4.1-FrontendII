import React, { useState, useEffect } from 'react';
import { listarUsuarioId } from '../../peticiones/usuarios';
import { listarCultivos } from '../../peticiones/cultivos';
//icono
import { FaUserLarge } from "react-icons/fa6"

const Perfil = () => {

    const [usuarioId, setUsuarioId] = useState(localStorage.getItem("usuarioId"));
    const [dataUsuario, setDataUsuario] = useState({});
    const [dataCultivos, setDataCultivos] = useState([]);


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

            try {
                const data = await listarCultivos(usuarioId)
                console.log('DATA CULTIVOS',data)
                setDataCultivos(data)
            } catch (error) {

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

                <div className='text-center my-5 flex justify-center dark:text-Verde-claro-800'>
                    <FaUserLarge className='text-6xl '/>
                </div>

                <ul className="space-y-4 ">
                    <li className="block font-titulo dark:text-white">Nombre Completo: {dataUsuario.nombreCompleto} </li>
                    <li className="block font-titulo dark:text-white">Usuario: {dataUsuario.usuarioUnico}</li>
                    <li className="block font-titulo dark:text-white">Correo: {dataUsuario.correo}</li>
                    <li className="block font-titulo dark:text-white">Cultivos Totales: {dataCultivos.length}</li>

                </ul>                
            </div>
        </div>
    </>
    );
}

export default Perfil;