const request=require('supertest')
const app=require('../server')
const {describe,it}=require('@jest/globals')
const PORT=process.env.PORT ||8000
const connectDBTest=require('./test-config')
const { default: mongoose } = require('mongoose')
let server

 
beforeAll(async () => {
    await connectDBTest()
    server = app.listen(PORT, () => {
      console.log(`App corriendo en puerto ${PORT}`)
    })

  })
  
  afterAll(async() => {
    await mongoose.disconnect()
    server.close(() => {})

  })
  

describe('Test for MongoDB controllers endpoints',()=>{
    describe('GET /api/todolists',()=>{
        afterEach(async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 1000))
          })
      
        it('Should return status 200',async()=>{
            const response=await request(app).get('/api/todolists')
            expect(response.statusCode).toBe(200)
        })
    })

    describe('GET /api/todolists/:id',()=>{
        it('Should return status 200 (if register id exists) or 404 if doesnt exist',async()=>{
            const id=1
            const response=await request(app).get(`/api/todolists/${id}`)
            expect([200, 404]).toContain(response.statusCode)
        })
    })

    describe('POST /api/todolists',()=>{
        it('Should return status 200 and the new register',async ()=>{
            const object={prop1:'value',prop2:"value"}
            const response=await request(app).post('/api/todolists').send(object)
            expect(response.statusCode).toBe(200)
        })
    })

    describe('PUT /api/todolists/:id',()=>{
        it('Should return status 200 (if register id exists) or 404 if doesnt exist',async ()=>{
            const id=1
            const response=await request(app).put(`/api/todolists/${id}`)
            expect([200, 404]).toContain(response.statusCode)
        })
    })

    describe('DELETE /api/todolists/:id',()=>{
        it('Should return status 200 (if register id exists) or 404 if doesnt exist',async ()=>{
            const id=1
            const response=await request(app).delete(`/api/todolists/${id}`)
            expect([200, 404]).toContain(response.statusCode)
        })
    })

})

describe('Test for local json controllers endpoints',()=>{
    describe('GET /api/api/todolists',()=>{

        afterEach(async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 500))
          })

        it('Should return status 200',async()=>{
            const response=await request(app).get('/api/todolists')
            expect(response.statusCode).toBe(200)
        })
    })

    describe('GET /api/api/todolists/:id',()=>{
        it('Should return status 200 (if register id exists) or 404 if doesnt exist',async()=>{
            const id=1
            const response=await request(app).get(`/api/todolists/${id}`)
            expect([200, 404]).toContain(response.statusCode)
        })
    })

    describe('POST /api/api/todolists',()=>{
        it('Should return status 200 ',async ()=>{
            const object={prop1:'value',prop2:"value"}
            const response=await request(app).post('/api/todolists').send(object)
            expect(response.statusCode).toBe(200)
        })
    })
    
    describe('PUT /api/api/todolists/:id',()=>{
        it('Should return status 200 (if register id exists) or 404 if doesnt exist',async ()=>{
            const id=1
            const response=await request(app).put(`/api/todolists/${id}`)
            expect([200, 404]).toContain(response.statusCode)
        })
    })

    describe('DELETE /api/api/todolists/:id',()=>{
        it('Should return status 200 (if register id exists) or 404 if doesnt exist',async ()=>{
            const id=1
            const response=await request(app).delete(`/api/todolists/${id}`)
            expect([200, 404]).toContain(response.statusCode)
        })
    })
})