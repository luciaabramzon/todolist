const express=require('express')
const app=express()
const PORT=process.env.PORT ||8080

const {connect}=require('./mongo/mongo')
connect()

const cors=require('cors')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'http://localhost:3000',
    credentiales:true
}))

const tdRouter=require('./routes/routes')
const routerJson=require('./routes/routesJson')

app.use('/',tdRouter)
app.use('/api',routerJson)

app.listen(PORT,()=>{
    console.log(`App corriendo en puerto ${PORT}`)
})

module.exports=app