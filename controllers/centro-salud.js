const CentroSalud = require('../models/centro-salud');
const User = require('../models/Usuario');

function registrar(req,res) {
    var params = req.body;
    const centroSalud = new CentroSalud(params);

    centroSalud.save((err, centro_save)=>{
        if (err) {
            res.status(500).send({error: 'No se ingreso el usuario'});
        } else {
            res.status(200).send({data: centro_save});
        }
    });
}
function listar(req,res) {
    CentroSalud.find({},(err, centros_listado) => {
        if (err) throw err;
        res.status(200).send(centros_listado);
    });
}

async function listarCentrosYDoctores(req, res) {
    const centros = await CentroSalud.find({}).select({ _id: 1, nombre: 1  });
    const doctores = await User.find({rol: "DOCTOR"}).select({ _id: 1, name: 1 });
    const data = {
        centros,
        doctores
    }
    res.status(200).send(data);
}

module.exports = {
    registrar,
    listar,
    listarCentrosYDoctores
}