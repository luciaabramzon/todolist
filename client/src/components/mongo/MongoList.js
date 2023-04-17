import { useEffect, useState } from "react"
import { addMongoList, deleteMongo, getListMongo, updateMongo } from "../../api/client"
import Loading from "../helpers/Loading"
import EditForm from "../EditForm"
import AddForm from "../AddForm"
import List from "../List"


    const MongoList=()=>{
    const [mongoList,setMongoList]=useState([])
    const [title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const [editingId,setEditingId]=useState(null)

    const getToDoMongo=async()=>{
        const res=await getListMongo()
        setMongoList(res.data)
    }

    const addToDoMongo=async()=>{
        if(title===''){
            alert('Se requiere un titulo')
        }else{
            await addMongoList({title,description})
            setTitle('')
            setDescription('')
            getToDoMongo()
        }
    }

    const deleteToDo=async(e,id)=>{
        await deleteMongo(id)
       getToDoMongo()
    }

    const handleEdit=(id)=>{
        setEditingId(id)
    }

    const handleSave=async(id,newTitle,newDescription)=>{
        await updateMongo(id,{title:newTitle,description:newDescription})
        setEditingId(null)
        getToDoMongo()
    }

    const handleCancel=()=>{
        setEditingId(null)
    }

    useEffect(()=>{
        getToDoMongo()
    },[])

    if(setMongoList===[]){
        return <Loading/>
    }

    return(
        <>
        <h1>To Do List</h1>
        <AddForm
          title={title}
          description={description}
          onSubmit={addToDoMongo}
          setDescription={setDescription}
          setTitle={setTitle}
        />
        {mongoList.map((list)=>(
            <div key={list.id}>
                {editingId===list.id ?(
                    <EditForm
                    id={list.id}
                    title={list.title}
                    description={list.description}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    />
                ):(
                    <List
                id={list.id}
                title={list.title}
                description={list.description}
                handleEdit={handleEdit}
                deleteToDo={deleteToDo}
                />
                       )}
                    </div>
            
        ))}
        </>
    )

    }

    export default MongoList