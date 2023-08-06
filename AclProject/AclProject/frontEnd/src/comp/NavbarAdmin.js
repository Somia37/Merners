import React from 'react'
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { useNavigate , useParams } from 'react-router-dom';
import {SiLotpolishairlines} from 'react-icons/si'

function NavbarAdmin() {
   
    const navigate = useNavigate();

    const id=useParams();
    
    const params = { "params": id };
    return (
        <Navbar className="navbar navbar-expand-md fixed-top" style= {{backgroundColor: 'rgb(153, 204, 221'}} >
        <SiLotpolishairlines size ={25}/><Navbar.Brand href={'/home'+"/" + params.params.user_id} >GUC Airlines</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="m-auto" style={ {fontWeight: '900' , fontColor: 'black'} }>
                <Nav.Link href= {'/home'+"/"+params.params.user_id}>All Flights</Nav.Link>
                <Nav.Link href={'/create' +"/"+params.params.user_id} >Create New Flight</Nav.Link>
                <Nav.Link href={'/search'+"/"+params.params.user_id} >Search</Nav.Link>
                <NavDropdown title= "Admin" id="basic-nav-dropdown" style={ {fontWeight: '900' , color : '#000000'} }>
                  
                  <NavDropdown.Item onClick = {() => {localStorage.removeItem("userInfo");  navigate("/")}} style={ {fontWeight: '900' , color : '#000000'} }>Logout</NavDropdown.Item>
                </NavDropdown>
      </Nav>
      <Nav />
      <Nav/>

    </Navbar.Collapse>
    </Navbar>   
    )
}

export default NavbarAdmin
