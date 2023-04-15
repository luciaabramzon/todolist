const Contenedor=require('../contenedor/contenedorJson')
const db=new Contenedor('toDoList.json')

async function getAll(req,res){
    try{
        const response=await db.getAll()
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }
}

async function save(req,res){
    try{
        const title=req.body.title
        const description=req.body.description
        const newToDo= await db.save({
            title,
            description
        })
        res.status(200).json(newToDo)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }
}

async function getToDoById(req,res){
    try{
        const id=JSON.parse(req.params.id)
        const getById=await db.getById(id)
        if(!getById){
            res.status(404).json({error:'Registro Inexistente'})
        }
            res.status(200).json(getById)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }
}

async function updateById(req,res){
    try{
        const id=JSON.parse(req.params.id)
        const title=req.body.title
        const description=req.body.description
        const getById=await db.getById(id)
        if(!getById){
            res.status(404).json({error:'Registro Inexistente'})
        }else{
            const newUpdate={
                title,
                description
            }
            const update=await db.updateById(id,newUpdate)
            res.status(200).json(update)
        }  
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }
}

async function deleteById(req,res){
    try{
        const id=JSON.parse(req.params.id)
        const getById=await db.getById(id)
        if(!getById){
            res.status(404).json({error:'Registro Inexistente'})
        }else{
        const deleteItem=await db.deleteById(id)
        res.status(200).json(deleteItem)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }

}

module.exports={getAll,save,getToDoById,updateById,deleteById}