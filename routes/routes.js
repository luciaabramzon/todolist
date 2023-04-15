const express=require('express')
const tdRouter=express.Router()
const {getList,addToDoList,getToDoById,updateToDoById, deleteById}=require('../controllers/controller')

tdRouter.get('/api/todolists',getList)
tdRouter.post('/api/todolists',addToDoList)
tdRouter.get('/api/todolists/:id',getToDoById)
tdRouter.put('/api/todolists/:id',updateToDoById)
tdRouter.delete('/api/todolists/:id',deleteById)

module.exports=tdRouter