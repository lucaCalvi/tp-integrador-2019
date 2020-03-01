const Asignacion = require('../models/asignacion');
const Tarea = require('../models/tarea');
AsignacionController = {};

AsignacionController.asignarTarea = (req, res) => {
    const asignacion = new Asignacion({
        id_tarea: req.body.id_tarea,
        id_asignado: req.body.id_asignado,
        fechaFin: null,
        estado: 'Pendiente',
        archivo: null
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
    const id_asignado = req.body.nombreUsuario;
    Asignacion.findOneAndDelete({id_tarea: id_tarea, id_asignado: id_asignado})
      .then(() => {
          res.status(200).json({id: id_tarea});
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

AsignacionController.getAsignaciones = (req, res) => {
    let tareas = [];
    const nombreUsuario = req.params.nombreUsuario;
    Asignacion.find({id_asignado: nombreUsuario})
      .then(asignaciones => {
        if(asignaciones.length > 0) {
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
        }
        else {
            res.status(200).json(null);
        }
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

AsignacionController.getAsignacion = (req, res) => {
    const id_tarea = req.params.idTarea;
    const nombreUsuario = req.params.nombreUsuario;
    Asignacion.findOne({id_tarea: id_tarea, id_asignado: nombreUsuario})
      .then(asignacion => {
          Tarea.findOne({_id: asignacion.id_tarea})
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
                    estado: asignacion.estado,
                    archivo: asignacion.archivo
                });
            })
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

AsignacionController.getAsignacionesTarea = (req, res) => {
    const id_tarea = req.params.idTarea;
    Asignacion.find({id_tarea: id_tarea})
      .then(asignaciones => {
          res.status(200).json(asignaciones);
      })
      .catch(err => {
          res.status(500).json({error: err.message});
    });
}

AsignacionController.cambiarEstado = (req, res) => {
    const idTarea = req.params.idTarea;
    const nombreUsuario = req.body.id_asignado;
    const asignacion = {
        estado: req.body.estado,
        fechaFin: req.body.fechaFin,
        id_tarea: req.body.id_tarea,
        id_asignado: req.body.id_asignado,
        archivo: req.body.archivo
    };

    Asignacion.findOneAndUpdate({id_tarea: idTarea, id_asignado: nombreUsuario}, {$set: asignacion})
      .then(asignacion => {
          res.status(200).json({id: asignacion._id});
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

AsignacionController.uploadFile = (req, res) => {
    res.json(req.files.files.path);
}

module.exports = AsignacionController;