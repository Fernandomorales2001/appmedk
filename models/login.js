//Inicializacion de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Crear un modelo para el esquema 
//Atributos de la tabla
var UserSchema = Schema({
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    role: String,
    fechaCreacion: {type: Date, default: Date.now},
});

//Exportacion de modulos
module.exports = mongoose.model('user',UserSchema);