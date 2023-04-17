import { useEffect, useState } from "react"
import { addLocalList, deleteLocal, getLocalList, updateLocal } from "../../api/client"
import Loading from '../helpers/Loading'
import EditForm from "../EditForm"
import AddForm from "../AddForm"
import List from "../List"

const LocalList=()=>{
    const [localList,setLocalList]=useState([])
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [editingId,setEditingId]=useState(null)

    const getToDoLocal=async()=>{
        const res=await getLocalList()
        setLocalList(res.data)
    }

    const addToLocal=async()=>{
        if(title===''){
            alert('title is needed')
        }else{
            await addLocalList({title,description})
            setTitle('')
            setDescription('')
            getToDoLocal()
        }
    }

    const deleteToDo=async (e,id)=>{
        await deleteLocal(id)
        getToDoLocal()
    }

    const handleEdit=(id)=>{
        setEditingId(id)
    }

    const handleSave=async(id,newTitle,newDescription)=>{
    await updateLocal(id,{title:newTitle,description:newDescription})
       setEditingId(null)
       getToDoLocal()
    }

    const handleCancel=()=>{
        setEditingId(null)
    }

    useEffect(()=>{
        getToDoLocal()
    },[])

    if(localList===[]){
        return <Loading/>
    }
    return(
        <>
        <h1>To do list</h1>
      <AddForm
        title={title}
        description={description}
        onSubmit={addToLocal}
        setDescription={setDescription}
        setTitle={setTitle}
        />
        {localList.map((list)=>( 
            <div key={list.id}>
                {editingId===list.id ? (
                    <EditForm
                    id={list.id}
                    title={list.title}
                    description={list.description}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    />):(
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

export default LocalList