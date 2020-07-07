const Menu =require('../models/menu');

function addMenu(req,res){
    const {title,url,order,active}=req.body;
    const menu=new Menu();
    menu.title=title;
    menu.url=url;
    menu.order=order;
    menu.active=active;

    menu.save((err,createdMenu)=>{
        if(err){
            res.status(500).send({message:'Error del servidor'})
        }else{
            if(!createdMenu){
                res.status(404).send({message:'Error al crear el menu'})
            }else{
                res.status(200).send({message:'Menu creado correctamente'})
            }
        }
    })
    
}
function getMenu(req,res){
    Menu.find().sort({order:'asc'}).exec((err,menusStore)=>{
        if(err){
            res.status(500).send({message:'Error del servidor'})
        }else{
            if(!menusStore){
                res.status(404).send({message:'no se ha encontrado ningun elemento'})
            }else{
                res.status(200).send({menu:menusStore});
            }
        }
    })    
}
function updateMenu(req,res){
    let menuData=req.body;
    const params= req.params;

    Menu.findByIdAndUpdate(params.id,menuData,(err,menuUpdata)=>{
        if(err){
            res.status(500).send({message:'error del servido'})
        }else{
            if(!menuUpdata){
                res.status(404).send({message:'no se ha encontrado el menu'})
            }else{
                res.status(200).send({message:'menu actualizado correctamente'})
            }
        }
    });
}
function activateMenu(req,res){
    const {id}=req.params;
    const{active}=req.body;
    Menu.findByIdAndUpdate(id,{active},(err,menuStored)=>{
        if(err){
            res.status(500).send({message:'error del servidor'});
        }else{
            if(!menuStored){
                res.status(404).send({message:'Menu no encontrado'})
            }else{
                if(active===true){
                    res.status(200).send({message:'menu activado correctamente'})
                }else{
                    res.status(200).send({message:'menu desactivado correctamente'})
                }
            }
        }
    })
}
function deleteMenu(req,res){
    const {id}=req.params;

    Menu.findByIdAndRemove(id,(err,menuDeleted)=>{
        if(err){
            res.status(500).send({message:'Error del servidor'});
        }else{
            if(!menuDeleted){
                res.status(404).send({message:'Menu no encontrado'});
            }else{
                res.status(200).send({message:'El menu ha sido eliminado correctamente'})
            }
        }
    })
}

module.exports={
    addMenu,
    getMenu,
    updateMenu,
    activateMenu,
    deleteMenu
};