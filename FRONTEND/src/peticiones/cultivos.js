
//Listar Cultivos por Usuario ID
export async function listarCultivos(usuarioId) {
    return fetch(`http://localhost:3000/cultivos/${usuarioId}`, {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(response => {
        if (response.error) {
            console.log('error', response.error);
            throw response.error
        }else{
            console.log('exito', response)
            return response.cultivos;
        } 
    })
    .catch ((error) => {
        throw ("Error:", error)
    }) 
}

//Listar Toda la Información de los Cultivos
export async function listarCultivosData() {
    return fetch(`http://localhost:3000/cultivosData`, {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(response => {
        if (response.error) {
            console.log('error', response.error);
            throw response.error
        }else{
            console.log('exito', response)
            return response.cultivosData;
        } 
    })
    .catch ((error) => {
        throw ("Error:", error)
    }) 
}

//Listar Informacion de los Cultivos por su Nombre
export async function listarCultivosDataName(nombre) {
    return fetch(`http://localhost:3000/cultivosData/nombre/${nombre}`, {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(response => {
        if (response.error) {
            console.log('error', response.error);
            throw response.error
        }else{
            console.log('exito', response)
            return response.cultivoNombre;
        } 
    })
    .catch ((error) => {
        throw ("Error:", error)
    }) 
}

//Agregar un Cultivo al Usuario
export async function agregarCultivo(cultivo) {
    fetch(`http://localhost:3000/cultivos`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cultivo)
    })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                console.log('error', response.error);
                throw response.error
            } else {
                console.log(response)
                return response;
            }
        })
        .catch((error) => {
            throw ("Error:", error)
        })
}

//Actualizar el Estado de las Tareas de un Cultivo del Usuario
export async function actualizarEstado(posicion, id, tarea, cambio) {
    fetch(`http://localhost:3000/cultivos/tareaEstado`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({posicion, id, tarea, cambio})
    })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                console.log('error', response.error);
                throw response.error
            } else {
                console.log(response)
                return response;
            }
        })
        .catch((error) => {
            throw ("Error:", error)
        })
}

//Agregar las Tareas de Pesticida a un Cultivo del Usuario
export async function agregarPesticida(datos) {
    return fetch(`http://localhost:3000/cultivos/pesticida`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                console.log('error', response.error);
                throw response.error
            }
            console.log(response.mensaje)
            return response.mensaje;
            
        })
        .catch((error) => {
            throw ("Error:", error)
        })
}