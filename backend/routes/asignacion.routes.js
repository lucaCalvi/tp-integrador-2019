const express = require('express');
const router = express.Router();
const AsignacionController = require('../controllers/asignacion.controller');

router.post('/', AsignacionController.asignarTarea);
router.delete('/:idTarea', AsignacionController.eliminarAsignacionTarea);
router.get('/:idTarea', AsignacionController.getAsignacionesTarea);
router.put('/:idTarea', AsignacionController.cambiarEstado);

module.exports = router;