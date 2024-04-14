
import { Accordion } from "flowbite-react";
import { PlagaActiva } from "./PlagaActiva";
import { agregarPesticida } from "../../peticiones/cultivos";
import Alerta from "../Recomendar/Alerta";

import React, { useState } from "react";

export const AgregarPlaga = React.createContext();

function TarjetaCultivos({ cultivo, cultivoData }) {

  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [titulo, setTitulo] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const [openPlaga, setOpenPlaga] = useState(false);
  const [statePlaga, setStatePlaga] = useState({
    id:'',
    para: ''
  })

  const plagas = cultivoData.plagas

  const cambiandoPlaga = (e) => {
    setStatePlaga({
      ...statePlaga,
      [e.target.name]: e.target.value,
    });
  };

  async function subidaPlaga(e, id) {
    e.preventDefault();

    console.log(statePlaga)
    console.log(id)

    if (statePlaga.para && statePlaga.id) {
      try {
        const resultado = await agregarPesticida(statePlaga)
        console.log(resultado)
        setMostrarAlerta(true);
        setMensaje(resultado)
        setTitulo('Exito')
        setTipo('exito')

      } catch (error) {
        console.log(error)
        setMostrarAlerta(true);
        setMensaje('Ocurrió un Error');
        setTitulo('Error')
        setTipo('error')
      }
    } else {
      setMostrarAlerta(true);
      setMensaje('Ocurrió un Error')
      setTitulo('Error')
      setTipo('error')
    }
      
  }


  

  return (
    <>
      <div className="border-[3px] dark:bg-Marron-900 dark:border-Marron-900 min-h-[450px] border-Marron-400 py-8 px-2 ">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <h3 className="dark:text-white text-2xl font-titulo text-Verde-oscuro-800 text-center">
              {cultivo.nombre}
            </h3>
            <h4 className="dark:text-white text-lg font-titulo text-Verde-oscuro-800 text-center">
              Cultivo de {cultivo.cultivo} {"("}{cultivoData.nombreCientifico}{")"}
            </h4>

            <ul className="px-4 flex flex-col gap-2">
              <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800">
                Día de Plantación: {cultivo.plantacion}
              </li>
              <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800">
                Riego por Siembra: De {cultivoData.riego.cantidadBaja}ml a {cultivoData.riego.cantidadAlta}ml
              </li>
              <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800">
                Fertilizante: {cultivo.fertilizante}
              </li>
              <ul className="grid grid-cols-2 gap-8">
                <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800 text-start">
                  Siembras: {cultivo.numeroCultivos}uds
                </li>
                <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800 text-start">
                  Superficie: {cultivo.superficie}m<sup>2</sup>
                </li>
              </ul>
            </ul>
            <a
              className="dark:text-white font-texto text-lg font-bold mt-2 text-Verde-oscuro-800 cursor-pointer text-center"
              onClick={() => setOpenPlaga(true)}
            >
              ¿Contrajo un Plaga?
            </a>
          </div>
          <div>
              <Accordion collapseAll className="border-none mt-6">
                <Accordion.Panel className="border-none ">
                  <Accordion.Title className="dark:text-white dark:bg-Verde-oscuro-800 dark:hover:bg-Verde-oscuro-800 bg-Marron-400 hover:bg-Marron-400 border-none text-Verde-oscuro-800 text-base font-titulo focus:ring-0 focus:ring-transparent first:rounded-none">
                    Detalles del Cultivo:
                  </Accordion.Title>
                  <Accordion.Content className="dark:text-white dark:bg-Verde-oscuro-800 bg-Marron-400 border-none last:rounded-none">
                    <p className="dark:text-white text-sm text-Verde-oscuro-800 font-texto mb-4">
                      {cultivoData.descripcion}
                    </p>
                    <ul className="flex flex-col gap-2">
                      <li className="dark:text-white text-sm text-Verde-oscuro-800 font-texto">Días de Crecimiento: {cultivoData.vidaUtil.crecimiento} Dias</li>
                      <li className="dark:text-white text-sm text-Verde-oscuro-800 font-texto">Día de Floración: De {cultivoData.etapaFloracion.inicio} a {cultivoData.etapaFloracion.fin} días</li>
                      <li className="dark:text-white text-sm text-Verde-oscuro-800 font-texto">Cantidad de Riego: {cultivoData.riego.frecuencia === 0 ? 'Todos los Días' : 'Cada '+cultivoData.riego.frecuencia+' días'}</li>
                      <li className="dark:text-white text-sm text-Verde-oscuro-800 font-texto">Días de Poda: Cada {cultivoData.poda.frecuencia} Dias </li>
                      <li className="dark:text-white text-sm text-Verde-oscuro-800 font-texto">Días de Fertilización: 1 vez cada {cultivoData.fertilizacion.frecuencia} días </li>
                      <li className="dark:text-white text-sm text-Verde-oscuro-800 font-texto">Humedad Ideal: {cultivoData.humedad.minima}% al {cultivoData.humedad.maxima}%</li>
                      <li className="dark:text-white text-sm text-Verde-oscuro-800 font-texto">Temperatura Ideal: {cultivoData.temperatura.minima}º al {cultivoData.temperatura.maxima}º</li>
                    </ul>

                    <div>
                      <h5 className="dark:text-white text-sm font-titulo mt-8 mb-4 text-Verde-oscuro-800 ">Plagas Comunes:</h5>
                      {
                        plagas.map((plaga, i) => {
                          
                          return(
                            <ul className="px-8" key={i} >
                              <li className="dark:text-white list-disc text-sm text-Verde-oscuro-800">{plaga.tipo}</li>
                            </ul>
                          )
                        })
                      }
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
        </div>
      </div>
      <AgregarPlaga.Provider value={{setOpenPlaga, openPlaga, statePlaga, setStatePlaga, cambiandoPlaga, subidaPlaga}}>
        <PlagaActiva id={cultivo._id} plagas={plagas} />
        {mostrarAlerta ? <Alerta titulo={titulo} mensaje={mensaje} tipo={tipo} onClose={() => setMostrarAlerta(false)} /> : null}
      </AgregarPlaga.Provider>
    </>
  );
}

export default TarjetaCultivos;
