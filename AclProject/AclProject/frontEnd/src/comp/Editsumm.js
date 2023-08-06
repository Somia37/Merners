import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Header from'./Header'
import StripeCheckout from 'react-stripe-checkout';
import { Card , Container , Row , Col} from "react-bootstrap";
import {Grid, GridColumn} from 'semantic-ui-react';
import {Button,Paper} from '@material-ui/core';
import {SiLotpolishairlines} from 'react-icons/si';
import Alert from '@mui/material/Alert';

function Changesumm() {
    const id=useParams();
    const df={"_id":id.desiredFlight_id}
    const ndf={"_id":id.flight_id}
    const params = {"params" : id}
    const flightparams = { "params": { "_id": id.desiredFlight_id} };
    const notDesiredFlightparams = { "params": { "_id": id.flight_id} };
    // const userparams = { "params": { "_id": id.user_id} };
    const reservationparams = { "_id": id.reservation_id} ;
    const axiosparams = {"params":{"_id":id.desiredFlight_id, "class":params.params.class, "seats":params.params.seats}};
    const [paid ,setPaid] = useState(null);
   


    const [depRes, setReservationDep] = useState();
    // const [retRes, setReservationRet] =useState();

    const [reservation, setreservation] = useState({ _id: "", flight: "", user: "", adultsNumber:"", childrenNumber:"", totalPrice:"", classChoosen: "", seatsChoosen: ["0"]});
    const [flight, setflight] = useState({ flightNumber: "", departureTime: "", arrivalTime: "", departureDate: "", arrivalDate: "",terminal:"", firstSeatsAvailable: "", firstSeatsLuggage: "", firstSeatsPrice: "", economySeatsAvailable: "", economySeatsLuggage: "", economySeatsPrice: "", businessSeatsAvailable: "", businessSeatsLuggage: "", businessSeatsPrice: "", airport: "", from: "", to: "", firstSeatsAvailablePositions: [], economySeatsAvailablePositions: [], businessSeatsAvailablePositions: []});
    const [notDesiredFlight , setnotDesiredFlight] = useState({ flightNumber: "", departureTime: "", arrivalTime: "", departureDate: "", arrivalDate: "",terminal:"", firstSeatsAvailable: "", firstSeatsLuggage: "", firstSeatsPrice: "", economySeatsAvailable: "", economySeatsLuggage: "", economySeatsPrice: "", businessSeatsAvailable: "", businessSeatsLuggage: "", businessSeatsPrice: "", airport: "", from: "", to: "", firstSeatsAvailablePositions: [], economySeatsAvailablePositions: [], businessSeatsAvailablePositions: []});

    const [tp, settp] = useState(0);
    const [tpr, settpr] = useState(0);
    const [ba, setba] = useState("");
    const arrivalYear = Number(flight.arrivalDate.substring(0,4));
    const departureYear = Number(flight.departureDate.substring(0,4));
    const arrivalMon = Number(flight.arrivalDate.substring(5,7));
    const departureMon = Number(flight.departureDate.substring(5,7));
    const arrivalDay = Number(flight.arrivalDate.substring(8,10));
    const departureDay = Number(flight.departureDate.substring(8,10));
    const arrivalHour = Number(flight.arrivalTime.substring(0,2));
    const departureHour = Number(flight.departureTime.substring(0,2));
    const arrivalMin = Number(flight.arrivalTime.substring(3));
    const departureMin = Number(flight.departureTime.substring(3));
    const d=((arrivalHour*60+arrivalMin)-(departureHour*60+departureMin)+((arrivalDay-departureDay)*24*60))+((arrivalMon-departureMon)*30*24*60)+((arrivalYear-departureYear)*12*30*24*60);
    const hours = Math.floor(d / 60);
    const minutes = d % 60;
    const duration= hours+" hours and "+minutes+ " minutes";

    const price = tpr - tp ;

  
    const [baggageAllowance, setbaggageAllowance] = useState("");
    const [newres, setnewres] = useState({ _id: id.reservation_id, flight: id.desiredFlight_id, user: id.user_id, adultsNumber:id.adultsNumber, childrenNumber:id.childrenNumber, totalPrice:"", classChoosen: id.class, seatsChoosen: id.seats});
    
    const [message,setMessage] = useState(null);
    const [error,setError] = useState(null);


    


    if(error !== null)
    {
        setTimeout(() => {
            setError(null);
          }, 3000);
    }
    

    const makePayment = (token,e) =>{
        
   
        const totalPrice = price ;
        const body = {
            token:token , to:flight.to , price: totalPrice
        }
        const headers = {
            "Conetnt-Type": "application/json"
        }
        const paymentIntent = axios.post('http://localhost:8000/payment',body).then(response =>{
            console.log("RESPONSE ", response);
            const {status} = response;
            console.log("STATUS", status)
            
            if(status == 200)
            {
                setMessage("Your Flight is Booked Successfuly")
                setPaid(true);
            }
            else
            {
                setError("Unfortunately, The card got declined, Please try another card!!!");

            }
        })
        .catch(error => console.log(error.message))


        
    }



    const  cancel = () => {
        if(window.confirm("Are you sure that you want to cancel your reservation? ")){
            alert("Reservation is canceled ")
            localStorage.removeItem('depFlight');
            localStorage.removeItem('reFlight');
            window.location.href = "http://localhost:3000/homePageUser/"+params.params.user_id;  
        }  
        
        
      
    }

    const  HandleSubmit = (e) => {
        e.preventDefault();
        
        const wrse={resid:id.reservation_id,nfi:id.desiredFlight_id,seats:id.seats,class:id.class};

       // axios.post('http://localhost:8000/flights/greenSeats', reservation);
        // axios.post('http://localhost:8000/reservations/cancel',{_id:reservation._id});
        //axios.post('http://localhost:8000/reservations/create', depRes).then(() => console.log("posted sucsessfully")).catch((err) => {console.log(err)});
        axios.post('http://localhost:8000/reservations/update2', newres).then(() => console.log("posted sucsessfully")).catch((err) => {console.log(err)});
        axios.post('http://localhost:8000/flights/chse',wrse).then(()=>{}).catch((err) => {console.log(err)});
       
         //axios.post('http://localhost:8000/flights/redSeats', axiosparams).then(() => console.log("posted sucsessfully")).catch((err) => {console.log(err)});
      //  if(price < 0 )
      //    alert("Reservation updated succsessfully, An Email will be sent shortly, and an amount of "+price *-1 +" will be added to your account");
        
      //    else
          alert("Reservation updated succsessfully, An Email will be sent shortly");
        localStorage.removeItem('depFlight');
        localStorage.removeItem('reFlight');

        const mailContent = "Your Flight To " + depRes.from + " Has Been Reserved!";
        const user = JSON.parse(localStorage.getItem('userInfo'));

        const mailReq = { mailContent : mailContent , email: user.email , subject: "confirming your flight"}
        
        // axios.post("http://localhost:8000/sendMail", mailReq);

        window.location.href = "http://localhost:3000/homePageUser/"+user._id;
      
    }

    useEffect(() => {
   
        axios.get('http://localhost:8000/flights/flight', flightparams).then(resp => { setflight(resp.data) }).catch((err) => { console.log(err) });
        axios.get('http://localhost:8000/flights/flight', notDesiredFlightparams).then(resp => { setnotDesiredFlight(resp.data) }).catch((err) => { console.log(err) });
        axios.post('http://localhost:8000/reservations/Reservation', reservationparams).then(resp => { setreservation(resp.data) }).catch((err) => { console.log(err) });

    },[]);
  useEffect(()=>{
      var tpr=0;
      var tpd=0;



    if(id.class === "First class"){
        setbaggageAllowance(flight.firstSeatsLuggage);
        tpr=id.adultsNumber*flight.firstSeatsPrice+id.childrenNumber*0.7*flight.firstSeatsPrice;
        settpr(tpr);
       
      }
       else if(id.class === "Economy class"){
        setbaggageAllowance(flight.economySeatsLuggage);
        tpr=id.adultsNumber*flight.economySeatsPrice+id.childrenNumber*0.7*flight.economySeatsPrice;
        settpr(tpr);
       }   
       else if(id.class === "Business class"){
        setbaggageAllowance(flight.businessSeatsLuggage);
        tpr=id.adultsNumber*flight.businessSeatsPrice+id.childrenNumber*0.7*flight.businessSeatsPrice;
        settpr(tpr);
    }


    setnewres({ ...newres, totalPrice: tpr });



     if(reservation.classChoosen === "First class"){
        setba(notDesiredFlight.firstSeatsLuggage);
        tpd=reservation.adultsNumber*notDesiredFlight.firstSeatsPrice+reservation.childrenNumber*0.7*notDesiredFlight.firstSeatsPrice;
        settp(tpd);
      }
       else if(reservation.classChoosen === "Economy class"){
        setba(notDesiredFlight.economySeatsLuggage);
        tpd=reservation.adultsNumber*notDesiredFlight.economySeatsPrice+reservation.childrenNumber*0.7*notDesiredFlight.economySeatsPrice;
        settp(tpd);
       }   
       else if(reservation.classChoosen === "Business class"){
        setba(notDesiredFlight.businessSeatsLuggage);
        tpd=reservation.adultsNumber*notDesiredFlight.businessSeatsPrice+reservation.childrenNumber*0.7*notDesiredFlight.businessSeatsPrice;
        settp(tpd);
    }


    // var x = { flight: params.params._idr, user: params.params.user_id, adultsNumber: params.params.adnor, childrenNumber: params.params.chnor, totalPrice: tpr, classChoosen: id.class, seatsChoosen:params.params.seatsr}
    var y = { flight: params.params.flight_id, user: params.params.user_id, adultsNumber: params.params.adultsNumber, childrenNumber: params.params.childrenNumber, totalPrice: tp, classChoosen: params.params.class, seatsChoosen:params.params.seats}
    setReservationDep(y)
    // setReservationRet(x)

    if(price <= 0)
    {
      
      setPaid(true);
      if(price<0){
        setMessage("An amount of "+price *-1 +" will be added to your account")
      }
    }

    if(price > 0)
    {
      setPaid(null)
    }



  },[flight,reservation,notDesiredFlight,price]);

    return (
        <div>
             <Header /> <br/>
   
           
             <br/>

             {message && <Alert style={{backgroundColor: 'rgb(206, 237, 214,0.3)'}} severity="success"><strong> {message}</strong></Alert>}
             {error && <Alert style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error"><strong> {error}</strong></Alert>}
         <span style ={{fontWeight: '900' , fontSize: 70 , color: 'white', fontFamily: 'ui-sans-serif'}}>Flight Summary</span>

             <Grid celled columns={3}>
                 <Grid.Row >
                     <Grid.Column>
                     <Card style={{ width: '49rem' , margin: 20 , backgroundColor: 'rgba(255, 255, 255, 0.9)' }} borderRadius={50}> 
                      
                      <Card.Header borderRadius={50} style = {{fontSize : 22 ,color: 'white' ,fontWeight : "bold" , backgroundColor : 'rgb(112,201,225,255)'}}>
                          <Row>
                              <Col>
                                  <SiLotpolishairlines fill="white"/>
                                 
                                  <sapn style = {{fontSize : 18 ,color: 'white' ,fontWeight : "bold" , backgroundColor : 'rgb(112,201,225,255)'}}>  <i class="fa fa-cloud"/>GUC AIRLINES</sapn>
                              </Col>
                              <Col>
                              </Col>
                              <Col>
                                  <span style ={{fontWeight: '900' , fontSize: 18 , color: 'white'}}> OLD FLIGHT</span>
                              </Col>
                          </Row>
                          </Card.Header> 
  
                        <Card.Body> 
                          
                          
                          <Card.Text>
                              
                              <Grid celled columns={3}>
  
                              <Grid.Row>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FLIGHT NUMBER </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{notDesiredFlight.flightNumber}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FROM </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{notDesiredFlight.from.toUpperCase()}</span>
                                </Grid.Column>
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TO </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{notDesiredFlight.to.toUpperCase()}</span>
                                </Grid.Column>
                                <Grid.Column/>
                                <Grid.Column/>
                                <GridColumn />
                                <Grid.Column/>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>AIRPORT </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{notDesiredFlight.airport.toUpperCase()}</span>
                                </Grid.Column>
                                </Grid.Row>
  
                                <Grid.Row />
  
                                <Grid.Row>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE DATE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{notDesiredFlight.departureDate.substring(0,10)}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE TIME </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{notDesiredFlight.departureTime}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL DATE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{notDesiredFlight.arrivalDate.substring(0,10)}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL TIME </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{notDesiredFlight.arrivalTime}</span>
                                </Grid.Column>
                              </Grid.Row>
  
                              <Grid.Row />
  
                              <Grid.Row>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DURATION </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{duration}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TERMINAL </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{notDesiredFlight.terminal}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CLASS CHOSEN</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.classChoosen} </span>
                                </Grid.Column>   
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TOTAL PRICE</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{tp} €</span>
                                </Grid.Column>
                              </Grid.Row>
  
                              <Grid.Row/>
  
                              <Grid.Row>
                              <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHOSEN SEATS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.seatsChoosen} </span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>LUGGAGE ALLOWANCE</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{ba} KG</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ADULTS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.adultsNumber}</span>
                                </Grid.Column>   
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHILDREN</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{reservation.childrenNumber}</span>
                                </Grid.Column>
                              </Grid.Row>
                          
  
                               </Grid>
                            
                          
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer borderRadius={50} class="d-flex" style ={{ backgroundColor : 'rgb(112,201,225,255)' , fontSize: 17 , fontWeight: 'bold' }}> </Card.Footer>
                     
                      </Card> 
                     </Grid.Column>

                     <Grid.Column>
                     <Card style={{ width: '49rem' , margin: 20 , backgroundColor: 'rgba(255, 255, 255, 0.9)' }} borderRadius={50}> 
                      
                      <Card.Header borderRadius={50} style = {{fontSize : 22 ,color: 'white' ,fontWeight : "bold" , backgroundColor : 'rgb(112,201,225,255)'}}>
                          <Row>
                              <Col>
                                  <SiLotpolishairlines fill="white"/>
                                 
                                  <sapn style = {{fontSize : 18 ,color: 'white' ,fontWeight : "bold" , backgroundColor : 'rgb(112,201,225,255)'}}>  <i class="fa fa-cloud"/>GUC AIRLINES</sapn>
                              </Col>
                              <Col>
                              </Col>
                              <Col>
                                  <span style ={{fontWeight: '900' , fontSize: 18 , color: 'white'}}>NEW FLIGHT</span>
                              </Col>
                          </Row>
                          </Card.Header> 
  
                        <Card.Body> 
                          
                          
                          <Card.Text>
                              
                              <Grid celled columns={3}>
  
                              <Grid.Row>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FLIGHT NUMBER </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.flightNumber}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FROM </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.from.toUpperCase()}</span>
                                </Grid.Column>
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TO </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.to.toUpperCase()}</span>
                                </Grid.Column>
                                <Grid.Column/>
                                <Grid.Column/>
                                <GridColumn />
                                <Grid.Column/>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>AIRPORT </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.airport.toUpperCase()}</span>
                                </Grid.Column>
                                </Grid.Row>
  
                                <Grid.Row />
  
                                <Grid.Row>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE DATE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.departureDate.substring(0,10)}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE TIME </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.departureTime}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL DATE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.arrivalDate.substring(0,10)}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL TIME </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.arrivalTime}</span>
                                </Grid.Column>
                              </Grid.Row>
  
                              <Grid.Row />
  
                              <Grid.Row>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DURATION </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{duration}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TERMINAL </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.terminal}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CLASS CHOSEN</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{id.class} </span>
                                </Grid.Column>   
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TOTAL PRICE</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{tpr} €</span>
                                </Grid.Column>
                              </Grid.Row>
  
                              <Grid.Row/>
  
                              <Grid.Row>
                              <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHOSEN SEATS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{id.seats} </span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>LUGGAGE ALLOWANCE</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{baggageAllowance} KG</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ADULTS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{id.adultsNumber}</span>
                                </Grid.Column>   
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHILDREN</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{id.childrenNumber}</span>
                                </Grid.Column>
                              </Grid.Row>
                          
  
                               </Grid>
                            
                          
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer borderRadius={50} class="d-flex" style ={{ backgroundColor : 'rgb(112,201,225,255)' , fontSize: 17 , fontWeight: 'bold' }}> </Card.Footer>
                     
                      </Card> 
                     </Grid.Column>
                 </Grid.Row>
             </Grid>
            
             {!paid && <StripeCheckout
                 token = {makePayment} stripeKey = "pk_test_51K8nZ9FLxiaGszrrQWO11iQy3j9cuGK3xVXOSVMAwXRbHdyLQt10Vf2yAtxLTmoBGFIPixoICDL4pzaaUTa2VLCc00aBg7HGTg"  currency = 'eur'amount = {100 * price} name = "Pay for the Flight">
               <Button type='submit'variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(160, 208, 226)'}}  >Your Total is {price} </Button>
               </StripeCheckout> }
             {paid &&  <Button type='submit' onClick={HandleSubmit} variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(160, 208, 226)'}}>Confirm</Button>}
             <br />
             <Button type='submit' onClick={cancel} variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(220, 0, 0)'}}>cancel</Button>

        </div>
    )
}
export default Changesumm
