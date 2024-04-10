import logo from "../../assets/logo-cultivos.svg";
import logoDark from "../../assets/logo-cultivos-dark.svg";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  agregarCultivo,
  listarCultivos,
  listarCultivosData,
} from "../../peticiones/cultivos";
import { Alert } from "flowbite-react";
import TarjetaCultivos from "../../Componentes/Cultivos/TarjetaCultivos";
import Loader from "../../Componentes/globales/Loader/Loader";

function Cultivos() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [openModal, setOpenModal] = useState(false);
  const [cultivos, setCultivos] = useState([]);
  const [cultivosData, setCultivosData] = useState([]);
  const [data, setData] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [seleccionadoData, setSeleccionadoData] = useState(null);
  const [alertaCorrecta, setAlertaCorrecta] = useState(false);
  const [alertaError, setAlertaError] = useState(false);
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem("usuarioId")); // Ejemplo
  const [state, setState] = useState({
    nombre: "",
    cultivo: "",
    usuarioId: usuarioId, //Ejemplo
    fertilizante: "",
    plantacion: "",
    superficie: "",
    numeroCultivos: "",
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2000); // Tiempo en milisegundos para simular la carga
  
    return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
  }, []);

  useEffect(() => {
    async function actualizarCultivos() {
      const data = await listarCultivos(usuarioId); //cultivos guarda los cultivos de usuario
      const datos = await listarCultivosData();
      setCultivos(data);
      setCultivosData(datos);
    }

    actualizarCultivos();
  }, []);

  useEffect(() => {
    const arrayCultivos = [];
    for (let i = 0; i < cultivos.length; i++) {
      console.log(cultivos[i].cultivo);
      const actualizado = cultivos[i];
      for (let a = 0; a < cultivosData.length; a++) {
        if (cultivos[i].cultivo === cultivosData[a].nombre) {
          actualizado.data = cultivosData[a];
          arrayCultivos.push(actualizado);
          console.log('soy array',arrayCultivos)
        }
      }
    }
    console.log(arrayCultivos);
    setData(arrayCultivos);  //informacion de los cultivos
  }, [cultivos]);

  async function actualizandoAdd() {
    const data = await listarCultivos(usuarioId);
    setCultivos(data);
  }

  function cargarCultivo(id) {
    for (let i = 0; i < cultivos.length; i++) {
      if (cultivos[i]._id === id) {
        setSeleccionado(cultivos[i]);  //seleccionado cultivo de usuario
        for (let a = 0; a < cultivosData.length; a++) {
          if (cultivosData[a].nombre === cultivos[i].cultivo) {
            setSeleccionadoData(cultivosData[a]);  //data del cultivo seleccionado
            console.log('soy cultivo de selecicoando', cultivosData[a])
          }
        }
      }
    }
  }

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

    const respuesta = await agregarCultivo(state);
    console.log(respuesta)
    if (respuesta === undefined) {
      actualizandoAdd()
      setOpenModal(false);
      setAlertaCorrecta(!alertaCorrecta);
    } else {
      setAlertaError(!alertaError);
    }
  }

  return (
    <>
      {!loaded ? (
        <Loader /> // Muestra el loader mientras se simula la carga
      ) : (
      <section className="py-12 px-4 min-h-[100vh] ">
        {alertaCorrecta ? (
          <>
            <Alert
              color="success"
              className="mb-8"
              onDismiss={() => setAlertaCorrecta(!alertaCorrecta)}
            >
              <span className="font-medium">Agregado con exito el cultivo</span>
            </Alert>
          </>
        ) : (
          <></>
        )}

        {alertaError ? (
          <>
            <Alert
              color="success"
              className="mb-8"
              onDismiss={() => setAlertaError(!alertaError)}
            >
              <span className="font-medium">Error al agregar el cultivo</span>
            </Alert>
          </>
        ) : (
          <></>
        )}
        <h1 className="dark:text-white text-Verde-oscuro-800 font-titulo text-2xl text-center">
          Tus Cultivos
        </h1>

        {cultivos.length === 0 ? (
          <>
            {/* Cuando no hay cultivos */}
            <div className="h-full flex items-center justify-center flex-col pt-16 gap-2">
              <h2 className="dark:text-white font-texto text-xl text-Verde-oscuro-800">
                No tienes cultivos
              </h2>
              <h3 className="dark:text-white font-texto text-xl text-Verde-oscuro-800">
                ¿Yá sembraste uno?
              </h3>
              <a
                className="dark:text-white font-texto text-xl text-Verde-oscuro-800 underline cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                Agrégalo Aquí
              </a>
              <img src={logo} alt="Logo de Cultivos" className="mt-8 dark:fill-white" />
            </div>
          </>
        ) : (
          <>
            {/* Cuando si hay cultivos */}
            <div className="flex flex-col gap-12 pt-16">
              <ul className="flex items-center justify-center gap-4 flex-wrap">
                <li className="dark:text-white dark:bg-Marron-900 dark:hover:text-Marron-900 dark:hover:bg-Verde-claro-400  bg-Verde-claro-600 text-Verde-oscuro-800 hover:text-Verde-claro-600 hover:bg-Verde-oscuro-800 transition-all duration-300 p-2 rounded-xl cursor-pointer">
                  <a
                    onClick={(e) => {
                      setSeleccionado(null);
                    }}
                    className="text-center font-texto text-base font-semibold"
                  >
                    Todos
                  </a>
                </li>
                {cultivos.map((cultivo, id) => (
                  <li
                    key={id}
                    className="dark:text-white dark:bg-Marron-900 dark:hover:text-Marron-900 dark:hover:bg-Verde-claro-400 bg-Verde-claro-600 text-Verde-oscuro-800 hover:text-Verde-claro-600 hover:bg-Verde-oscuro-800 transition-all duration-300 p-2 rounded-xl cursor-pointer"
                  >
                    <a
                      key={id}
                      onClick={(e) => {
                        cargarCultivo(cultivo._id);
                      }}
                      className="text-center font-texto text-base font-semibold"
                    >
                      {cultivo.cultivo}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="h-full flex items-center justify-center flex-col gap-2">
                <h2 className="dark:text-white font-texto text-xl text-Verde-oscuro-800 text-center px-24">
                  Presiona alguno de tus cultivos para ver su información
                </h2>
                <a
                  className="dark:text-white font-texto text-xl text-Verde-oscuro-800 underline cursor-pointer"
                  onClick={() => setOpenModal(true)}
                >
                  Agrega tu Cultivo Aquí
                </a>
                {
                  darkMode
                  ? (<img src={logoDark} alt="Logo de Cultivos" className="mt-8" />)
                  : (<img src={logo} alt="Logo de Cultivos" className="mt-8" />)
                }
              </div>

              <div className="md:grid md:grid-cols-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {seleccionado === null ? (
                  data.map((cultivo, id) => (
                    <>
                      <div className="w-full flex flex-col">
                        <TarjetaCultivos
                          key={id}
                          cultivo={cultivo}
                          cultivoData={cultivo.data}
                        />
                      </div>
                    </>
                  ))
                ) : (
                  <>
                    <div className="w-full flex flex-col">
                      <TarjetaCultivos
                        cultivo={seleccionado}
                        cultivoData={seleccionadoData}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header className="border-none dark:bg-Verde-oscuro-800 bg-Marron-400 font-titulo text-xl">
            <h3 className="dark:text-white text-Verde-oscuro-800 text-center w-full">
              Agregar Cultivo{" "}
            </h3>
          </Modal.Header>
          <Modal.Body className="dark:bg-Verde-oscuro-800 bg-Marron-400 rounded-b-lg">
            <div className="space-y-6">
              <form
                onSubmit={(e) => {
                  subida(e);
                }}
                action=""
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="cultivo"
                    className="dark:text-white font-titulo text-lg text-Verde-oscuro-800"
                  >
                    Selecciona el Cultivo:
                  </label>
                  <select
                    onChange={cambiando}
                    value={state.cultivo}
                    name="cultivo"
                    id="cultivo"
                    className="dark:bg-Verde-claro-600 dark:text-white rounded-3xl border-none text-Verde-oscuro-800 px-4 font-texto focus:outline-none"
                    required
                  >
                    <option
                      value=""
                      className="dark:bg-Verde-claro-600 dark:text-white font-texto text-Verde-oscuro-800 px-4"
                    >
                      cultivo
                    </option>
                    {cultivosData.map((cultivoData, id) => (
                      <option
                        key={id}
                        value={cultivoData.nombre}
                        className="dark:bg-Verde-claro-600 dark:text-white font-texto text-Verde-oscuro-800 px-4"
                      >
                        {cultivoData.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="nombre"
                    className="dark:text-white font-titulo text-lg text-Verde-oscuro-800"
                  >
                    Da un Nombre a tu Cultivo:
                  </label>
                  <input
                    type="text"
                    onChange={cambiando}
                    value={state.nombre}
                    name="nombre"
                    id="nombre"
                    className="dark:bg-Verde-claro-600 dark:text-white rounded-3xl border-none text-Verde-oscuro-800 px-4 font-texto focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="plantacion"
                    className="dark:text-white font-titulo text-lg text-Verde-oscuro-800"
                  >
                    Día de Plantación:
                  </label>
                  <input
                    type="date"
                    onChange={cambiando}
                    value={state.plantacion}
                    name="plantacion"
                    id="plantacion"
                    className="dark:bg-Verde-claro-600 dark:text-white rounded-3xl border-none text-Verde-oscuro-800 px-4 font-texto focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="numeroCultivos"
                    className="dark:text-white font-titulo text-lg text-Verde-oscuro-800"
                  >
                    Número de Cultivos:
                  </label>
                  <input
                    onChange={cambiando}
                    value={state.numeroCultivos}
                    type="number"
                    name="numeroCultivos"
                    id="numeroCultivos"
                    className="dark:bg-Verde-claro-600 dark:text-white rounded-3xl border-none text-Verde-oscuro-800 px-4 font-texto focus:outline-none"
                    min={0}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="superficie"
                    className="dark:text-white font-titulo text-lg text-Verde-oscuro-800"
                  >
                    Tamaño de la Superficie en m²:
                  </label>
                  <input
                    type="number"
                    onChange={cambiando}
                    value={state.superficie}
                    name="superficie"
                    id="superficie"
                    className="dark:bg-Verde-claro-600 dark:text-white rounded-3xl border-none text-Verde-oscuro-800 px-4 font-texto focus:outline-none"
                    min={0}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="fertilizante"
                    className="dark:text-white font-titulo text-lg text-Verde-oscuro-800"
                  >
                    ¿Usarás Fertilizante?:
                  </label>
                  <select
                    name="fertilizante"
                    onChange={cambiando}
                    value={state.fertilizante}
                    id="fertilizante"
                    className="dark:bg-Verde-claro-600 dark:text-white rounded-3xl border-none text-Verde-oscuro-800 px-4 font-texto focus:outline-none"
                    required
                  >
                    <option
                      value=""
                      className="dark:bg-Verde-claro-600 dark:text-white font-texto text-Verde-oscuro-800 px-4"
                    ></option>
                    <option
                      value="Si"
                      className="dark:bg-Verde-claro-600 dark:text-white font-texto text-Verde-oscuro-800 px-4"
                    >
                      Si
                    </option>
                    <option
                      value="No"
                      className="dark:bg-Verde-claro-600 dark:text-white font-texto text-Verde-oscuro-800 px-4"
                    >
                      No
                    </option>
                  </select>
                </div>

                <div className="flex items-center justify-center mt-4">
                  <button
                    type="submit"
                    className="rounded-3xl dark:bg-Marron-900 dark:hover:bg-Verde-claro-600 bg-Verde-oscuro-400 font-titulo text-lg text-white py-2 px-8 hover:bg-Verde-oscuro-800"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </section>
      )}
  </>
);
}

export default Cultivos;
