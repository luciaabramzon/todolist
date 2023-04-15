const express=require('express')
const routerJson=express.Router()
const {getAll,save,getToDoById,updateById,deleteById}=require('../controllers/controllerJson')

routerJson.get('/api/todolists',getAll)
routerJson.post('/api/todolists',save)
routerJson.get('/api/todolists/:id',getToDoById)
routerJson.put('/api/todolists/:id',updateById)
routerJson.delete('/api/todolists/:id',deleteById)


module.exports=routerJson