const tdSchema=require('../mongo/Schema')

async function getList(req,res){
    try{
        const response=await tdSchema.find()
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }
}

async function addToDoList(req,res){
    try{
        const title=req.body.title
        const description=req.body.description
        const count= await tdSchema.countDocuments()
        if (count===0){
            const tdList1= await new tdSchema({
                title,
                description,
                id:1
               })
               const newToDoList1=await tdList1.save()
               res.status(200).json(newToDoList1)
        }else{
            const result=await tdSchema.find().select('id').sort({ id: -1 }).limit(1)
            const oldId=result[0].id
            const tdList= await new tdSchema({
            title,
            description,
            id:oldId+1
           })
           const newToDoList=await tdList.save()
            res.status(200).json(newToDoList)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }
}

async function getToDoById(req,res){
    try{
        const id=req.params.id
        const response=await tdSchema.findOne({id:id})
        if(response===null){
            res.status(404).json({error:'Registro inexistente'})
        }else{
            res.status(200).send(response)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }
}

async function updateToDoById(req,res){
    try{
        const id=req.params.id
        const title=req.body.title
        const description=req.body.description
        const response=await tdSchema.findOne({id:id})
        if(response===null){
            res.status(404).json({error:'Registro inexistente'})
        }else{
            const newToDo={
                title,
                description
            }
           const updateToDo=await tdSchema.findOneAndUpdate({id:id},newToDo,{new:true})
            res.status(200).json(updateToDo)
        } 
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }
}

async function deleteById(req,res){
    try{
        const id=req.params.id      
        const response1=await tdSchema.findOne({id:id})
        if(response1===null){
            res.status(404).json({error:'Registro inexistente'})
        }else{
            const response=await tdSchema.findOneAndDelete({id:id})
            res.status(200).json(response)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error interno del servidor'})
    }
   
}

module.exports={
    getList,
    addToDoList,
    getToDoById,
    updateToDoById,
    deleteById
}