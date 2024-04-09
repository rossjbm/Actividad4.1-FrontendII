import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Mostrar } from "../../App";

//imagenes
import Referencia1 from "../../assets/referencia1.png"
import Referencia2 from "../../assets/referencia2.png"
import Referencia3 from "../../assets/referencia3.png"
import RigoPlant from "../../assets/icono-rigoplant.png"

export function Landing(){

    const { setHeaderMostrar } = useContext(Mostrar);
    useEffect(() => {
        setHeaderMostrar(false);
        return () => {
            setHeaderMostrar(true);
        };
    }, []);

    return(<>
        <div className="w-full h-full bg-fondoLanding bg-cover bg-top text-white"><div className="bg-gradient-to-b md:bg-gradient-to-r dark:from-Verde-oscuro-800 from-Verde-oscuro-600 dark:via-Verde-oscuro-800 via-Verde-oscuro-600 via-20% to-transparent  w-full">
            <section className="w-full md:w-3/5 lg:w-1/2 pt-10">
                <div className="flex justify-center items-center">
                    <div className="w-24 md:w-32 lg:w-48 h-auto">
                        <img src={RigoPlant} alt="Icono de RigoPlant" />
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-titulo">RigoPlant</h1>
                </div>
                <div className="flex flex-col items-center text-center py-8 px-12 gap-5">
                    <p className="text-xl">¿Quieres mantener tus cultivos saludables y bien cuidados? <b>RigoPlant</b> es lo que necesitas. </p>
                    <p className="text-lg">Nuestra aplicación es la mejor opción para el riego eficiente de tus cultivos, diseñada para ayudarte a maximizar la productividad de tus plantas.</p>
                    <Link to={'/iniciosesion'}>
                        <button className="border-2 py-2 px-10 text-2xl font-titulo mt-10 hover:bg-Verde-oscuro-400 hover:border-Verde-oscuro-400">¡Comenzar!</button>
                    </Link>
                </div>
                <div className="text-Verde-oscuro-800 flex flex-col justify-center items-center pt-10 pb-20 md:px-6 gap-10">
                    <section className="flex justify-center items-center bg-[#A4B17BCC] p-6 md:rounded-3xl gap-2 w-full">
                        <div className="w-[350px] md:max-w-52 h-auto">
                            <img src={Referencia3} alt="Calendario" />
                        </div>
                        <p className=" text-base lg:text-xl text-center font-bold">Mira las fechas importantes y deja que te recordemos cuándo es el momento de regar, fertilizar y podar</p>
                    </section>
                    <section className="flex justify-center items-center bg-[#A4B17BCC] p-6 md:rounded-3xl gap-2 w-full">
                        <div className="w-[350px] md:max-w-52 h-auto">
                            <img src={Referencia2} alt="Riego" />
                        </div>
                        <p className="text-base lg:text-xl text-center font-bold">Te proporcionamos las herramientas y la información que necesitas para regar tus plantas de manera eficiente</p>
                    </section>
                    <section className="flex justify-center items-center bg-[#A4B17BCC] p-6 md:rounded-3xl gap-2 w-full">
                        <div className="w-[350px] md:max-w-52 h-auto">
                            <img src={Referencia1} alt="Clima" />
                        </div>
                        <p className="text-base lg:text-xl text-center font-bold">Cuenta con información del clima en tiempo real para que ajustes cada riego según las condiciones climáticas</p>
                    </section>
                </div>
            </section>
        </div></div>
    </>)
}
