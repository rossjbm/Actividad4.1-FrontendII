import { Link } from 'react-router-dom';

function ErrorLogin() {
    return (
        <main className="w-full h-[100vh] dark:bg-Verde-oscuro-800 bg-white flex flex-col justify-center items-center">
            <div className="mb-4 text-center">
                <h1 className="text-Verde-oscuro-800 p-8 dark:text-white text-3xl font-titulo">No has iniciado sesión</h1>
                <Link to="/iniciosesion" className="hover:underline text-black dark:text-white">Inicia Sesión Aquí</Link>
            </div>
        </main>
    );
}

export default ErrorLogin;

