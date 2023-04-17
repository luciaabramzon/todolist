import styles from '../css/styles.css'


const List = ({title,description,id,handleEdit,deleteToDo})=>{

    return(
        <div className="todoList">
                <h4>{title}</h4>
                <li>{description}</li>
                <div>
                  <button onClick={() => handleEdit(id)}>
                    <i className="bi bi-pencil" />
                  </button>
                  <button onClick={(e) => deleteToDo(e, id)}>
                    <i className="bi bi-trash3"/>
                    </button>
                    </div>
                    </div>
                      
    )
}


export default List