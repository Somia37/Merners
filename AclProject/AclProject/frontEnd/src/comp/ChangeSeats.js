import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Header from './Header'
import Alert from '@mui/material/Alert';
import { Button } from '@material-ui/core';

function ChangeSeats() {
    const id=useParams();
    const flightparams = { "params": { "_id": id.flight_id} };
    const userparams = { "params": { "_id": id.user_id} };
    const reservationparams = { "_id": id.reservation_id} ;

    const p = parseInt(id.adultsNumber) + parseInt(id.childrenNumber);
   
    const [seatsPreviouslyChoosen, setseatsPreviouslyChoosen] = useState([]);
    const [sn, setsn] = useState(0);
    const [sa, setsa] = useState([]);
    const [numberOfGreenSeats, setNumberOfGreenSeats] = useState(0);
    const [greenSeats, setGreenSeats] = useState([]);
    const [color, setmo7sen] = useState([]);
    const colors = [];
    const [error,setError] = useState(null) 

    if(error !== null)
    {
        setTimeout(() => {
            setError(null);
          }, 3000);
    }

    const [reservation, setreservation] = useState({ _id: "", flight: "", user: "", adultsNumber:"", childrenNumber:"", totalPrice:"", classChoosen: "", seatsChoosen: ["0"]});
    const [flight, setflight] = useState({ flightNumber: "", departureTime: "", arrivalTime: "", departureDate: "", arrivalDate: "",terminal:"", firstSeatsAvailable: "", firstSeatsLuggage: "", firstSeatsPrice: "", economySeatsAvailable: "", economySeatsLuggage: "", economySeatsPrice: "", businessSeatsAvailable: "", businessSeatsLuggage: "", businessSeatsPrice: "", airport: "", from: "", to: "", firstSeatsAvailablePositions: [], economySeatsAvailablePositions: [], businessSeatsAvailablePositions: []});

    var dividedBy4 = [];
    for(let i=0; i<Math.floor(sa.length/4); i++){
        dividedBy4.push(i);
    }

    var remaining1 = [];
    if(sa.length == dividedBy4.length*4 + 1){
        remaining1.push(true);
    }
    var remaining2 = [];
    if(sa.length == dividedBy4.length*4 + 2){
        remaining2.push(true);
    }
    var remaining3 = [];
    if(sa.length == dividedBy4.length*4 + 3){
        remaining3.push(true);
    }


    const HandleSubmit = (e) => {
        e.preventDefault();
        setGreenSeats(greenSeats);
        setNumberOfGreenSeats(greenSeats.length);
        var adultsd=parseInt(id.adultsNumber);
        var childrend=parseInt(id.childrenNumber);
        console.log(greenSeats.length)
        console.log(adultsd+childrend)
       if( (adultsd+childrend) == greenSeats.length ){
        localStorage.setItem("depFlight", JSON.stringify(flight)); 
 
  window.location.href = "http://localhost:3000/Changesumm/"+flightparams.params._id+"/"+id.class+"/"+id.adultsNumber+"/"+id.childrenNumber+"/"+greenSeats+"/"+userparams.params._id+"/"+reservationparams._id;

    }
    else{
        setError("Number of seats chosen must be equal to selected");

    }

}

    useEffect(() => {
       
        axios.get('http://localhost:8000/flights/flight', flightparams).then(resp => { setflight(resp.data) }).catch((err) => { console.log(err) });
        axios.post('http://localhost:8000/reservations/Reservation', reservationparams).then(resp => { setreservation(resp.data) }).catch((err) => { console.log(err) });

        // newwww
        // console.log(flight);
    },[]);

    useEffect(() => {
      
      
    if(id.class === "First class"){
      //  alert(flight.firstSeatsAvailablePositions.length)
        for(var i = 0; i < flight.firstSeatsAvailablePositions.length; i++)     // new
            for(var j = 0; j < seatsPreviouslyChoosen.length; j++)
                if( i == j )
                    flight.firstSeatsAvailablePositions[j] = null;              // till here
        setsn(flight.firstSeatsAvailable);
        setsa(flight.firstSeatsAvailablePositions);
      }
       else if(id.class === "Economy class"){
       // alert(flight.economySeatsAvailablePositions.length)
        for(var i = 0; i < flight.economySeatsAvailablePositions.length; i++)   // new
            for(var j = 0; j < seatsPreviouslyChoosen.length; j++)
                if( i == j )
                    flight.economySeatsAvailablePositions[j] = null;            // till here
        setsn(flight.economySeatsAvailable);
        setsa(flight.economySeatsAvailablePositions);
       }   
       else if(id.class === "Business class"){
       // alert(flight.businessSeatsAvailablePositions.length)
        for(var i = 0; i < flight.businessSeatsAvailablePositions.length; i++)  // new
            for(var j = 0; j < seatsPreviouslyChoosen.length; j++)
                if( i == j )
                    flight.businessSeatsAvailablePositions[j] = null;            // till here
        setsn(flight.businessSeatsAvailable);
        setsa(flight.businessSeatsAvailablePositions);
    }
    // setsa([true, true, false, true, false, false, true, true, true, true, false, true, false, false, true, true, true, true, false, true, false, false, true, true, true, true, false, true, false, false, true, true, true, true, false, true, false, false, true, true, true, true, false, true, false, false, true, true, false, false,false])

    
    },[flight]);

useEffect(()=>{
    console.log(id.class);
    console.log(reservation.classChoosen);

    var xx= reservation.seatsChoosen[0].split(",")
    
    for(let i=0; i<sa.length; i++){
        var x=i+1+"";
        console.log("i=",i,reservation.seatsChoosen)
        if(sa[i] == null)  {            // new
            colors.push('#00FF00')  }      // till here
        else if(sa[i]){
            colors.push('#FFFFFF') ;
        }
        
        else if(xx.includes(x)
        && reservation.classChoosen.includes(id.class)
        )
         {colors.push('#00FF00') ;}
        else{
            colors.push('#FF0000') ;}
        }
        console.log(colors);
        

    setmo7sen(colors);
   

},[sa,reservation])

useEffect(()=>{ 
    var xx= reservation.seatsChoosen[0].split(",")
    if(reservation.classChoosen.includes(id.class)){
    for(let i=0; i<xx.length; i++){
    if(parseInt(xx[i])!==0){
    greenSeats.push(parseInt(xx[i]));}
}}},[reservation]);
    
    return (
        <div>   
        <Header />
        <br/>
        <span style ={{fontWeight: '900' , fontSize: 70 , color: 'white', fontFamily: 'ui-sans-serif'}}>Choose Your Seats</span>
        <br/><br/>{error && <Alert style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error"><strong> {error}</strong></Alert>}

        <span style ={{fontWeight: '500' , fontSize: 30 , color: 'white', fontFamily: 'ui-sans-serif'}}>Please choose {p} seat(s)</span>
        <form onSubmit={(e) => {
            HandleSubmit(e); 

        }}>

            <table className="table" style={{marginLeft:"700px" ,width:"2000px"}}>

                        
                        <th>c1</th> 
                        <th>c2</th> 
                        <th></th> 
                        <th>c3</th> 
                        <th>c4</th> 
               
      <tbody>
      {dividedBy4.map((number) => 
               
          <tr>
          <td 
          id={""+(number*4+1)}
          style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[number*4] }}
          onClick={() => {
                if(document.getElementById(""+(number*4+1)).style.backgroundColor ==='rgb(0, 255, 0)'){
                    if (greenSeats.indexOf(number*4+1) > -1) {
                        greenSeats.splice(greenSeats.indexOf(number*4+1), 1);
                      }
                    document.getElementById(""+(number*4+1)).style.backgroundColor ='#FFFFFF';}
                else if(document.getElementById(""+(number*4+1)).style.backgroundColor ==='rgb(255, 255, 255)'){
                    greenSeats.push(number*4+1);
                    console.log(greenSeats);
                    console.log(number*4+1);
                    document.getElementById(""+(number*4+1)).style.backgroundColor ='#00FF00';}}
                 }
          >{number*4+1} </td> 
          <td
          id={""+(number*4+2)}
          style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[number*4+1] }} 
          onClick={() => {
                if(document.getElementById(""+(number*4+2)).style.backgroundColor ==='rgb(0, 255, 0)'){
                    if (greenSeats.indexOf(number*4+2) > -1) {
                        greenSeats.splice(greenSeats.indexOf(number*4+2), 1);
                      }
                    document.getElementById(""+(number*4+2)).style.backgroundColor ='#FFFFFF';}
                else if(document.getElementById(""+(number*4+2)).style.backgroundColor ==='rgb(255, 255, 255)'){
                    greenSeats.push(number*4+2);
                    console.log(greenSeats);
                    console.log(number*4+2);
                    document.getElementById(""+(number*4+2)).style.backgroundColor ='#00FF00' ;   }} }
          >{number*4+2} </td>
          <td 
          style={{ height:"50px", width:"50px", border:"0px solid black" }}
          ></td>
          <td 
          id={""+(number*4+3)} 
          style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[number*4+2] }} 
          onClick={() => {
                if(document.getElementById(""+(number*4+3)).style.backgroundColor ==='rgb(0, 255, 0)'){
                    if (greenSeats.indexOf(number*4+3) > -1) {
                        greenSeats.splice(greenSeats.indexOf(number*4+3), 1);
                      }
                    document.getElementById(""+(number*4+3)).style.backgroundColor ='#FFFFFF';}
                else if(document.getElementById(""+(number*4+3)).style.backgroundColor ==='rgb(255, 255, 255)'){ 
                    greenSeats.push(number*4+3);
                    console.log(greenSeats);
                    console.log(number*4+3);
                    document.getElementById(""+(number*4+3)).style.backgroundColor ='#00FF00' ;   }} }
          >{number*4+3} </td>
          <td 
          id={""+(number*4+4)} 
          style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[number*4+3] }} 
          onClick={() => {
                if(document.getElementById(""+(number*4+4)).style.backgroundColor ==='rgb(0, 255, 0)'){
                    if (greenSeats.indexOf(number*4+4) > -1) {
                        greenSeats.splice(greenSeats.indexOf(number*4+4), 1);
                      }
                    document.getElementById(""+(number*4+4)).style.backgroundColor ='#FFFFFF';}
                else if(document.getElementById(""+(number*4+4)).style.backgroundColor ==='rgb(255, 255, 255)'){ 
                    greenSeats.push(number*4+4);
                    console.log(greenSeats);
                    console.log(number*4+4);
                    document.getElementById(""+(number*4+4)).style.backgroundColor ='#00FF00' ;   }} }
          >{number*4+4} </td>
          
          
         
           <td/>
            
   </tr>
   

   )
      } 
      
      {remaining1.map((number) => 
     
     <tr>
          <td 
          id={""+sa.length} 
          style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[sa.length-1] }} 
          onClick={() => {
                if(document.getElementById(""+sa.length).style.backgroundColor ==='rgb(0, 255, 0)'){
                    if (greenSeats.indexOf(sa.length) > -1) {
                        greenSeats.splice(greenSeats.indexOf(sa.length), 1);
                      }
                    document.getElementById(""+sa.length).style.backgroundColor ='#FFFFFF';}
                else if(document.getElementById(""+sa.length).style.backgroundColor ==='rgb(255, 255, 255)'){ 
                    greenSeats.push(sa.length);
                    console.log(greenSeats);
                    console.log(sa.length);
                    document.getElementById(""+sa.length).style.backgroundColor ='#00FF00' ;   }} }
          >{sa.length} </td>
     
     
    
       
</tr>


)
 } 
 {remaining2.map((number) => 

<tr>
          <td 
          id={""+sa.length-1} 
          style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[sa.length-2] }} 
          onClick={() => {
                if(document.getElementById(""+sa.length-1).style.backgroundColor ==='rgb(0, 255, 0)'){
                    if (greenSeats.indexOf(sa.length-1) > -1) {
                        greenSeats.splice(greenSeats.indexOf(sa.length-1), 1);
                      }
                    document.getElementById(""+sa.length-1).style.backgroundColor ='#FFFFFF';}
                else if(document.getElementById(""+sa.length-1).style.backgroundColor ==='rgb(255, 255, 255)'){ 
                    greenSeats.push(sa.length-1);
                    console.log(greenSeats);
                    console.log(sa.length-1);
                    document.getElementById(""+sa.length-1).style.backgroundColor ='#00FF00' ;   }} }
          >{sa.length-1} </td> <td/> <td/> <td/>
          <td 
          id={""+sa.length} 
          style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[sa.length-1] }} 
          onClick={() => {
                if(document.getElementById(""+sa.length).style.backgroundColor ==='rgb(0, 255, 0)'){
                    if (greenSeats.indexOf(sa.length) > -1) {
                        greenSeats.splice(greenSeats.indexOf(sa.length), 1);
                      }
                    document.getElementById(""+sa.length).style.backgroundColor ='#FFFFFF';}
                else if(document.getElementById(""+sa.length).style.backgroundColor ==='rgb(255, 255, 255)'){ 
                    greenSeats.push(sa.length);
                    console.log(greenSeats);
                    console.log(sa.length);
                    document.getElementById(""+sa.length).style.backgroundColor ='#00FF00' ;   }} }
          >{sa.length} </td>


  
</tr>


)
} 
 {remaining3.map((number) => 

<tr>
<td 
id={""+sa.length-2} 
style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[sa.length-3] }} 
onClick={() => {
        if(document.getElementById(""+sa.length-2).style.backgroundColor ==='rgb(0, 255, 0)'){
            if (greenSeats.indexOf(sa.length-2) > -1) {
                greenSeats.splice(greenSeats.indexOf(sa.length-2), 1);
            }
            document.getElementById(""+sa.length-2).style.backgroundColor ='#FFFFFF';}
        else if(document.getElementById(""+sa.length-2).style.backgroundColor ==='rgb(255, 255, 255)'){ 
            greenSeats.push(sa.length-2);
            console.log(greenSeats);
            console.log(sa.length-2);
            document.getElementById(""+sa.length-2).style.backgroundColor ='#00FF00' ;   }} } 
>{sa.length-2} </td>
          <td 
          id={""+sa.length-1} 
          style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[sa.length-2] }} 
          onClick={() => {
                if(document.getElementById(""+sa.length-1).style.backgroundColor ==='rgb(0, 255, 0)'){
                    if (greenSeats.indexOf(sa.length-1) > -1) {
                        greenSeats.splice(greenSeats.indexOf(sa.length-1), 1);
                      }
                    document.getElementById(""+sa.length-1).style.backgroundColor ='#FFFFFF';}
                else if(document.getElementById(""+sa.length-1).style.backgroundColor ==='rgb(255, 255, 255)'){ 
                    greenSeats.push(sa.length-1);
                    console.log(greenSeats);
                    console.log(sa.length-1);
                    document.getElementById(""+sa.length-1).style.backgroundColor ='#00FF00' ;   }} }
          >{sa.length-1} </td> <td/> <td/>
          <td 
          id={""+sa.length} 
          style={{ height:"50px", width:"50px", border:"1px solid black", backgroundColor:color[sa.length-1] }} 
          onClick={() => {
                if(document.getElementById(""+sa.length).style.backgroundColor ==='rgb(0, 255, 0)'){
                    if (greenSeats.indexOf(sa.length) > -1) {
                        greenSeats.splice(greenSeats.indexOf(sa.length), 1);
                      }
                    document.getElementById(""+sa.length).style.backgroundColor ='#FFFFFF';}
                else if(document.getElementById(""+sa.length).style.backgroundColor ==='rgb(255, 255, 255)'){ 
                    greenSeats.push(sa.length);
                    console.log(greenSeats);
                    console.log(sa.length);
                    document.getElementById(""+sa.length).style.backgroundColor ='#00FF00' ;   }} }
          >{sa.length} </td>


  
</tr>


)
} 



      
          </tbody>
    </table>
    <Button type='submit' variant="contained" style={{margin:'6px 0' , backgroundColor:'rgb(160, 208, 226)'}}>Confirm</Button>    


</form>
</div>   
    )
}

export default ChangeSeats;