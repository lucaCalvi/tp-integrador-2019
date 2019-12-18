const express = require('express');
const router = express.Router();
const TareaController = require('../controllers/tarea.controller');

router.post('/', TareaController.insertTarea);
router.put('/:id', TareaController.updateTarea);
router.delete('/:id', TareaController.deleteTarea);
router.get('/:nombreUsuario', TareaController.getMisTareas);

module.exports = router;