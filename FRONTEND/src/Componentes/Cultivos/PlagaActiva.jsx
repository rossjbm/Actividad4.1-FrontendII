
import { useContext, useEffect } from "react";
import { AgregarPlaga } from "./TarjetaCultivos";

import { Modal } from "flowbite-react";

export function PlagaActiva({id, plagas}) {

    const {setOpenPlaga, openPlaga, statePlaga, setStatePlaga, cambiandoPlaga, subidaPlaga} = useContext(AgregarPlaga)

    useEffect(()=>{
        setStatePlaga({
            ...statePlaga,
            id: id,
        });
    }, [])

    return(<>
        <Modal dismissible show={openPlaga} onClose={() => setOpenPlaga(false)}>
          <Modal.Header className="border-none dark:bg-Verde-oscuro-800 bg-Marron-400 font-titulo text-xl">
            <h3 className="dark:text-white text-Verde-oscuro-800 text-center w-full">
              Registro de Contagio
            </h3>
          </Modal.Header>
          <Modal.Body className="dark:bg-Verde-oscuro-800 bg-Marron-400 rounded-b-lg">
            <div className="space-y-6">
              <form
                onSubmit={(e) => {
                    setOpenPlaga(false)
                    subidaPlaga(e, id);
                }}
                action=""
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="para"
                    className="dark:text-white font-titulo text-lg text-Verde-oscuro-800"
                  >
                    Selecciona la Plaga:
                  </label>
                  <select
                    onChange={cambiandoPlaga}
                    value={statePlaga.para}
                    name="para"
                    id="para"
                    className="dark:bg-Verde-claro-600 dark:text-white rounded-3xl border-none text-Verde-oscuro-800 px-4 font-texto focus:outline-none"
                    required
                  >
                    <option
                      value=""
                      className="dark:bg-Verde-claro-600 dark:text-white font-texto text-Verde-oscuro-800 px-4"
                    >
                      
                    </option>
                    {plagas.map((plaga, id) => (
                      <option
                        key={id}
                        value={plaga.tipo}
                        className="dark:bg-Verde-claro-600 dark:text-white font-texto text-Verde-oscuro-800 px-4"
                      >
                        {plaga.tipo}
                      </option>
                    ))}
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
    </>)
}