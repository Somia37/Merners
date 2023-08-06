import React, { useEffect ,useState } from 'react'
import Header from './Header';
import { Card , Container , Row , Col} from "react-bootstrap";
import Loading from "./Loading";
import axios from 'axios';
import {Grid, GridColumn} from 'semantic-ui-react'
import DeleteIcon from '@mui/icons-material/Delete';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ModeEdit from  '@mui/icons-material/ModeEdit'
import IconButton from '@mui/material/IconButton';
import {SiLotpolishairlines} from 'react-icons/si';
import {Avatar } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import EventSeatIcon from '@mui/icons-material/EventSeat';




const AllUserFlights = () => {
    //<p > From ──────────────── To</p>

    const [reservations , setReservations] = useState([]); 
    const [message , setMessage] = useState(null);
    const [loading , setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const titlex = "Welcome Back "+ user.firstName + " "+ user.lastName

    if(message !== null)
    {
        setTimeout(() => {
            setMessage(null);
          }, 3000);
    }



    const  deleteHandler = async(reservation) =>{
    if(window.confirm("Are you sure you want to cancel this flight?")){
        setLoading(true)
        await axios.post('http://localhost:8000/flights/greenSeats', reservation);
        axios.post('http://localhost:8000/reservations/cancel',{_id:reservation._id});
        setLoading(false);
        window.location = '/AllUserFlights/'+ user._id;
        setMessage("Flight is cancelled!")  
        
        const mailContent = "Your Flight To " + reservation.to + " Has Been Cancelled!"

        const mailReq = { mailContent : mailContent ,email: user.email , subject: "Cancelling you flight"}

        // axios.post("http://localhost:8000/sendMail", mailReq);
        
    }
    }

    const  editHandler = async(reservation) =>{
        if(window.confirm("Are you sure you want to edit this flight?")){
            
            axios.post('http://localhost:8000/reservations/reservation', {_id:reservation._id}).then(resp => {
               
                window.location = '/UserEditSearchFlights/'+resp.data.flight+"/"+user._id+"/"+reservation._id;
              }).catch((err) => { console.log(err) });
       
        }
    }

    const  changeHandler = async(reservation) =>{
        if(window.confirm("Are you sure you want to change this flight?")){
            axios.post('http://localhost:8000/reservations/Reservation', {_id:reservation._id}).then(resp => {
                window.location = '/showDetailsChange/'+resp.data.flight+"/"+user._id+"/"+reservation._id;
              }).catch((err) => { console.log(err) });
       
        }
    }

    const sendMail = async (reservation) =>
    {
        if(window.confirm("Do you want the flight details to be sent to you by mail?"))
        {
            setLoading(true)
            var x = "" ;
            var flight = await axios.post('http://localhost:8000/flights/flightById',{flight : reservation.flight}) ; 
            x = x + "<br />" + "From: " + reservation.from + "<br />"
                 + "Departure Time: " + reservation.departureTime+ "<br />"
                 + "Arrival Time: " + reservation.arrivalTime +  "<br />"
                 + "Duration: "  + reservation.duration  + "<br />"
                 + "Departure Date: " + reservation.departureDate.substring(0,10) +  "<br />"
                 + "Arrival Date: " + reservation.arrivalDate.substring(0,10) +  "<br />"
                 + "Terminal: " + reservation.terminal + "<br />"
                 + "Airport: " + reservation.airport + "<br />"
                 +reservation.classChoosen +  "<br />"
                 + "Baggage Allowance: " + reservation.luggage + ". \n"
                 +"Number Of Passengers: " + reservation.seatsChoosen[0].split(",").length+ "<br />"
                 + "Chosen Seats: " + reservation.seatsChoosen +  "<br />";
                 
             
            const mailContent = "Your Flight To " + reservation.to + " Details: "+ "\n" + x;
            const mailReq = { mailContent : mailContent ,email: user.email , subject: " Flight Details"}
            // axios.post("http://localhost:8000/sendMail", mailReq);
            setLoading(false);
            setMessage("Flight is sent, Please check your mail!")  
            
    
            
        }
    }
    
    

    const fetchFlights = async() => {
        const id = {user:user._id};
        console.log(id)
        const {data} = await axios.post('http://localhost:8000/reservations/getReservation',id);
        var res = [] ;
        console.log(data)
        var c = "";
        var luggage = 0 ;
        var price = 0 ;
        for(var i in data)
        {
            c = data[i].classChoosen ;
            
            var fid = data[i].flight;
            var flight = await axios.post('http://localhost:8000/flights/flightById',{flight : data[i].flight}) ; 
            data[i].to = flight.data.to ;
            data[i].from = flight.data.from ;
            data[i].flightNumber = flight.data.flightNumber;
            data[i].departureTime = flight.data.departureTime;
            data[i].arrivalTime = flight.data.arrivalTime;
            data[i].departureDate = flight.data.departureDate;
            data[i].arrivalDate = flight.data.arrivalDate;
            data[i].terminal = flight.data.terminal;
            data[i].arrivalDate = flight.data.arrivalDate;
            data[i].terminal = flight.data.terminal;
            data[i].airport = flight.data.airport;
            if(c === "First class")
            { 
                price = flight.data.firstSeatsPrice;
                luggage = flight.data.firstSeatsLuggage;
            }
            else if(c ===  "Economy class")  
            {    
                price = flight.data.economySeatsPrice;
                luggage = flight.data.economySeatsLuggage;
            }
            else
            {
                price = flight.data.businessSeatsPrice;
                luggage = flight.data.businessSeatsLuggage;
            }

            data[i].luggage = luggage;
            
            const arrivalYear = Number(flight.data.arrivalDate.substring(0,4));
            const departureYear = Number(flight.data.departureDate.substring(0,4));
            const arrivalMon = Number(flight.data.arrivalDate.substring(5,7));
            const departureMon = Number(flight.data.departureDate.substring(5,7));
            const arrivalDay = Number(flight.data.arrivalDate.substring(8,10));
            const departureDay = Number(flight.data.departureDate.substring(8,10));
            const arrivalHour = Number(flight.data.arrivalTime.substring(0,2));
            const departureHour = Number(flight.data.departureTime.substring(0,2));
            const arrivalMin = Number(flight.data.arrivalTime.substring(3));
            const departureMin = Number(flight.data.departureTime.substring(3));
            const d=((arrivalHour*60+arrivalMin)-(departureHour*60+departureMin)+((arrivalDay-departureDay)*24*60))+((arrivalMon-departureMon)*30*24*60)+((arrivalYear-departureYear)*12*30*24*60);
            const hours = Math.floor(d / 60);
            const minutes = d % 60;
            data[i].duration = "";
            if(hours !== 0)
            data[i].duration+= hours + " Hours " ;
            if( minutes !== 0)
            data[i].duration+= "and "+ minutes+ " Minutes";
            
        }
        setReservations(data);
    }


    useEffect(() =>{
        fetchFlights();
       
    },[])

    return (
        <div>
            <Header />
            {loading && <Loading />}   
            
            <Row>
                <Container>
                     <span style ={{fontWeight: '900' , fontSize: 70 , color: 'white', fontFamily: 'ui-sans-serif'}}>Your Tickets</span>
                </Container>
            </Row>
            {message && <Alert severity="success" style={{backgroundColor: 'rgb(206, 237, 214,0.5)'}}><strong> {message}</strong> </Alert> } 
               { 
                    reservations.map((reservation) => (

                        <Container>
                            <Row>
                                <Col/>
                                <Col>
                        <Card style={{ width: '50rem' , margin: 20 , backgroundColor: 'rgba(255, 255, 255, 0.8)' }} borderRadius={50}> 
                          
                        <Card.Header borderRadius={50} style = {{fontSize : 22 ,color: 'white' ,fontWeight : "bold" , backgroundColor : 'rgb(112,201,225,255)'}}>
                            <Row>
                                <Col>
                                    <SiLotpolishairlines fill="white"/>
                                   
                                    <sapn style = {{fontSize : 18 ,color: 'white' ,fontWeight : "bold" , backgroundColor : 'rgb(112,201,225,255)'}}>  <i class="fa fa-cloud"/>GUC AIRLINES</sapn>
                                </Col>
                                <Col>
                                </Col>
                                <Col>
                                    <span style ={{fontWeight: '900' , fontSize: 24 , color: 'white'}}>  BOARDING PASS</span>
                                </Col>
                            </Row>
                            </Card.Header> 
 
                          <Card.Body> 
                            
                            
                            <Card.Text>
                                
                                <Grid celled columns={3}>
                                <Grid.Row>
                                <Grid.Column/>
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FROM </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.from.toUpperCase()}</span>
                                  </Grid.Column>
                                  <Grid.Column/>
                                  <Grid.Column/>
                                  <Grid.Column/>
                                  <Grid.Column/>
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TO </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.to.toUpperCase()}</span>
                                  </Grid.Column>
                                  <Grid.Column/>
                                  <GridColumn />
                                  <Grid.Column/>
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CLASS </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.classChoosen.toUpperCase()}</span>
                                  </Grid.Column>
                                  <Grid.Column/>
                                  <Grid.Column/>
                                  <Grid.Column/>
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>AIRPORT </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.airport.toUpperCase()}</span>
                                  </Grid.Column>
                                  </Grid.Row>

                                  <Grid.Row />

                                  <Grid.Row>
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE DATE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.departureDate.substring(0,10)}</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE TIME </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.departureTime}</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL DATE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.arrivalDate.substring(0,10)}</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL TIME </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.arrivalTime}</span>
                                  </Grid.Column>
                                </Grid.Row>

                                <Grid.Row />

                                <Grid.Row>
                                <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DURATION </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.duration}</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TERMINAL </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.terminal}</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>LUGGAGE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.luggage} KG</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />    
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>PRICE</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.totalPrice} €</span>
                                  </Grid.Column>
                                </Grid.Row>

                                <Grid.Row/>

                                <Grid.Row>
                                <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ADULTS </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.adultsNumber}</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHILDERN </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.childrenNumber}</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHOSEN SEATS </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.seatsChoosen}</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />    
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FLIGHT NUMBER </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.flightNumber}</span>
                                  </Grid.Column>
                                  <Grid.Column>
                                  </Grid.Column>
                                </Grid.Row>


                                 </Grid>
                              
                            
                            </Card.Text>
                          </Card.Body>
                          <Card.Footer borderRadius={50} class="d-flex" style ={{ backgroundColor : 'rgb(112,201,225,255)' , fontSize: 17 , fontWeight: 'bold' }}> 
                          
                           
                          <Col/>
                          <Col/>
                          <Col/>
                          <IconButton title="Mail" > 
                                <Avatar style={{backgroundColor:'rgb(162, 209, 227)'}} >
                                    <MailOutlineIcon  onClick={() => sendMail(reservation )}/>
                                </Avatar> 
                            </IconButton>
                          
                            <IconButton title="Change" > 
                                <Avatar style={{backgroundColor:'rgb(82, 203, 86,0.8)'}} >
                                    <ModeEdit  onClick={() =>  editHandler(reservation)}/>
                                </Avatar>
                            </IconButton>

                            <IconButton title="change Seats" > 
                                <Avatar style={{backgroundColor:'rgb(255, 255, 255  ,0.7)'}} >
                                    <EventSeatIcon  onClick={() => changeHandler(reservation )}/>
                                </Avatar>
                            </IconButton>

                            <IconButton title="Delete" > 
                                <Avatar style={{backgroundColor:'rgb(255, 66, 56,0.7)'}} >
                                    <DeleteIcon  onClick={() => deleteHandler(reservation )}/>
                                </Avatar>
                            </IconButton>

                          </Card.Footer>
                       
                        </Card> 
                        </Col>
                        <Col/>
                        </Row>
                        </Container>                        
                    ))
                }
        </div>
    )
}

export default AllUserFlights
