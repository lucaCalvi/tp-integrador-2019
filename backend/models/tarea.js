const mongoose = require('mongoose');

const Tarea = new mongoose.Schema({
    descripcion: {type: String, required: true},
    fechaInicio: {type: Date, required: true},
    fechaLimite: {type: Date, required: true},
    lugar: {type: String, required: false},
    id_asignador: {type: String, required: true} 
});

module.exports = mongoose.model('Tarea', Tarea);