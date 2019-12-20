const Asignacion = require('../models/asignacion');
AsignacionController = {};

AsignacionController.asignarTarea = (req, res) => {
    const asignacion = new Asignacion({
        id_tarea: req.body.id_tarea,
        id_asignado: req.body.id_asignado,
        fechaFin: null,
        estado: 'Pendiente'
    });

    asignacion.save()
      .then(() => {
          res.status(200).json({id: asignacion._id});
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

AsignacionController.eliminarAsignacionTarea = (req, res) => {
    const id_tarea = req.params.idTarea;
    const id_asignado = req.body.nombreUsuario
    Asignacion.findOneAndDelete({id_tarea: id_tarea, id_asignado: id_asignado})
      .then(() => {
          res.status(200).json({id: id_tarea});
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

/*AsignacionController.cambiarEstado = (req, res) => {
    const idTarea = req.params.idTarea;
    const asignacion = {
        fechaFin: null,
        estado: req.body.estado
    };

    Asignacion.findByIdAndUpdate(id, {$set: tarea})
      .then(() => {
          res.status(200).json({id: id});
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}*/

TareaController.getTareas = (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    Tarea.find({id_asignado: nombreUsuario})
      .then(tareas => {
          res.status(200).json(tareas);
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

module.exports = AsignacionController;