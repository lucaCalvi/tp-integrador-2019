const Usuario = require('../models/usuario');
const Tarea = require('../models/tarea');
const Asignacion = require('../models/asignacion');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';
const fs = require('fs');
UsuarioController = {};

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
        contraseña: bcrypt.hashSync(req.body.contrasenia),
        informacion: req.body.informacion,
        contactos: [],
        foto: null
    });

    if(req.body.foto != null) {
        var foto = req.body.foto;
        var nombreFoto = Math.round(Math.random() * 1000000000000000).toString() + ".jpg";  
        fs.writeFile('upload/' + nombreFoto, foto, 'base64', (err) => {
            if(err) {
                status = 400;
                throw new Error("Error al guardar imagen de usuario");
            }
        });
        usuario.foto = 'upload/' + nombreFoto;
    }
    else {
        usuario.foto = null;
    }
    
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
        contraseña: req.body.contrasenia,
        informacion: req.body.informacion,
        foto: req.body.foto
    };

    if(req.body.foto != null && !req.body.foto.includes('upload')) {
        var foto = req.body.foto;
        var nombreFoto = Math.round(Math.random() * 1000000000000000).toString() + ".jpg";  
        fs.writeFile('upload/' + nombreFoto, foto, 'base64', (err) => {
            if(err) {
                status = 400;
                throw new Error("Error al guardar imagen de usuario");
            }
        });
        usuario.foto = 'upload/' + nombreFoto;
    }
    else if(req.body.foto != null && req.body.foto.includes('upload')){
        usuario.foto = req.body.foto;
    }
    else {
        usuario.foto = null;
    }

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
        .then(() => Usuario.findOne({nombreUsuario: nombreUsuario})
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
                return Promise.resolve();
            });
        })
        .then(() => {
            Asignacion.updateMany({id_asignado: nombreUsuario}, {$set: {id_asignado: usuario.nombreUsuario}}, () => {
                return Promise.resolve();
            });
        })
        .then(() => {
            Tarea.updateMany({id_asignador: nombreUsuario}, {$set: {id_asignador: usuario.nombreUsuario}}, () => {
                return Promise.resolve();
            });
        })
        .then(() => {
            Usuario.updateMany({contactos: nombreUsuario}, {$set: {"contactos.$": usuario.nombreUsuario}}, () => {
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
    let tareas = null;

    Usuario.findOne({nombreUsuario: nombreUsuario})
        .then(user => {
            if(bcrypt.compareSync(contraseña, user.contraseña)){
                return Promise.resolve();
            }
            else {
                status = 400;
                throw new Error("Contraseña incorrecta");
            }
        })
        .then(() => { Usuario.findOneAndRemove({nombreUsuario: nombreUsuario})
            .then((user) => {
                Tarea.find({id_asignador: nombreUsuario}, (err, res) => {
                    tareas = res;
                    tareas.forEach(tarea => {
                        let id = tarea._id.toString();
                        Asignacion.deleteMany({id_tarea: id}, () => {
                            return Promise.resolve();
                        });
                    });
                    if(user.foto){
                        fs.unlink(user.foto.toString(), (err) => {
                            if(err) {
                                status = 400;
                                throw new Error("Error al eliminar imagen de usuario");
                            }
                        });
                    }
                    return Promise.resolve();
                });
            })
            .then(() => {
                Asignacion.deleteMany({id_asignado: nombreUsuario}, () => {
                    return Promise.resolve();
                });
            })
            .then(() => {
                Tarea.deleteMany({id_asignador: nombreUsuario}, () => {
                    return Promise.resolve();
                });
            })
            .then(() => {
                Usuario.updateMany({}, {$pull: {contactos: nombreUsuario}}, () => {
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

UsuarioController.agregarContacto = (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    const contacto = req.body.contacto;
    Usuario.findOne({nombreUsuario: nombreUsuario})
      .then(usuario => {
          usuario.contactos.push(contacto);
          Usuario.findOneAndUpdate({nombreUsuario: nombreUsuario}, {$set: usuario}, () => {
              res.status(200).json({id: nombreUsuario});
          });
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      })
}

UsuarioController.eliminarContacto = (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    const contacto = req.body.contacto;
    Usuario.findOne({nombreUsuario: nombreUsuario})
      .then(usuario => {
          let index = usuario.contactos.indexOf(contacto);
          usuario.contactos.splice(index, 1);
          Usuario.findOneAndUpdate({nombreUsuario: nombreUsuario}, {$set: usuario}, () => {
              res.status(200).json({id: nombreUsuario});
          });
      })
      .catch(err => {
          res.status(500).json({error: err.message});
      })
}

module.exports = UsuarioController;