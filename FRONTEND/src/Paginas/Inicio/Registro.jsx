import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../../Componentes/Recomendar/Alerta';
import { agregarUsuario } from '../../peticiones/usuarios';

const RegistroFormulario = () => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [usuarioUnico, setUsuarioUnico] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [datosRegistrados, setDatosRegistrados] = useState(null);
    const [mostrarAlertaExito, setMostrarAlertaExito] = useState(false);
    const [mostrarAlertaError, setMostrarAlertaError] = useState(false);
    const [mostrarAlertaCampos, setMostrarAlertaCampos] = useState(false);
    const [mostrarAlertaContrasena, setMostrarAlertaContrasena] = useState(false);

    // Referencia al mapa
    const mapRef = useRef(null);

    useEffect(() => {
        // Inicializa el mapa al cargar el componente
        if (!mapRef.current) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 7.086884642059552, lng: -66.42410851434519 }, // Centro inicial del mapa
            zoom: 5, // Nivel de zoom inicial
        });
        // Agrega un evento de clic en el mapa para obtener la ubicación
        map.addListener('click', (e) => {
            setLatitud(e.latLng.lat())
            setLongitud(e.latLng.lng());
            // setUbicacion({ latitud, longitud });
        });

        // Asigna el mapa a la referencia
        mapRef.current = map;
    }, []);

    const handleRegistro = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (!nombreCompleto || !usuarioUnico || !correoElectronico || !contrasena || !confirmarContrasena || !latitud || !longitud) {
            // Mostrar alerta de campos incompletos
            setMostrarAlertaCampos(true);
            return;
        }

        // Validar que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            // Mostrar alerta de contraseñas no coinciden
            setMostrarAlertaContrasena(true);
            return;
        }


        // Simula un registro exitoso
        const datos = {
            nombreCompleto,
            usuarioUnico,
            correoElectronico,
            contrasena,
            confirmarContrasena,
            latitud,
            longitud
        };
        console.log('datos enviar', datos)
        // setDatosRegistrados(datos);

        try {
            const agregar = await agregarUsuario(datos)
            console.log(agregar)

            setNombreCompleto('');
            setUsuarioUnico('');
            setCorreoElectronico('');
            setContrasena('');
            setConfirmarContrasena('');
            setLatitud('');
            setLongitud('');

            return setMostrarAlertaExito(true);

        } catch (error) {
            setMostrarAlertaError(true)
            throw error
        }

        // Limpia los campos después del registro
        

        // Muestra la alerta de éxito
        
        // console.log(datos);
    };



    return (
        <div className="flex justify-center items-center min-h-screen bg-fondoLanding bg-cover bg-top py-10">
        <div className="w-[90vw] md:w-[60vw] xl:w-[40vw] p-8 mt-10 mb-10 bg-Marron-400 dark:bg-Verde-oscuro-800 rounded-2xl border-[3px] flex flex-col gap-6 border-Verde-oscuro-800 dark:border-white">
        <h2 className="text-2xl mb-6 text-center text-black dark:text-white font-titulo">Registrarse</h2>

        <form onSubmit={handleRegistro} className="space-y-4">
                    <label htmlFor="nombreCompleto" className="block text-black dark:text-white font-titulo">Nombre Completo</label>
                    <input type="text" id="nombreCompleto" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} className="input w-full h-10 rounded-md font-texto text-black" />

                    <label htmlFor="usuarioUnico" className="block text-black dark:text-white font-titulo">Usuario Único</label>
                    <input type="text" id="usuarioUnico" value={usuarioUnico} onChange={(e) => setUsuarioUnico(e.target.value)} className="input w-full h-10 rounded-md font-texto text-dark" />

                    <label htmlFor="correoElectronico" className="block text-black dark:text-white font-titulo">Correo Electrónico</label>
                    <input type="email" id="correoElectronico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} className="input w-full h-10 rounded-md font-texto text-black" />

                    <label htmlFor="contrasena" className="block text-black dark:text-white font-titulo">Contraseña</label>
                    <input type="password" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="input w-full h-10 rounded-md font-texto text-black " />

                    <label htmlFor="confirmarContrasena" className="block text-black dark:text-white font-titulo">Confirmar Contraseña</label>
                    <input type="password" id="confirmarContrasena" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} className="input w-full h-10 rounded-md font-texto text-black" />

                    <label htmlFor="Ubicacion" className="block text-black dark:text-white font-titulo">Selecciona tu ubicación</label>
                    <div ref={mapRef} style={{ width: '100%', height: '300px' }} />

                    <div className="flex justify-center py-5">
                        <button type="submit" className="btn btn-primary bg-Verde-claro-800 text-white py-2 px-4 font-titulo rounded-full">Registrarse</button>
                    </div>

                    <div className="flex justify-center items-center space-x-2">
                        <span className="text-black dark:text-white">¿Ya tienes cuenta?</span>
                        <Link to="/iniciosesion" className="hover:underline text-black dark:text-white">Inicia Sesión</Link>
                    </div>
                </form>
        </div>

            {/* Mostrar la alerta de éxito si se activa */}
            {mostrarAlertaExito && (
                <Link to="/iniciosesion">
                <Alerta
                    titulo="Registro Exitoso"
                    mensaje="¡Tu registro ha sido exitoso!"
                    tipo="exito"
                    onClose={() => setMostrarAlertaExito(false)}
                />
                </Link>
            )}

            {/* Mostrar la alerta de campos incompletos si se activa */}
            {mostrarAlertaCampos && (
                <Alerta
                    titulo="Campos Incompletos"
                    mensaje="Por favor, completa todos los campos del formulario."
                    tipo="error"
                    onClose={() => setMostrarAlertaCampos(false)}
                />
            )}

            {/* Mostrar la alerta de contraseñas no coinciden si se activa */}
            {mostrarAlertaContrasena && (
                <Alerta
                    titulo="Error en Contraseñas"
                    mensaje="Las contraseñas no coinciden. Por favor, verifica tus contraseñas."
                    tipo="error"
                    onClose={() => setMostrarAlertaContrasena(false)}
                />
            )}

            {/* Mostrar la alerta de contraseñas no coinciden si se activa */}
            {mostrarAlertaError && (
                <Alerta
                    titulo="Ocurrió un Error"
                    mensaje="Vuelve a Intentarlo."
                    tipo="error"
                    onClose={() => setMostrarAlertaError(false)}
                />
            )}
        </div>
    );
};

export default RegistroFormulario;