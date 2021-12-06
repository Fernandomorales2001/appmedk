//Vamos a inicializar los modulos instalados en el package.json
var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var cors = require("cors");

//Creacion de variable para el puerto para la conexion del servidor
var port = process.env.PORT || 3000;

//Vamos a inicializar express

//Vamos a registrar nuestras rutas
//RUTAS
var user_routes = require("./routes/user");
var cita_routes = require("./routes/citas");
var consultorio_routes = require("./routes/consultorio");
var centro_routes = require("./routes/centro-salud");

var app = express();

mongoose.connect(
  "mongodb+srv://Jackseni_D:1010Pretty@appomedk.oil1r.mongodb.net/AppoMedk?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Corriendo servidor");
      app.listen(port, function () {
        console.log("Servidor conectado en " + port);
      });
    }
  }
);

//Vamos a configurar el app
app.use(bodyparser.urlencoded({ extended: true }));
//El urlencoden es analizar el texto como datos codificados en la url
app.use(bodyparser.json());
//Analiza el texto como json y expone el objeto resultante en el req.body
app.use(logger("dev"));
//middleware de peticiones para desarrollo
app.use(cors());

app.use("/api", user_routes);
app.use("/api", cita_routes);
app.use("/api", consultorio_routes);
app.use("/api", centro_routes);
//Exportar el modulo
module.exports = app;
