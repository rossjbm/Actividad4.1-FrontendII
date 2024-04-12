import { useState } from "react";
import { Link } from 'react-router-dom';

function Login() {

    const [state, setState] = useState({
        usuario: "",
        password: ""
    });

    const validacion = () => {
        let claves = Object.keys(state);
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            if (state[clave].trim() === "") {
                return true;
            }
        }
    };

    const cambiando = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    async function subida(e) {
        e.preventDefault();
        const error = validacion();

        if (error) {
            return setAlertaError(!alertaError);
        }

        fetch(`http://localhost:3000/usuarios/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state)
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    console.log('error', response.error);
                    setState({
                        usuario: '',
                        password: ''
                    })
                } else {
                    console.log(response)
                    setState({
                        usuario: '',
                        password: ''
                    })
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("usuarioId", response.usuarioId);
                    window.location.href = "http://localhost:5000/tuscultivos"
                }
            })
            .catch((error) => {
                setState({
                    usuario: '',
                    password: ''
                })
            })
    }

    return (
        <>
            <main className="w-full h-[900px] bg-fondoLanding bg-cover bg-center bg-no-repeat flex justify-center items-center lg:items-start lg:pt-20">
                <div className="w-[90vw] md:w-[60vw] xl:w-[40vw] p-8 bg-Marron-400 dark:bg-Verde-oscuro-800 rounded-2xl border-[3px] flex flex-col gap-6 border-Verde-oscuro-800 dark:border-white">
                    <h1 className="font-titulo text-Verde-oscuro-800 dark:text-white text-3xl text-center">Iniciar Sesión</h1>
                    <form onSubmit={subida} action="" className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="usuario"
                                className="dark:text-white font-titulo text-lg text-Verde-oscuro-800"
                            >
                                Usuario:
                            </label>
                            <input
                                type="text"
                                onChange={cambiando}
                                value={state.usuario}
                                name="usuario"
                                id="usuario"
                                className="dark:bg-white dark:text-Verde-oscuro-800 rounded-3xl border-none text-Verde-oscuro-800 px-4 font-texto focus:outline-none"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="dark:text-white font-titulo text-lg text-Verde-oscuro-800"
                            >
                                Password:
                            </label>
                            <input
                                type="password"
                                onChange={cambiando}
                                value={state.password}
                                name="password"
                                id="password"
                                className="dark:bg-white dark:text-Verde-oscuro-800 rounded-3xl border-none text-Verde-oscuro-800 px-4 font-texto focus:outline-none"
                                required
                            />
                        </div>
                        <div className="flex justify-center p-2">
                        <button type="submit" className="rounded-3xl dark:bg-Verde-claro-800 dark:hover:bg-Verde-claro-400 bg-Verde-claro-600 font-titulo text-lg text-Verde-oscuro-800 font-bold py-2 px-8 hover:bg-Verde-claro-800">Iniciar</button>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                        <span className="text-black dark:text-white">¿Aún no has iniciado sesión?</span>
                        <Link to="/registro" className="hover:underline text-black dark:text-white">Registrate</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login
