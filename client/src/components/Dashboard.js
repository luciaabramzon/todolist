import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import styles from '../css/styles.css'

const Dashboard=()=>{
return(
    <div id='dashboard'>
    <h1>Welcome to TO DO LIST</h1>
    <div className="buttonDashboard">
    <Link to='/local'>
       <Button variant="secondary" className="butDash">To local</Button> 
    </Link>
    <Link to='/mongo'>
        <Button variant="secondary">To MongoAtlas</Button>
    </Link>
    </div>
    </div> 
)
}

export default Dashboard