var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Crear un modelo para el esquema 
//Atributos de la tabla
var CitaSchema = Schema({
    observacion: String,
    fechaCita: {type: Date, default: Date.now},
    email: String,
    idUser: {type: Schema.ObjectId, ref: 'login'}    
});

//Exportacion de modulos
module.exports = mongoose.model('Cita',CitaSchema);