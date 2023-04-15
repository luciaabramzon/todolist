const mongoose=require('mongoose')
const Schema=mongoose.Schema

const todoSchema=new Schema({
    title:{type:String},
    description:{type:String},
    id:{type:Number}
})

const tdSchema=mongoose.model('registros',todoSchema)

module.exports=tdSchema