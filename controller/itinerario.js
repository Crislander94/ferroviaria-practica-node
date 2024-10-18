const {Itinerario} = require('../model');

const obtenerItinerario = async(req = Request, res = Response , next) => {
    const itinerario  = await Itinerario.find({estado: true});
    if(!itinerario){
        return res.json({msg: 'No se encontro información'});
    }
    res.json({itinerario});
}

const crearItinerario = (req = Request, res = Response , next) => {
    const {_Kms,_Vagones,_Origen,_Destino} = req.body;


    if(_Kms <= 50){
        return res.status(400).json({
            msg: 'La cantidad de Kilometros debe ser mayor a 50'
        });
    }

    if(_Vagones === 0){
        return res.status(400).json({
            msg: 'La cantidad debe ser mayor a cero'
        });
    }

    const data = {
        _Kms,
        _Vagones,
        _Origen,
        _Destino
    }

    // //Creamos el objeto con el equipo
    const itinerario = new Itinerario(data);

    // //Guardamos el itinerario
    itinerario.save();

    // Exito
    res.status(201).json({itinerario});
}
const actualizarItinerario = (req = Request, res = Response , next) => {
    res.json({msg : "actualizarItinerario"})
}
const eliminarItinerario = (req = Request, res = Response , next) => {
    res.json({msg : "eliminarItinerario"})
}


module.exports = {
    obtenerItinerario,
    crearItinerario,
    actualizarItinerario,
    eliminarItinerario
}