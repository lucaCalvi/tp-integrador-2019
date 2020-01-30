const express = require('express');
const router = express.Router();
const TareaController = require('../controllers/tarea.controller');

router.post('/', TareaController.insertTarea);
router.put('/:idTarea', TareaController.updateTarea);
router.delete('/:idTarea', TareaController.deleteTarea);
router.get('/:idTarea', TareaController.getTarea);

module.exports = router;