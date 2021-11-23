var Cita = require('../models/citas');

function registrar(req,res) {
    //Variable que verificara si se mandan los datos, por ejemplo: titulo, descripcion o datos de texto
    var data = req.body;
    var cita = new Cita();
    cita.observacion = data.observacion;
    cita.email = data.email;
    cita.idUser = data.idUser;

    //Vamos actualizarlo
    cita.save((err,cita_save)=>{
        if (err) {
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if (cita_save) {
                res.status(200).send({cita: cita_save});  
            }else{
                res.status(403).send({message: 'No se registro la cita'});
            }
        }
    });
}

function listar(req,res) {
    //Vamos a obtener la variable titulo creada en las rutas
    var observacion = req.params['observacion'];

    //Consulta para poder listar todos las observaciones por su titulo
    Cita.find({observacion: new RegExp(observacion,'i')},(err,cita_listado)=>{
        if (err) {
            res.status(500).send({message: 'Server Error'});
        } else {
            if (cita_listado) {
                res.status(200).send({observaciones: cita_listado});
            }
            else{
                res.status(403).send({message: 'No hay ningun registro con ese titulo'});
            }
        }
    });
}

function obtener_cita(req,res) {
    //Vamos a capturar que estamos pasando por la ruta
    var id = req.params['id'];
    
    //Hacemos una consulta
    Cita.findById({_id: id},(err,cita_data)=>{
        if (err) {
            res.status(500).send({message: 'Server Error'});
        } else {
            if (cita_data) {
                res.status(200).send({cita: cita_data});
            }
            else{
                res.status(403).send({message: 'El registro no existe'});
            }
        }
    });
}

function editar(req,res) {
    var id = req.params['id'];
    var data = req.body;
    //Hacer una consulta para actualizar
    Cita.findByIdAndUpdate({_id:id},{observacion: data.observacion, email: data.email ,idUser: data.idUser},(err,cita_edit)=>{
        if (err) {
            res.status(500).send({message: 'Server Error'});
        }  else {
            if (cita_edit) {
                res.status(200).send({actividad: cita_edit});
            }
            else{
                res.status(403).send({message: 'La cita no se pudo actualizar'});
            }
        }
    });
}

function eliminar(req,res) {
    var id = req.params['id'];

    //Hacemos una consulta para eliminar
    Cita.findByIdAndRemove({_id:id},(err,cita_delete)=>{
        if (err) {
            res.status(500).send({message: 'Server Error'});
        }else{
            if (cita_delete) {
                res.status(200).send({cita: cita_delete});
            }else{
                res.status(403).send({message: 'No se pudo eliminar el registro'});
            }
        }
    });
}

module.exports = {
    registrar,
    listar,
    editar,
    obtener_cita,
    eliminar
}