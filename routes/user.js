//Variable para inicializar express
var express = require('express');

//Variable para requerir el controlador user
var userController = require('../controllers/user');

//Vamos a crear esta variable e igualarla a express y usaremos el enrutado de express
var api = express.Router();

api.post('/user/registrar',userController.registrar);
api.post('/user/login',userController.login);
api.get('/user',userController.listar);
api.put('/user/:id',userController.editar)
api.get('/user/:id',userController.get_user)

module.exports = api;