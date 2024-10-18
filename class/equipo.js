class Equipo{
    _PotenciaMotor = 0;
    _KmRecorridos = 0;
    _Categoria = '';

    constructor(_PotenciaMotor,_KmRecorridos,_Categoria){
        this._PotenciaMotor = _PotenciaMotor;
        this._KmRecorridos = _KmRecorridos;
        this._Categoria = _Categoria;
    }
    //_Climatizado = '';
    //_Marca
}
class Locomotora extends Equipo {
    constructor(_PotenciaMotor,_KmRecorridos,_Categoria, _Marca) {
      super(_PotenciaMotor,_KmRecorridos,_Categoria);
      this._Marca = _Marca;
    }
}

class CocheMotor extends Equipo{
    constructor(_PotenciaMotor,_KmRecorridos,_Categoria, _Climatizado) {
        super(_PotenciaMotor,_KmRecorridos,_Categoria);
        this._Marca = _Climatizado;
    }
}

module.exports = {
    Locomotora,
    CocheMotor
}