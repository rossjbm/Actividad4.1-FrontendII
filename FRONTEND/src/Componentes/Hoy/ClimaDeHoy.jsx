import { ImagenClima } from "./ImagenClima";


export function ClimaDeHoy( {climaHoy, fechaHoy}) {
    console.log(fechaHoy)

    if (climaHoy === undefined) {
        return(
            <div className="flex flex-col justify-center items-center my-10">
                <div className="animate-spin rounded-full h-10 w-10  border-t-4 border-b-4 border-black dark:border-white"></div>
            </div>
        )
    }
    const hora = fechaHoy.getHours();
    const minutos = fechaHoy.getMinutes();
    const codigo = climaHoy.codigo

    return(<>
        <section className="bg-Verde-claro-800 w-full md:w-3/5 p-6 text-Verde-oscuro-800 font-titulo my-5">
            <h2 className="text-center text-xl mb-5">Clima de las {hora}:{minutos}</h2>
            <div className="flex flex-row gap-8 items-center">
                <div className="w-2/5 flex justify-center">
                    <ImagenClima hora={hora} codigo={codigo} />
                </div>
                <ul className="w-3/5 text-lg">
                    <li>Temperatura: {climaHoy.temperatura}{climaHoy.temperaturaMedida}</li>
                    <li>Humedad: {climaHoy.humedad}{climaHoy.humedadMedida}</li>
                    <li>Velocidad del Viento: {climaHoy.vviento}{climaHoy.vvientoMedida}</li>
                    <li>Direción del Viento: {climaHoy.dviento}{climaHoy.dvientoMedida}</li>
                </ul>
            </div>
        </section>
    
    </>)
}
