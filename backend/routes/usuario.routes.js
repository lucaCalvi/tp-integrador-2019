const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');
const AsignacionController = require('../controllers/asignacion.controller');
const TareaController = require('../controllers/tarea.controller');

router.get('/', UsuarioController.getUsuarios);
router.get('/:nombreUsuario', UsuarioController.getUsuario);
router.post('/', UsuarioController.insertUsuario);
router.put('/:nombreUsuario', UsuarioController.updateUsuario);
router.delete('/:nombreUsuario', UsuarioController.deleteUsuario);
router.get('/:nombreUsuario/asignaciones', AsignacionController.getAsignaciones);
router.get('/:nombreUsuario/asignaciones/:idTarea', AsignacionController.getAsignacion);
router.get('/search/:nombreUsuario', UsuarioController.searchUsuario);
router.put('/:nombreUsuario/agregar-contacto', UsuarioController.agregarContacto);
router.put('/:nombreUsuario/eliminar-contacto', UsuarioController.eliminarContacto);
router.get('/:nombreUsuario/tareas', TareaController.getMisTareas);

module.exports = router;