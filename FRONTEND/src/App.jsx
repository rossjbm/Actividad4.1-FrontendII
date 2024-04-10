import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//componentes
import { Encabezado } from "./Componentes/globales/Encabezado/Encabezado";
import { NavInferior } from "./Componentes/globales/Encabezado/NavInferior";
import { Pie } from "./Componentes/globales/Pie/Pie";
import { Landing } from "./Paginas/Landing/Landing";
import Cultivos from "./Paginas/Cultivos/Cultivos";
import { CalendarioGeneral } from "./Paginas/Calendario/General"
import FormularioCultivo from "./Paginas/Recomendar/FormularioCultivo";
import { Hoy } from "./Paginas/Hoy/Hoy";
import Login from "./Paginas/Inicio/Login";
import ErrorLogin from "./Paginas/Inicio/ErrorLogin";
import RegistroFormulario from "./Paginas/Inicio/Registro";
import CerrarSesion from "./Paginas/Perfil/BotonSesion";
import Perfil from "./Paginas/Perfil/Perfil";

export const Mostrar = React.createContext();
export const Tema = React.createContext();

function App() {
  const [headerMostrar, setHeaderMostrar] = useState(true)
  const [footerMostrar, setFooterMostrar] = useState(true)
  const [isLogin, setIsLogin] = useState(true)

  //modo oscuro
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data != null) {
      fetch(`http://localhost:3000/usuarios/verificar`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'authorization': data }
      })
        .then(response => response.json())
        .then(response => {
          localStorage.setItem("usuarioId", response.usuarioId);
          setIsLogin(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLogin(true)
        })
    }

  }, [])

  return (
    <>
      <Tema.Provider value={{ darkMode, setDarkMode }} >
        {headerMostrar ? <NavInferior /> : null}
        {headerMostrar ? <Encabezado isLogin={isLogin} setIsLogin={setIsLogin} /> : null}
        <main className="font-texto bg-white dark:bg-Verde-oscuro-600 min-h-[600px] md:min-h-[900px] lg:min-h-[350px]">
          <Mostrar.Provider value={{ setHeaderMostrar }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/iniciosesion" element={<Login />} />
              <Route path="/registro" element={<RegistroFormulario/>} />
              <Route path="/tuscultivos" element={isLogin ? (<ErrorLogin />) : (<Cultivos />)} />
              <Route path="/calendario" element={isLogin ? (<ErrorLogin />) : <CalendarioGeneral />} />
              <Route path="/hoy" element={isLogin ? (<ErrorLogin />) : <Hoy />} />
              <Route path="/perfil" element={<CerrarSesion isLogin={isLogin} setIsLogin={setIsLogin}/>} />
              <Route path="/condiciones" element={isLogin ? (<ErrorLogin />) : <FormularioCultivo />} />
              <Route path="*" element={<h1>SOY ERROR</h1>} />
            </Routes>
          </Mostrar.Provider>
        </main>
        {footerMostrar ? <Pie headerMostrar={headerMostrar} /> : null}
      </Tema.Provider>
    </>
  )
}

export default App
