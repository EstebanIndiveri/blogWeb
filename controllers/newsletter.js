const Newsletter=require('../models/newsletter');

function suscribeEmail(req,res){
    const email=req.params.email;
    const newsletter=new Newsletter();

    if(!email){
        res.status(404).send({code:404,message:'el email es obligatorio'});
    }else{
        newsletter.email=email.toLowerCase();
        newsletter.save((err,newsletterStore)=>{
            if(err){
                res.status(500).send({
                    code:500,message:'El email ya esta suscripto'
                })
            }else{
                if(!newsletter){
                    res.status(404).send({
                        code:404,message:'No se pudo registrar'
                    })
                }else{
                    res.status(200).send({
                        code:200,message:'Email registrado correctamente'
                    })
                }
            }
        })
    }
    
}
module.exports={
    suscribeEmail
}