const { Schema, model} = require('mongoose');

const EquipoSchema = Schema({
    _PotenciaMotor:{
        type: Number,
        required: [true, 'La potencia es obligatoria']
    },
    _KmRecorridos:{
        type: Number,
        default: 0
    },
    _Categoria:{
        type:String,
        required:true,
        enum: ['LOCOMOTORAS', 'COCHE-MOTOR']
    },
    _Climatizado:{type:Boolean},
    _Marca:{type:String},
    _Estado:{
        type:Boolean,
        default: true
    }
});


EquipoSchema.methods.toJSON = function(){
    const { __v , _id ,...equipos} = this.toObject();
    equipos.uid = _id;
    return equipos
}


module.exports = model( 'Equipo_trenes', EquipoSchema)