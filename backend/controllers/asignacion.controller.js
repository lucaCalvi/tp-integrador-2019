const Asignacion = require('../models/asignacion');
const Tarea = require('../models/tarea');
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

AsignacionController.getAsignaciones = async (req, res) => {
    let tareas = [];
    const nombreUsuario = req.params.nombreUsuario;
    Asignacion.find({id_asignado: nombreUsuario})
      .then(asignaciones => {
        asignaciones.forEach(asignacion => {
            Tarea.findOne({_id: asignacion.id_tarea})
              .then(tarea => {
                tareas.push({
                    _id: asignacion.id_tarea,
                    descripcion: tarea.descripcion,
                    fechaInicio: tarea.fechaInicio,
                    fechaLimite: tarea.fechaLimite,
                    lugar: tarea.lugar,
                    id_asignador: tarea.id_asignador,
                    id_asignado: asignacion.id_asignado,
                    fechaFin: asignacion.fechaFin,
                    estado: asignacion.estado
                });
                asignaciones.splice(0, 1);
                if(asignaciones.length == 0){
                    res.status(200).json(tareas);
                }
            });
        });
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

AsignacionController.getAsignacion = (req, res) => {
    const id_tarea = req.params.idTarea;
    const nombreUsuario = req.params.nombreUsuario;
    Asignacion.find({id_tarea: id_tarea, id_asignado: nombreUsuario})
      .then(asignacion => {
          Tarea.findOne({id_tarea: asignacion.id_tarea})
            .then(tarea => {
                res.status(200).json({
                    _id: asignacion.id_tarea,
                    descripcion: tarea.descripcion,
                    fechaInicio: tarea.fechaInicio,
                    fechaLimite: tarea.fechaLimite,
                    lugar: tarea.lugar,
                    id_asignador: tarea.id_asignador,
                    id_asignado: asignacion.id_asignado,
                    fechaFin: asignacion.fechaFin,
                    estado: asignacion.estado
                });
            })
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

module.exports = AsignacionController;