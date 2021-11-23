//Vamos a inicializar los modulos instalados en el package.json
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

//Creacion de variable para el puerto para la conexion del servidor 
var port = process.env.PORT ||  4201;

//Vamos a inicializar express

//Vamos a registrar nuestras rutas
//RUTAS
var user_routes = require('./routes/user');
var cita_routes = require('./routes/citas');

var app = express();

//Configuracion y conexion a la base de datos con nuestra app
mongoose.connect('mongodb://localhost:27017/APPMEDK',{useUnifiedTopology: true, useNewUrlParser: true},(err,res)=>{
    if(err){
        throw err;
    }
    else{
        console.log("Corriendo servidor");
        app.listen(port, function(){
            console.log("Servidor conectado en " + port);
            
        });
        
    }
});

//Vamos a configurar el app
app.use(bodyparser.urlencoded({extended: true}));
//El urlencoden es analizar el texto como datos codificados en la url
app.use(bodyparser.json());
//Analiza el texto copmo json y expone el objeto resultante en el req.body

app.use('/api',user_routes);
app.use('/api',cita_routes);
//Exportar el modulo 
module.exports = app;