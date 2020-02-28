const express = require('express');
const router = express.Router();
const AsignacionController = require('../controllers/asignacion.controller');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './files' });

router.post('/', AsignacionController.asignarTarea);
router.delete('/:idTarea', AsignacionController.eliminarAsignacionTarea);
router.get('/:idTarea', AsignacionController.getAsignacionesTarea);
router.put('/:idTarea', AsignacionController.cambiarEstado);
router.post('/uploadFile', multipartMiddleware, AsignacionController.uploadFile);

module.exports = router;