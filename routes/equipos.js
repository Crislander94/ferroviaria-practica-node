const {Router} = require('express');
const { body, check } = require('express-validator');
const { 
    obtenerEquipos,
    comprobarUsoCoches,
    clafificacionMotor,
    crearEquipo,
    actualizarEquipo,
    contarEquipos} = require('../controller');

const { validarCampos } = require('../middlewares');
const { categoriasPermitidas } = require('../helpers/validar-db');
const router = Router();

router.get('/',obtenerEquipos);

router.get('/contar', contarEquipos);

router.get('/comprobarUsoCoches', comprobarUsoCoches );

router.get('/clafificacionMotor/:categoria',
check('categoria').custom( c => categoriasPermitidas(c, ['LOCOMOTORAS', 'COCHE-MOTOR'])),
validarCampos
,clafificacionMotor );

router.post('/',
body('_PotenciaMotor', 'La Potencia es obligatoria').not().isEmpty(),
body('_PotenciaMotor', 'La Potencia debe ser numerica').isNumeric(),
body('_KmRecorridos', 'Kilometraje debe ser numerica').isNumeric(),
body('_Categoria', 'La Categoria es obligatorio').not().isEmpty(),
body('_Categoria').custom( c => categoriasPermitidas(c, ['LOCOMOTORAS', 'COCHE-MOTOR'])),
validarCampos
, crearEquipo);

router.put('/:id', actualizarEquipo);

module.exports = router;