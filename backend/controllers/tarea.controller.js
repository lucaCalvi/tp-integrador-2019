const Tarea = require('../models/tarea');
const Asignacion = require('../models/asignacion');
TareaController = {};

TareaController.getTarea = (req, res) => {
    const idTarea = req.params.idTarea;
    Tarea.findById(idTarea)
      .then(tarea => {
          res.status(200).json(tarea);
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

TareaController.insertTarea = (req, res) => {
    const tarea = new Tarea({
        descripcion: req.body.descripcion,
        fechaInicio: req.body.fechaInicio,
        fechaLimite: req.body.fechaLimite,
        lugar: req.body.lugar,
        id_asignador: req.body.id_asignador 
    });

    tarea.save()
      .then(() => {
          res.status(200).json({id: tarea._id});
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

TareaController.updateTarea = (req, res) => {
    const id = req.params.idTarea;
    const tarea = {
        descripcion: req.body.descripcion,
        fechaInicio: req.body.fechaInicio,
        fechaLimite: req.body.fechaLimite,
        lugar: req.body.lugar,
        id_asignador: req.body.id_asignador
    };

    Tarea.findByIdAndUpdate(id, {$set: tarea})
      .then(() => {
          res.status(200).json({id: id});
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

TareaController.deleteTarea = (req, res) => {
    const id = req.params.idTarea;
    Tarea.findByIdAndRemove(id)
      .then(() => {
          Asignacion.deleteMany({id_tarea: id})
            .then(() => {
                res.status(200).json({id: id});
            })
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

TareaController.getMisTareas = (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    Tarea.find({id_asignador: nombreUsuario})
      .then(tareas => {
          res.status(200).json(tareas);
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });   
}

module.exports = TareaController;