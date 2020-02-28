const mongoose = require('mongoose');

const Asignacion = new mongoose.Schema({
    id_tarea: {type: String, required: true},
    id_asignado: {type: String, required: true},
    fechaFin: {type: Date, required: false},
    estado: {type: String, required: true},
    archivo: {type: String, required: false}
});

module.exports = mongoose.model('Asignacion', Asignacion);