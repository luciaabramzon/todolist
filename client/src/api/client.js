import client from './index'

export async function getListMongo(){
    const {data}=await client.get('/api/todolists')
    return{data}
}

export async function getLocalList(){
    const {data}=await client.get('/api/api/todolists')
    return {data}
}

export async function addMongoList(object){
    const {data}=await client.post('/api/todolists',object)
    return {data}
}

export async function addLocalList(object){
    const {data}=await client.post('/api/api/todolists',object)
    return {data}
}

export async function updateMongo(id,object){
    const{data}=await client.put(`/api/todolists/${id}`,object)
    return {data}
}

export async function updateLocal(id,object){
    const{data}=await client.put(`/api/api/todolists/${id}`,object)
    return {data}
}

export async function deleteMongo(id){
    const {data}=await client.delete(`/api/todolists/${id}`)
    return {data}
}

export async function deleteLocal(id){
    const {data}=await client.delete(`/api/api/todolists/${id}`)
    return {data}
}

