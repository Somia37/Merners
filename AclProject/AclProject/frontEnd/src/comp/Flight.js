import React from 'react'

import { Link } from 'react-router-dom'
import NavbarAdmin from'./NavbarAdmin'

function Flight() {
  const _id = "61847a038d0bf591b23b32ee"
  return (
    <div>
       <NavbarAdmin />
      <ul>
        <li>flightNumber: </li>
        <li>departureTime:  </li>
        <li> arrivalTime:</li>
        <li> departureDate:</li>
        <li> arrivalDate: </li>
        <li> FirstSeatsAvailable: </li>
        <li> EconomySeatsAvailable: </li>
        <li> BusinessSeatsAvailable: </li>
        <li> airport: </li>
        <li> From:</li>
        <li> To:</li>
      </ul>
      <Link to={`/update/${_id}`} style={{ color: 'grey', backgroundColor: 'black', font: 25 }}>update</Link>
      <Link to={`/delete/${data._id}`} style={{ color: 'black', backgroundColor: 'lightgrey', font: 30, marginLeft:10 ,padding: 10, textDecoration: 'none' }}>Delete</Link>



      <button>Delete</button>
    </div>
  )
}

export default Flight
