const { Schema, model} = require('mongoose');

const ItinerarioSchema = Schema({
    _Kms:{
        type: String,
        require: true,
        default: 100
    },
    _Vagones:{
        type:Number,
        require: true,
        default: 3
    },
    _Origen:{
        type:String,
        require: true
    },
    _Destino:{
        type: String,
        require: true
    },
    _Estado:{
        type:Boolean,
        default: true
    }
});


ItinerarioSchema.methods.toJSON = function(){
    const { __v ,_id, ...itinerario} = this.toObject();
    itinerario.uid = _id;
    return itinerario
}


module.exports = model( 'Itinerario', ItinerarioSchema)