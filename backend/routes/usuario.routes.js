const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');
const TareaController = require('../controllers/tarea.controller');

router.get('/', UsuarioController.getUsuarios);
router.get('/:nombreUsuario', UsuarioController.getUsuario);
router.post('/', UsuarioController.insertUsuario);
router.put('/:nombreUsuario', UsuarioController.updateUsuario);
router.delete('/:nombreUsuario', UsuarioController.deleteUsuario);
//router.get('/:nombreUsuario/asignacion', TareaController.getTareas);
router.get('/:nombreUsuario/tareas/:idTarea', TareaController.getTarea);
router.get('/search/:nombreUsuario', UsuarioController.searchUsuario);
router.put('/:nombreUsuario/contactos/agregarContacto', UsuarioController.agregarContacto);
router.put('/:nombreUsuario/contactos/eliminarContacto', UsuarioController.eliminarContacto);

module.exports = router;