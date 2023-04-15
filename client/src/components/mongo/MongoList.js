import { useEffect, useState } from "react"
import { addMongoList, deleteMongo, getListMongo, updateMongo } from "../../api/client"
import Loading from "../helpers/Loading"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from '../../css/styles.css'
import EditForm from "../EditForm"


    const MongoList=()=>{
    const [mongoList,setMongoList]=useState([])
    const [title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const [editingId,setEditingId]=useState(null)

    const getToDoMongo=async()=>{
        const res=await getListMongo()
        setMongoList(res.data)
    }

    const addToDoMongo=async(e)=>{
        if(title===''){
            alert('Se requiere un titulo')
        }else{
            e.preventDefault()
            await addMongoList({title,description})
            setTitle('')
            setDescription('')
            getToDoMongo()
        }
    }

    const deleteToDoMongo=async(e,id)=>{
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
        <Form onSubmit={addToDoMongo}>
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
                    <div className="todoList">
                    <h4 >{list.title}</h4>
                    <li>{list.description}</li>
                    <div>
                    <button onClick={()=>handleEdit(list.id)}>
                    <i className="bi bi-pencil"/>
                    </button>
                    <button onClick={(e)=>{deleteToDoMongo(e,list.id)}}> 
                    <i className="bi bi-trash3"/>
                    </button>
                    </div>
                    </div>
                       )}
                    </div>
            
        ))}
        </>
    )

    }

    export default MongoList