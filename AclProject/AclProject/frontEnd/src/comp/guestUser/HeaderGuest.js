import React from 'react'
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { useNavigate , useParams } from 'react-router-dom';
import {SiLotpolishairlines} from 'react-icons/si'

const HeaderGuest = () => {
  const navigate = useNavigate();
  

  return (
 <Navbar className="navbar navbar-expand-md fixed-top" style= {{backgroundColor: 'rgb(153, 204, 221'}} >
   <SiLotpolishairlines size ={25}/><Navbar.Brand  href = '/guestHomePage'>GUC Airlines</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" >
    <Nav className="m-auto" style={ {fontWeight: '900' , fontColor: 'black'} }>
        <Nav.Link href={'/GuestSearchFlights'} >Search Flights</Nav.Link>
        <Nav.Link href={'/AllFlightsGuest'} >All Flights</Nav.Link>
        <Nav.Link href={'/'} >Login</Nav.Link>
        <Nav.Link href={'/Register'}>Register</Nav.Link>
        
      </Nav>
      <Nav />
      <Nav/>
      
    </Navbar.Collapse>
</Navbar>
    )
}

export default HeaderGuest
