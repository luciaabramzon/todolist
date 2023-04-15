import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from '../css/styles.css'

const EditForm = ({ id, title, description, onSave, onCancel }) => {
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onSave(id, newTitle, newDescription)
    }
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Label className="titleForm">Edit</Form.Label>
        <Form.Group className="editForm">
          <Form.Label className='labelForm'>Title</Form.Label>
          <Form.Control
          className="inputEdit"
            type="text"
            placeholder="Enter Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label  className='labelForm'>Description</Form.Label>
          <Form.Control
          className="inputEdit"
            type="text"
            placeholder="Enter Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </Form.Group>
        <div>
        <Button variant="outline-primary" type="submit" className="buttonEdit">
          Save
        </Button>
        <Button variant="outline-secondary" className="buttonEdit" onClick={onCancel}>
          Cancel
        </Button>
        </div>
      </Form>
    )
  }
export default EditForm