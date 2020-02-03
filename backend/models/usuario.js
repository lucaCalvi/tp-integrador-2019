const mongoose = require('mongoose');

const Usuario = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true},
    nombreUsuario: {type: String, required: true},
    contraseña: {type: String, required: true},
    informacion: {type: String, required: true},
    contactos: {type: Array, required: false},
    foto: {type: String, required: false}
});

module.exports = mongoose.model('Usuario', Usuario);