import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import styles from '../css/styles.css'

const WebNavbar=()=> {
  return (
    <>
      <Navbar className='navbar'>
        <Container>
          <Navbar.Brand>
            <NavLink to='/' className='links'>To do List</NavLink>
            </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to='/local' className='links'>Local</NavLink>
            <NavLink to='/mongo' className='links'>MongoAtlas</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default WebNavbar