import React, { useState, useEffect } from 'react';
import Loader from "../../Componentes/globales/Loader/Loader";
import Perfil from './Perfil';
import ErrorLogin from '../Inicio/ErrorLogin';


export function CerrarSesion({ isLogin, setIsLogin }) {
  const [loaded, setLoaded] = useState(false);

  const cerrarSesion = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    setIsLogin(false);
    window.location.href = "http://localhost:5000/iniciosesion";
  }

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoaded(true);
        }, 1000); // Tiempo en milisegundos para simular la carga
      
        return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
      }, []);

  return (
    <>
    {!loaded ? (
      <Loader /> // Muestra el loader mientras se simula la carga
    ) : (
      <div className='flex flex-col items-center justify-center h-full'>
        {!isLogin && <Perfil />}
        {isLogin ? (
          <ErrorLogin/>
        ) : (
          <button onClick={cerrarSesion} className='w-auto rounded-3xl dark:bg-Verde-claro-800 dark:hover:bg-Verde-oscuro-800 bg-Verde-claro-600 font-titulo text-lg text-Verde-oscuro-800 py-2 px-8 hover:bg-Verde-claro-800 dark:text-white mb-5'>Cerrar Sesión</button>
        )}
 
      </div>
      )}
      </>
      );
  }

export default CerrarSesion;


