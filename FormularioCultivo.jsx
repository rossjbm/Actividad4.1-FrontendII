import React, { useState, useEffect } from 'react';
import Alerta from '../../Componentes/Recomendar/Alerta';
import Loader from "../../Componentes/globales/Loader/Loader";
import { listarUsuarioId } from '../../peticiones/usuarios';

const FormularioCultivo = () => {
    const [cultivo, setCultivo] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [tipoAlerta, setTipoAlerta] = useState('');
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [tituloAlerta, setTituloAlerta] = useState('');
    const [humedad, setHumedad] = useState(null);
    const [temperatura, setTemperatura] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const opcionesCultivo = ['Zanahoria', 'Papa', 'Tomate', 'Pimentón', 'Lechuga'];
    const [usuarioId, setUsuarioId] = useState(localStorage.getItem("usuarioId"));

    const rangosCultivo = {
        Zanahoria: { humedadMin: 70, humedadMax: 80, temperaturaMin: 16, temperaturaMax: 18 },
        Papa: { humedadMin: 90, humedadMax: 95, temperaturaMin: 20, temperaturaMax: 25 },
        Tomate: { humedadMin: 60, humedadMax: 85, temperaturaMin: 18, temperaturaMax: 27 },
        Pimentón: { humedadMin: 50, humedadMax: 70, temperaturaMin: 20, temperaturaMax: 25 },
        Lechuga: { humedadMin: 60, humedadMax: 80, temperaturaMin: 15, temperaturaMax: 20 },
    };


    useEffect(() => {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 2000); // Tiempo en milisegundos para simular la carga
    
      return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
    }, []);

    useEffect(() => {
        const obtenerDatosAPI = async () => {
            try {
                const dataUsuario = await listarUsuarioId(usuarioId)
                console.log('DATA',dataUsuario)
                try {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${dataUsuario.latitud}&longitude=${dataUsuario.longitud}&hourly=temperature_2m,relative_humidity_2m,weather_code&forecast_days=1`);
                    if (!response.ok) {
                        throw new Error('Error en la solicitud a la API');
                    }
                    const data = await response.json();
    
                    if (data && data.hourly && data.hourly.temperature_2m && data.hourly.relative_humidity_2m) {
                        const temp = data.hourly.temperature_2m[11];
                        const hum = data.hourly.relative_humidity_2m[11];
    
                        setTemperatura(temp);
                        setHumedad(hum);
                    } else {
                        throw new Error('Datos de la API no están en el formato esperado');
                    }
                } catch (error) {
                    console.error('Error al obtener datos de la API:', error);
                    setTipoAlerta('error');
                    setMensajeAlerta('Error al obtener datos de la API. Por favor, inténtalo de nuevo.');
                    setMostrarAlerta(true);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        };

        obtenerDatosAPI();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!cultivo || humedad === null || temperatura === null) {
                throw new Error('Todos los campos son obligatorios');
            }

            const rangoCultivo = rangosCultivo[cultivo];
            if (humedad >= rangoCultivo.humedadMin && humedad <= rangoCultivo.humedadMax && temperatura >= rangoCultivo.temperaturaMin && temperatura <= rangoCultivo.temperaturaMax) {
                setTipoAlerta('exito');
                setMensajeAlerta(`Las condiciones son buenas para plantar ${cultivo}`);
                setTituloAlerta(`¡Sí, siembrala!`);
            } else {
                setTipoAlerta('error');
                setMensajeAlerta(`Las condiciones no son aptas para plantar ${cultivo}`);
                setTituloAlerta(`¡No, no la siembres!`);
            }

            setMostrarAlerta(true);
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            setTipoAlerta('error');
            setMensajeAlerta('Error al guardar los datos. Por favor, completa todos los campos.');
            setMostrarAlerta(true);
        }
    };

    const handleCloseAlert = () => {
        setMostrarAlerta(false);
    };

    return (
        <>
        {!loaded ? (
          <Loader /> // Muestra el loader mientras se simula la carga
        ) : (
        <div className="flex justify-center items-center h-screen">
            <div className="p-4 rounded-lg shadow-md w-96 bg-Marron-400 dark:bg-Verde-oscuro-800">
                <h2 className="text-xl mb-4 text-center font-titulo dark:text-white">¿Recomendable Cultivar?</h2>

                <form onSubmit={handleSubmit} className="space-y-4 ">
                    <label htmlFor="cultivo" className="block font-titulo dark:text-white">Selecciona el cultivo</label>
                    <select id="cultivo" value={cultivo} onChange={(e) => setCultivo(e.target.value)} className="input w-full rounded-md font-texto dark:bg-Verde-claro-600">
                        <option value="">Selecciona un cultivo</option>
                        {opcionesCultivo.map(opcion => (
                            <option key={opcion} value={opcion}>{opcion}</option>
                        ))}
                    </select>

                    <label htmlFor="humedad" className="block font-titulo dark:text-white">Humedad Actual</label>
                    <input type="number" id="humedad" value={humedad !== null ? humedad : ''} onChange={(e) => setHumedad(e.target.value)} className="input w-full rounded-md  font-texto dark:bg-Verde-claro-600" />

                    <label htmlFor="temperatura" className="block font-titulo dark:text-white">Temperatura Actual</label>
                    <input type="number" id="temperatura" value={temperatura !== null ? temperatura : ''} onChange={(e) => setTemperatura(e.target.value)} className="input w-full rounded-md  font-texto dark:bg-Verde-claro-600" />

                    <div className="flex justify-center">
                        <button type="submit" className="btn btn-primary btn-outline bg-Verde-oscuro-400 border-2 border-Verde-oscuro-400 dark:border-Marron-900     px-4 py-2 rounded-lg text-white font-titulo dark:bg-Marron-900">Guardar</button>
                    </div>
                </form>

                {mostrarAlerta && <Alerta titulo={tituloAlerta} mensaje={mensajeAlerta} tipo={tipoAlerta} onClose={handleCloseAlert} />}
            </div>
        </div>
      )}
    </>
    );
}

export default FormularioCultivo;


