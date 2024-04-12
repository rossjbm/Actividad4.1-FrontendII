import React, { useState, useEffect } from 'react';
import Loader from "../../Componentes/globales/Loader/Loader";
import { NavLink } from 'react-router-dom';
import Perfil from './Perfil';


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
      <div className='flex flex-col items-center justify-center h-full p-48'>
        {!isLogin && <Perfil />}
        {isLogin ? (
          <NavLink to={'/iniciosesion'} className='rounded-3xl dark:bg-Verde-claro-800 dark:hover:bg-Verde-claro-400 bg-Verde-claro-600 font-titulo text-lg text-Verde-oscuro-800 font-bold py-2 px-8 hover:bg-Verde-claro-800 text-white'>Iniciar Sesión</NavLink>
        ) : (
          <button onClick={cerrarSesion} className='rounded-3xl dark:bg-Verde-claro-800 dark:hover:bg-Verde-claro-400 bg-Verde-claro-600 font-titulo text-lg text-Verde-oscuro-800 font-bold py-2 px-8 hover:bg-Verde-claro-800 text-white'>Cerrar Sesión</button>
        )}
 
      </div>
      )}
      </>
      );
  }

export default CerrarSesion;


