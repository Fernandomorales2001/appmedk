const { response, request } =  require('express');
const nodeMailer = require('nodemailer');

const envioCorreo = (req = request, res = response)=>{
    let body = req.body;

    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post: 587,
        auth:{
            user: 'fmsepeda2001@gmail.com',
            pass: 'Software2021'
        }
    });

    const opciones = {
        from: 'Fernando Morales',
        subject: body.asunto,
        to: body.email,
        text: body.mensaje
    };

    config.sendMail(opciones,function(error,result) {

        if (error) return res.json({ok:false,msg:error});

        return resp.json({
            ok:true,
            msg:result
        })
    })
}

module.exports = {
    envioCorreo
}
