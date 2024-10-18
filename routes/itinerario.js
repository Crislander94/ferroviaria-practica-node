const {Router} = require('express');
const router = Router();
const { body, check } = require('express-validator');
const {
    obtenerItinerario,
    crearItinerario,
    actualizarItinerario,
    eliminarItinerario} = require('../controller');

const { validarCampos } = require('../middlewares');

router.get('/', obtenerItinerario);

router.post('/' ,
body('_Kms', 'el kilometraje es obligatorio').not().isEmpty(),
body('_Kms', 'el kilometraje debe ser numérico').isNumeric(),
body('_Vagones', 'La cantidad de vagones es obligatoria').not().isEmpty(),
body('_Vagones', 'La cantidad de vagones debe ser numerica').isNumeric(),
body('_Origen', 'El origen es obligatorio').not().isEmpty(),
body('_Destino', 'El destino  es obligatorio').not().isEmpty(),
validarCampos
,crearItinerario);

router.put('/:id', actualizarItinerario);

router.delete('/:id', eliminarItinerario);

module.exports = router;