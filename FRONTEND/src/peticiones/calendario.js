export async function porCultivo(idUsuario,idCultivo) {
    return fetch(`http://localhost:3000/calendario/id/${idUsuario}/cultivo/${idCultivo}`, {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(response => {
        if (response.error) {
            console.error('error', response.error);
            throw response.error
        }else{
            return response;
        } 
    })
    .catch ((err) => {
        throw ("Error:", err)
    }) 
}