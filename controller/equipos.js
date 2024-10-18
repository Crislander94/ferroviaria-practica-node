const {Equipo} = require('../model');

const obtenerEquipos = async(req = Request, res = Response) => {
    const query = {estado: true};

    let [, equipos] = await Promise.all([ 
        Equipo.countDocuments(query),
        Equipo.find(query)
    ]);

    if(!equipos){
        return res.json({equipos : []})
    }

    res.json(equipos);
}

const contarEquipos = async( req = Request , res = Response, next)  => {

    const query = { 
        equipo1 :{_Categoria: 'LOCOMOTORAS',estado: true},
        equipo2: {_Categoria: 'COCHE-MOTOR',estado: true}
    }
   
    let [total_locomotoras] = await Promise.all([ 
        Equipo.countDocuments(query.equipo1),
        Equipo.find(query.equipo1)
    ]);

    let [total_cohemotor] = await Promise.all([ 
        Equipo.countDocuments(query.equipo2),
        Equipo.find(query.equipo2)
    ])

    res.json({total_locomotoras, total_cohemotor});
}

const comprobarUsoCoches = async( req = Request , res = Response, next)  => {

    const query = {
        equipo2: {_Categoria: 'COCHE-MOTOR',estado: true}
    }

    let [, coches] = await Promise.all([ 
        Equipo.countDocuments(query.equipo2),
        Equipo.find(query.equipo2)
    ]);

    if(!coches){
        return res.json({msg: 'No existen COCHES-MOTOR creados'})
    }

    const suma_kms = coches.reduce((acumulador, {_KmRecorridos}) => {
        return acumulador + _KmRecorridos;
    }, 0);


    if(suma_kms < 100000) {
        return res.json({msg: 'Se deben usar más los coches motor'});
    }

    res.json({suma_kms});
}

const clafificacionMotor = async( req = Request , res = Response, next)  => {

    const {categoria} = req.params;
    let clasificacion = {
        Normal: [],
        Fuerte: [],
        Poderosa: [],
        Debil: [],
    }
    const query = {
        equipo: {_Categoria: categoria, estado: true}
    }

    let [, equipos] = await Promise.all([ 
        Equipo.countDocuments(query.equipo),
        Equipo.find(query.equipo)
    ]);

    equipos.forEach( e => {
        const {_PotenciaMotor}  = e;
        if(_PotenciaMotor >= 2000 && _PotenciaMotor <= 4000) clasificacion.Normal.push(e);
        if(_PotenciaMotor >= 4001 && _PotenciaMotor <= 8000) clasificacion.Fuerte.push(e);
        if(_PotenciaMotor >8000) clasificacion.Poderosa.push(e);
        if( _PotenciaMotor > 0 && _PotenciaMotor<=1999) clasificacion.Debil.push(e);
    })

    res.json({clasificacion})
}

const crearEquipo = async(req = Request, res = Response, next) => {

    const _PotenciaMotor = req.body._PotenciaMotor;
    const _KmRecorridos = req.body._KmRecorridos;
    const _Categoria = req.body._Categoria;
    const _Marca = req.body._Marca;
    const _Climatizado = req.body._Climatizado;

    // //Preparamos la data
    const data = {
        _PotenciaMotor,
        _KmRecorridos,
        _Categoria
    }
    if(_Categoria === 'LOCOMOTORAS'){

        if(!_Marca || _Marca === '' || !isNaN(_Marca)){
            return res.status(400).json({
                errors: [{msg: 'La _Marca es Obligatoria / no debe ser un numero', param: '_Marca'}]
            });
        }
        data._Marca = _Marca;

    };
    if(_Categoria === 'COCHE-MOTOR'){
        data._Climatizado = (!_Climatizado) ? false : true;
    }

    //Creamos el objeto con el equipo
    const equipo = new Equipo(data);

    //Guardamos el equipo
    equipo.save();

    //Exito
    res.status(201).json({equipo});
}

const actualizarEquipo = (req = Request, res = Response) => {
    res.json({
        msg: 'Actualizar Equipo'
    });
}

module.exports = {
    obtenerEquipos,
    comprobarUsoCoches,
    clafificacionMotor,
    crearEquipo,
    actualizarEquipo,
    contarEquipos
}