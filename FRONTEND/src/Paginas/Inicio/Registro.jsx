import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

const RegistroFormulario = () => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [usuarioUnico, setUsuarioUnico] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [ubicacion, setUbicacion] = useState({ latitud: null, longitud: null });
    const [datosRegistrados, setDatosRegistrados] = useState(null);

    // Referencia al mapa
    const mapRef = useRef(null);

    useEffect(() => {
        // Inicializa el mapa al cargar el componente
        if (!mapRef.current) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 0, lng: 0 }, // Centro inicial del mapa
            zoom: 2, // Nivel de zoom inicial
        });

        // Agrega un evento de clic en el mapa para obtener la ubicación
        map.addListener('click', (e) => {
            const latitud = e.latLng.lat();
            const longitud = e.latLng.lng();
            setUbicacion({ latitud, longitud });
        });

        // Asigna el mapa a la referencia
        mapRef.current = map;
    }, []);

    const handleRegistro = (e) => {
        e.preventDefault();

        // Guardar los datos registrados en una variable
        const datos = {
            nombreCompleto,
            usuarioUnico,
            correoElectronico,
            contrasena,
            confirmarContrasena,
            ubicacion,
        };
        setDatosRegistrados(datos);

        // Limpia los campos después del registro
        setNombreCompleto('');
        setUsuarioUnico('');
        setCorreoElectronico('');
        setContrasena('');
        setConfirmarContrasena('');
        setUbicacion({ latitud: null, longitud: null });

        console.log(datos);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-fondoLanding bg-cover bg-top">
        <div className="w-[90vw] md:w-[60vw] xl:w-[40vw] p-8 bg-Marron-400 dark:bg-Verde-oscuro-800 rounded-2xl border-[3px] flex flex-col gap-6 border-Verde-oscuro-800 dark:border-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white font-titulo">Registrarse</h2>

        <form onSubmit={handleRegistro} className="space-y-6">
            <label htmlFor="nombreCompleto" className="block text-black dark:text-white font-titulo">Nombre Completo</label>
            <input type="text" id="nombreCompleto" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} className="input w-full h-12 rounded-md font-texto text-black" />

            <label htmlFor="usuarioUnico" className="block text-black dark:text-white font-titulo">Usuario Único</label>
            <input type="text" id="usuarioUnico" value={usuarioUnico} onChange={(e) => setUsuarioUnico(e.target.value)} className="input w-full h-12 rounded-md font-texto text-dark" />

            <label htmlFor="correoElectronico" className="block text-black dark:text-white font-titulo">Correo Electrónico</label>
            <input type="email" id="correoElectronico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} className="input w-full h-12 rounded-md font-texto text-black" />

            <label htmlFor="contrasena" className="block text-black dark:text-white font-titulo">Contraseña</label>
            <input type="password" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="input w-full h-12 rounded-md font-texto text-black " />

            <label htmlFor="confirmarContrasena" className="block text-black dark:text-white font-titulo">Confirmar Contraseña</label>
            <input type="password" id="confirmarContrasena" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} className="input w-full h-12 rounded-md font-texto text-black" />

            <label htmlFor="Ubicacion" className="block text-black dark:text-white font-titulo">Selecciona tu ubicación</label>
            <div ref={mapRef} style={{ width: '100%', height: '300px' }} />

            <div className="flex justify-center">
                <button type="submit" className="btn btn-primary bg-Verde-claro-800 text-white font-bold py-3 px-6 rounded font-titulo rounded-full">Registrarse</button>
            </div>

            <div className="flex justify-center items-center space-x-2">
                <span className="text-black dark:text-white">¿Ya tienes cuenta?</span>
                <Link to="/iniciosesion" className="hover:underline text-black dark:text-white">Inicia Sesión</Link>
            </div>
        </form>
    </div>
</div>

);
};

export default RegistroFormulario;








