import { useEffect, useState } from "react"
import { addLocalList, deleteLocal, getLocalList, updateLocal } from "../../api/client"
import Form from 'react-bootstrap/Form'
import Loading from '../helpers/Loading'
import Button from 'react-bootstrap/Button'
import EditForm from "../EditForm"

const LocalList=()=>{
    const [localList,setLocalList]=useState([])
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [editingId,setEditingId]=useState(null)

    const getToDoLocal=async()=>{
        const res=await getLocalList()
        setLocalList(res.data)
    }

    const addToLocal=async(e)=>{
        if(title===''){
            alert('title is needed')
        }else{
            e.preventDefault()
            await addLocalList({title,description})
            setTitle('')
            setDescription('')
            getToDoLocal()
        }
    }

    const deleteToDoLocal=async (e,id)=>{
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
        <Form onSubmit={addToLocal}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
            </Form.Group>
            <Button variant="outline-primary" type="submit">Submit</Button>
        </Form>
        {localList.map((local)=>( 
            <div key={local.id}>
                {editingId===local.id ? (
                    <EditForm
                    id={local.id}
                    title={local.title}
                    description={local.description}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    />):(
                        <div className="todoList">
                        <h4>{local.title}</h4>
                        <li>{local.description}</li>
                        <div className="icons">
                    <button onClick={(e)=>handleEdit(local.id)}><i className="bi bi-pencil" 
                    /></button>
                   <button onClick={(e)=>{deleteToDoLocal(e,local.id)}}><i className="bi bi-trash3"
                    
                    /></button> 
                    </div>
                        </div>
                )}
            </div>
        ))}
        </>
    )
}

export default LocalList