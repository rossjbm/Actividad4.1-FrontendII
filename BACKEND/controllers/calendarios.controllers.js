const cultivosUser = require("../models/cultivosUser.model");
const cultivosData = require("../models/cultivosData.model");

class calendarios {
    async porcultivo(req, res, next){
        const idUsuario = req.params.idUsuario;
        const idCultivo = req.params.idCultivo;
        // vamos a buscar información de la siembra
        try {
            const siembra = await cultivosUser.findById(idCultivo)
            let wikiSiembra = await cultivosData.find({nombre:siembra.cultivo})
            wikiSiembra = wikiSiembra[0]
            console.log(siembra);
            console.log(wikiSiembra);
            res.status(200).json({
                'cultivo': {
                    'nombreDeCultivo':siembra.cultivo,
                    'fechaPlantada': siembra.plantacion,
                    'vidaUtil': wikiSiembra.vidaUtil,
                    'etapasFloracion': wikiSiembra.etapaFloracion,
                    'etapasFruto' : wikiSiembra.etapaFruto,
                    'necesidadFertilizante': siembra.fertilizante,
                    'regarPorDia':{'dias':siembra.regar.dias,'hecho': siembra.regar.hecho},
                    'podarPorDia':{'dias':siembra.podar.dias,'hecho':siembra.podar.hecho},
                    'fertilizarPorDia':{'dias': siembra.fertilizar.dias,'hecho':siembra.fertilizar.hecho}
                }
            })
        } catch (error) {
            
        }
    }
}

module.exports = new calendarios();