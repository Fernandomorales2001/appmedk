//Creacion de variable para el modelo de usuario y bcrypt node.js
var User = require('../models/login');
var Bcrypt = require('bcrypt-nodejs');

//Importamos el jwt de los helpers
var jwt = require('../helpers/jwt');


//Creacion de funcion para registrar
function registrar(req,res) {
    //req.body solo me devuelve el body del request
    var params = req.body;
    //Vamos a inicializar e instanciar nuestro modelo que hemos creado
    var user = new User();

    if (params.password) {
        Bcrypt.hash(params.password,null,null,function(err,hash) {
            if (hash) {
                user.password = hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.email = params.email;
                user.role = params.role;

                user.save((err,user_save)=>{
                    if (err) {
                        res.status(500).send({error: 'No se ingreso el usuario'});
                    } else {
                        res.status(200).send({user: user_save});
                    }
                });
            }
        });
    } else {
        res.status(403).send({error: 'No ingreso la contraseña'});
    }
}

//Creamos un nuevo metodo para login
function login(req,res) {
    var data = req.body;

    //Haremos una consulta a mi user, obtenemos simplemente una consulta
    User.findOne({email: data.email},(err,user_data)=>{
        if (err) {
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if (user_data) {
                //Comparacion entre contraseñas 
                Bcrypt.compare(data.password,user_data.password,function(err,check) {
                    if (check) {
                        if (data.gettoken) {
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data
                            });
                        } else {
                            res.status(200).send({
                                user: user_data,                                
                                jwt: jwt.createToken(user_data)
                            });
                        }     
                    }else{
                        res.status(403).send({message: 'El correo o contraseña no coinciden'});
                    }
                });
            }else{
                res.status(403).send({message: 'El correo no existe'});
            }
        }
    });
}

function editar(req,res){
    var id = req.params['id'];
    var data = req.body;

    if(data.password){
        bcrypt.hash(data.password,null,null,function(err,hash){
            if(hash){
                User.findByIdAndUpdate(id,{nombres: data.nombres, apellidos: data.apellidos, password: hash, email: data.email, role: data.role},(err,user_edit)=>{
                    if(user_edit){
                        res.status(200).send({user:user_edit});
                    }else{
                        res.status(500).send({message: 'El usuario no se pudo editar'});
                    }
                })
            }
        });
    }else{
        User.findByIdAndUpdate(id,{nombres: data.nombres, apellidos: data.apellidos, email: data.email, role: data.role},(err,user_edit)=>{
            if(user_edit){
                res.status(200).send({user:user_edit});
            }else{
                res.status(500).send({message: 'El usuario no se pudo editar'});
            }
        })
    }
}

function get_user(req,res) {  
    var id = req.params['id'];

    User.findById(id,(err,user_data)=>{
        if(user_data){
            res.status(200).send({user: user_data});
        }else{
            res.status(403).send({message: 'No se encontro ningun registro'});
        }
    })
}

function listar(req,res){
    User.find((err,users_data)=>{
        if(users_data){
            res.status(200).send({usuarios: users_data});
        }
    })
}

//Exportaremos todas las rutas que se creen en esre controlador
module.exports = {
    registrar,
    login,
    editar,
    get_user,
    listar
}