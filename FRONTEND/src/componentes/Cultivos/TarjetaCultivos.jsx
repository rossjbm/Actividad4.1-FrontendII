import { Accordion } from "flowbite-react";

function TarjetaCultivos({ cultivo, cultivoData }) {
  console.log('soy cultivo',cultivo)
  console.log('soy cultivoData',cultivoData)
  return (
    <>
      <div className="border-[3px] dark:bg-Marron-900 dark:border-Marron-900 border-Marron-400 py-8 px-2">
        <div className="flex flex-col gap-4">
          <h3 className="dark:text-white text-2xl font-titulo font-semibold text-Verde-oscuro-800 text-center">
            {cultivo.nombre}
          </h3>
          <h4 className="dark:text-white text-xl font-titulo text-Verde-oscuro-800 text-center">
            {cultivoData.nombreCientifico}
          </h4>

          <ul className="px-4 flex flex-col gap-2">
            <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800">
              Día de Plantación: {cultivo.plantacion}
            </li>
            <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800">
              Día de Floración: No se que hacer
            </li>
            <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800">
              Día de Cosecha: No se que hacer
            </li>
            <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800">
              Cantidad de Agua por Planta: De {cultivoData.riego.cantidadBaja}ml a {cultivoData.riego.cantidadAlta}ml
            </li>
            <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800">
              Fertilizante: {cultivo.fertilizante}
            </li>
            <ul className="flex gap-6">
              <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800 text-center">
                Número de Siembras: {cultivo.numeroCultivos}
              </li>
              <li className="dark:text-white text-sm font-texto text-Verde-oscuro-800 text-center">
                Tamaño de Superficie: {cultivo.superficie} m2
              </li>
            </ul>
          </ul>

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
                  <ul className="px-8">
                    <li className="dark:text-white list-disc text-sm text-Verde-oscuro-800">{cultivoData.plagas}</li>
                  </ul>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default TarjetaCultivos;
