const Usuario = require('../models/usuario');
const Tarea = require('../models/tarea');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';
UsuarioController = {};

//NO USAR ID MONGO, usar nombre de usuario para las usaurio y un id generado para tareas
//Verificar consistencia de cambio en usuario, tarea queda con ID mongo

UsuarioController.getUsuarios = (req, res) => {
    Usuario.find()
      .then(usuarios => {
          res.status(200).json(usuarios);
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

UsuarioController.getUsuario = (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    Usuario.findOne({nombreUsuario: nombreUsuario})
      .then(usuario => {
          res.status(200).json(usuario);
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

UsuarioController.insertUsuario = (req, res) => {
    let status = null;
    const usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        nombreUsuario: req.body.nombreUsuario,
        contraseña: bcrypt.hashSync(req.body.contraseña),
        etiqueta: req.body.etiqueta,
        informacion: req.body.informacion,
        contactos: req.body.contactos
    });
    
    Usuario.find({$or: [{email: usuario.email}, {nombreUsuario: usuario.nombreUsuario}]})
        .then(usuarios => {
            if(usuarios.length > 0){
                let validarEmail = usuarios.find((user) => {
                    return user.email == usuario.email
                });
                if(validarEmail != null){
                    status = 400;
                    throw new Error("El email ingresado ya está registrado");
                }
                else{
                    status = 400;
                    throw new Error("El nombre de usuario ingresado ya existe");
                }
            }
            return Promise.resolve();
        })
        .then(() => {
            usuario.save(() => {
                res.status(200).json({id: req.body.nombreUsuario});
            });
        })
        .catch(err => {
            res.status(status || 500).json({error: err.message});
        });
}

UsuarioController.updateUsuario = (req, res) => {
    let status = null;
    const nombreUsuario = req.params.nombreUsuario;
    const usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        nombreUsuario: req.body.nombreUsuario,
        contraseña: req.body.contraseña,
        etiqueta: req.body.etiqueta,
        informacion: req.body.informacion,
        contactos: req.body.contactos
    };

    Usuario.find({$or: [{email: usuario.email}, {nombreUsuario: usuario.nombreUsuario}], nombreUsuario: {$ne: nombreUsuario}})
        .then(usuarios => {
            if(usuarios.length > 0){
                let validarEmail = usuarios.find((user) => {
                    return (user.email == usuario.email)
                });
                if(validarEmail != null){
                    status = 400;
                    throw new Error("El email ingresado ya está registrado");
                }
                else{
                    status = 400;
                    throw new Error("El nombre de usuario ingresado ya existe");
                }
            }
            return Promise.resolve();
        })
        .then(() => Usuario.findOne({nombreUsuario: usuario.nombreUsuario})
          .then(user => {
            if(bcrypt.compareSync(usuario.contraseña, user.contraseña)){
                usuario.contraseña = user.contraseña;
                return Promise.resolve();
            }
            else {
                status = 400;
                throw new Error("Contraseña incorrecta");
            }
          })
        )
        .then(() => {
            Usuario.findOneAndUpdate({nombreUsuario: nombreUsuario}, {$set: usuario}, () => {
                res.status(200).json({id: nombreUsuario});
            });
        })
        .catch(err => {
            res.status(status || 500).json({error: err.message});
        });
}

UsuarioController.deleteUsuario = (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    const contraseña = req.body.contraseña;
    Usuario.findOne({nombreUsuario: nombreUsuario})
        .then(user => {
            if(bcrypt.compareSync(contraseña, user.contraseña)){
                console.log(contraseña);
                return Promise.resolve();
            }
            else {
                status = 400;
                throw new Error("Contraseña incorrecta");
            }
        })
        .then(() => { Usuario.findOneAndRemove({nombreUsuario: nombreUsuario})
            .then(() => {
                Tarea.deleteMany({id_asignador: nombreUsuario}, () => {
                    return Promise.resolve();
                });
            })
            .then(() => {
                Tarea.update({}, {$pull: {id_asignado: nombreUsuario}}, { multi: true }, () => {
                    return Promise.resolve();
                });
            })
        })
        .then(() => {
            res.status(200).json({id: nombreUsuario});
        })
        .catch(err => {
            res.status(status || 500).json({error: err.message});
        });
}

UsuarioController.searchUsuario = (req, res) => {
    const usuario = req.params.nombreUsuario;
    Usuario.find({nombreUsuario: {$regex : usuario}})
      .then(usuarios => {
          res.status(200).json(usuarios);
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      });
}

module.exports = UsuarioController;