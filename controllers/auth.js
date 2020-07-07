const jwt = require('../services/jwt');
const moment=require('moment');
const User = require('../models/user');

function willExpireToken(token){
    const {exp}=jwt.decodedToken(token);
    const currentDate=moment().unix();
    if(currentDate>exp){
        return true;
    }
    return false;
}
function refreshAccessToken(req,res){
    const {refreshToken}=req.body;
    const isTokenExpired=willExpireToken(refreshToken);
    if(isTokenExpired){
        res.status(404).send({message:'RefreshToken expirado'})
    }else{
        const {id}=jwt.decodedToken(refreshToken);

        User.findOne({_id:id},(err,userStorage)=>{
            if(err){
                res.status(500).send({message:'Error del servidor'})
            }else{
                if(!userStorage){
                    res.status(404).send({message:'usuario no encontrado'})
                }else{
                    res.status(200).send({
                        accessToken:jwt.createAccessToken(userStorage),
                        refreshToken:refreshToken
                    });
                }
            }
        })
    }
}
module.exports={
    refreshAccessToken
};