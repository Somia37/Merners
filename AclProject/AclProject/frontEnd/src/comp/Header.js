import React from 'react'
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { useNavigate , useParams } from 'react-router-dom';
import {SiLotpolishairlines} from 'react-icons/si'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('userInfo')).firstName;
  const navigate = useNavigate();
  
  const id=useParams();
    
  const params = { "params": id };


  return (
 <Navbar className="navbar navbar-expand-md fixed-top" style= {{backgroundColor: 'rgb(153, 204, 221'}} >
   <SiLotpolishairlines size ={25}/><Navbar.Brand  href={'/HomePageUser'+"/" + params.params.user_id}>GUC Airlines</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" >
    <Nav className="m-auto" style={ {fontWeight: '900' , fontColor: 'black'} }>
        <Nav.Link href= {'/AllUserFlights'+"/" + params.params.user_id}  >My Flights</Nav.Link>
        <Nav.Link href={'/Usersearchflights'+"/"+params.params.user_id} >Search Flights</Nav.Link>
        <Nav.Link href={'/AllFlightsUser'+"/"+params.params.user_id} >All Flights</Nav.Link>
        <NavDropdown title={user} id="basic-nav-dropdown" style={ {fontWeight: '900' , color : '#000000'} }>
          <NavDropdown.Item href= { "/editProfile" + "/" + params.params.user_id} style={ {fontWeight: '900' , color : '#000000'} }>My Profile</NavDropdown.Item>
          <NavDropdown.Item href={ "/changePassword" + "/" + params.params.user_id} style={ {fontWeight: '900' , color : '#000000'} }>Change Password</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick = {() => {localStorage.clear();  navigate("/")}} style={ {fontWeight: '900' , color : '#000000'} }>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav />
      <Nav/>
      
    </Navbar.Collapse>
</Navbar>
    )
}

export default Header
