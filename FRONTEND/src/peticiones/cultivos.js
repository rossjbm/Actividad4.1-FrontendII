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