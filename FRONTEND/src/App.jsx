import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

//componentes
import {Encabezado} from "./Componentes/globales/Encabezado/Encabezado";
import { NavInferior } from "./Componentes/globales/Encabezado/NavInferior";
import { Pie } from "./Componentes/globales/Pie/Pie";
import { Landing } from "./Paginas/Landing/Landing";
import Cultivos from "./Paginas/Cultivos/Cultivos";
import { CalendarioGeneral } from "./Paginas/Calendario/General"
import FormularioCultivo from "./Paginas/Recomendar/FormularioCultivo";
import { Hoy } from "./Paginas/Hoy/Hoy";


export const Mostrar = React.createContext();
export const Tema = React.createContext();

function App() {
  const [headerMostrar, setHeaderMostrar] = useState(true)
  const [footerMostrar, setFooterMostrar] = useState(true)

  //modo oscuro
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  return (
    <>
    <Tema.Provider value={{darkMode, setDarkMode}} >
      {headerMostrar ? <NavInferior/> : null}
      {headerMostrar ? <Encabezado/> : null}
      <main className="font-texto bg-white dark:bg-Verde-oscuro-600 min-h-[600px] md:min-h-[900px] lg:min-h-[350px]">
        <Mostrar.Provider value={{setHeaderMostrar}}>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/tuscultivos" element={<Cultivos />} />
            <Route path="/calendario" element={<CalendarioGeneral />} />
            <Route path="/hoy" element={<Hoy/>} />
            <Route path="/perfil" element={<h1>SOY PERFIL</h1>} />
            <Route path="/condiciones" element={<FormularioCultivo/>} />
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
