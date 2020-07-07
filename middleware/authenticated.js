const jwt =require('jwt-simple');
const moment=require('moment');

const SECRET_KEY='5jZb75M8YujNDOU4Fqdx0SySpQDUyNG7';

exports.ensureAuth = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message:'La petición no tiene autenticación'})
    }
    const token=req.headers.authorization.replace(/['"]+/g,"");

    try{
        var payload=jwt.decode(token,SECRET_KEY);

        if(payload.exp<=moment.unix()){
            return res.status(404).send({message:'el token ha expirado'})
        }else{

        }
    }catch(err){
        console.log(err);
        return res.status(404).send({message:'token invalido'})
    }
    req.user=payload;
    next();
};