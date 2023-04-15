const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const MONGO_URI_TEST=process.env.mongo_atlas_test

const connectDBtest=async ()=>{
    await mongoose.connection.close()
    await mongoose.connect(MONGO_URI_TEST)
}

module.exports=connectDBtest