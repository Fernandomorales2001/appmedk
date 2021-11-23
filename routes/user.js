//Variable para inicializar express
var express = require('express');

//Variable para requerir el controlador user
var userController = require('../controllers/user');

//Vamos a crear esta variable e igualarla a express y usaremos el enrutado de express
var api = express.Router();

api.post('/registrar',userController.registrar);
api.post('/login',userController.login);
api.get('/usuarios',userController.listar);
api.put('/user/editar/:id',userController.editar)
api.get('/user/:id',userController.get_user)

module.exports = api;