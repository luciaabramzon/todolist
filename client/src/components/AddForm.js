import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const AddForm = ({ title, description, onSubmit ,setTitle,setDescription}) => {

     const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit()
    }
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }

  export default AddForm
  