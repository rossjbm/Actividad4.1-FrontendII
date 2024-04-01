

import { Routes, Route } from "react-router-dom";
import { Encabezado } from "./componentes/globales/Encabezado/Encabezado";
import { NavInferior } from "./componentes/globales/Encabezado/NavInferior";

function App() {

  return (
    <main className="bg-white dark:bg-Verde-oscuro-600 min-h-[600px] md:min-h-[500px] lg:min-h-[350px]">
      <Encabezado/>
      <Routes>
        <Route path="/" element={<h1>SOY LANDING</h1>} />
        <Route path="/tuscultivos" element={<h1>SOY TUS CULTIVOS</h1>} />
        <Route path="/calendario" element={<h1>SOY CALENDARIO</h1>} />
        <Route path="/hoy" element={<h1>SOY HOY</h1>} />
        <Route path="/perfil" element={<h1>SOY PERFIL</h1>} />
        <Route path="/condiciones" element={<h1>SOY CONDICIONES</h1>} />
        <Route path="*" element={<h1>SOY ERROR</h1>} />
      </Routes>
      <NavInferior/>
    </main>
  )
}

export default App
