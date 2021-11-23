var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'heidyjackseni';

//Esta funcion me mandara por parametro lo siguiente
//Pasamos el usuario que hemos logeado
exports.createToken = function(user) {
//Dentro de la variable payload vamos a mandar todos los datos del usuario    
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix(),
    }

    //Vamos a codificar todos estos datos y obtendremos un token
    return jwt.encode(payload,secret);
}

//El unix es para obtener la fecha en tipo timestamp
