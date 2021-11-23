//Variable para inicializar express
var express = require('express');

//Variable para requerir el controlador user
var citaController = require('../controllers/cita');

//Vamos a crear esta variable e igualarla a express y usaremos el enrutado de express
var api = express.Router();

api.post('/cita/registrar',citaController.registrar);
api.get('/citas/:observacion?',citaController.listar);
api.get('/cita/:id',citaController.obtener_cita);
api.put('/cita/editar/:id',citaController.editar);
api.delete('/cita/eliminar/:id',citaController.eliminar);

module.exports = api;