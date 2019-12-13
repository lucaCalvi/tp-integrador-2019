const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';
AuthController = {};

AuthController.loginUser = (req, res) => {
    const userData = {
        nombreUsuario: req.body.nombreUsuario,
        contraseña: req.body.contraseña
    };

    Usuario.findOne({nombreUsuario: userData.nombreUsuario}, (err, user) => {
        if(err) {
            return res.status(500).json({error: 'Error en el servidor'});
        }
        if(!user) {
            //usuario no existe
            res.status(400).json({error: 'Datos incorrectos'});
        }
        else {
            const contraseña = bcrypt.compareSync(userData.contraseña, user.contraseña);
            if(contraseña) {
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: user.nombreUsuario}, SECRET_KEY, {expiresIn: expiresIn});
                const userData = {
                    nombreUsuario: req.body.nombreUsuario,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                };
                res.status(200).json({userData});
            }
            else {
                //contraseña incorrecta
                res.status(400).json({error: 'Datos incorrectos'});
            }
        }
    })
}

module.exports = AuthController;