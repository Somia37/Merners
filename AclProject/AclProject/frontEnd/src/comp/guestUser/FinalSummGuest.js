import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import HeaderGuest from'./HeaderGuest'
import { Card , Container , Row , Col} from "react-bootstrap";
import {Grid, GridColumn} from 'semantic-ui-react';
import {Button,Paper} from '@material-ui/core';
import {SiLotpolishairlines} from 'react-icons/si';
import Alert from '@mui/material/Alert';

function FinalSummGuest() {
    const id=useParams();
  
    const params = { "params": id };
    const [flightr, setflightr] = useState({ flightNumber: "", departureTime: "", arrivalTime: "", departureDate: "", arrivalDate: "",terminal:"", firstSeatsAvailable: "", firstSeatsLuggage: "", firstSeatsPrice: "", economySeatsAvailable: "", economySeatsLuggage: "", economySeatsPrice: "", businessSeatsAvailable: "", businessSeatsLuggage: "", businessSeatsPrice: "", airport: "", from: "", to: ""});
    const [tpr, settpr] = useState(0);
    const [bar, setbar] = useState("");
    const [paid ,setPaid] = useState(null);

    const idddr = {"params":{"_id":params.params._idr}};
    const axiosparams = {"params":{"_id":params.params._id, "class":params.params.class, "seats":params.params.seats}};
    const axiosparamsreturn = {"params":{"_id":params.params._idr, "class":params.params.classr, "seats":params.params.seatsr}};
    const arrivalYearr = Number(flightr.arrivalDate.substring(0,4));
    const departureYearr = Number(flightr.departureDate.substring(0,4));
    const arrivalMonr = Number(flightr.arrivalDate.substring(5,7));
    const departureMonr = Number(flightr.departureDate.substring(5,7));
    const arrivalDayr = Number(flightr.arrivalDate.substring(8,10));
    const departureDayr = Number(flightr.departureDate.substring(8,10));
    const arrivalHourr = Number(flightr.arrivalTime.substring(0,2));
    const departureHourr = Number(flightr.departureTime.substring(0,2));
    const arrivalMinr = Number(flightr.arrivalTime.substring(3));
    const departureMinr = Number(flightr.departureTime.substring(3));
    const dr=((arrivalHourr*60+arrivalMinr)-(departureHourr*60+departureMinr)+((arrivalDayr-departureDayr)*24*60))+((arrivalMonr-departureMonr)*30*24*60)+((arrivalYearr-departureYearr)*12*30*24*60);
    const hoursr = Math.floor(dr / 60);
    const minutesr = dr % 60;
    const durationr= hoursr+" hours and "+minutesr+ " minutes";
    
    const [depRes, setReservationDep] = useState();
    const [retRes, setReservationRet] =useState();


    const [flight, setflight] = useState({ flightNumber: "", departureTime: "", arrivalTime: "", departureDate: "", arrivalDate: "",terminal:"", firstSeatsAvailable: "", firstSeatsLuggage: "", firstSeatsPrice: "", economySeatsAvailable: "", economySeatsLuggage: "", economySeatsPrice: "", businessSeatsAvailable: "", businessSeatsLuggage: "", businessSeatsPrice: "", airport: "", from: "", to: ""});
    const [tp, settp] = useState(0);
    const [ba, setba] = useState("");
    const dFlight = JSON.parse(localStorage.getItem('depFlight'));
    const rFlight = JSON.parse(localStorage.getItem('reFlight'));
    const iddd = {"params":{"_id":params.params._id}}; 
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
    const price = tp + tpr ;

    const [error,setError] = useState(null);
    const [message,setMessage] = useState(null);

   
    const  Login = () => 
    {
             
        const data = params.params._id+"/"+params.params.class+"/"+params.params.seats+"/"+params.params.totalseats+"/"+params.params.adnod+"/"+params.params.chnod+"/"+params.params.tnopd+"/"+params.params._idr+"/"+params.params.classr+"/"+params.params.seatsr+"/"+params.params.totalseatsr+"/"+params.params.adnor+"/"+params.params.chnor+"/"+params.params.tnopr+"/";
        localStorage.setItem("URL", JSON.stringify(data));

        window.location.href = "http://localhost:3000";  
    }

    useEffect(() => {
      console.log(params);
 
      axios.get('http://localhost:8000/flights/flight', idddr).then(resp => { setflightr(resp.data) }).catch((err) => { console.log(err) });
      axios.get('http://localhost:8000/flights/flight', iddd).then(resp => { setflight(resp.data) }).catch((err) => { console.log(err) });
     
  },[]);
  useEffect(()=>{
    var tpr=0;
    var tpd=0;
    
  if(params.params.classr === "First class"){
      setbar(flightr.firstSeatsLuggage);
      tpr=params.params.adnor*flightr.firstSeatsPrice+params.params.chnor*0.7*flightr.firstSeatsPrice;
      settpr(tpr);
     
    }
     else if(params.params.classr === "Economy class"){
      setbar(flightr.economySeatsLuggage);
      tpr=params.params.adnor*flightr.economySeatsPrice+params.params.chnor*0.7*flightr.economySeatsPrice;
      settpr(tpr);
     }   
     else if(params.params.classr === "Business class"){
      setbar(flightr.businessSeatsLuggage);
      tpr=params.params.adnor*flightr.businessSeatsPrice+params.params.chnor*0.7*flightr.businessSeatsPrice;
      settpr(tpr);
  }






   if(params.params.class === "First class"){
      setba(flight.firstSeatsLuggage);
      tpd=params.params.adnod*flight.firstSeatsPrice+params.params.chnod*0.7*flight.firstSeatsPrice;
      settp(tpd);
    }
     else if(params.params.class === "Economy class"){
      setba(flight.economySeatsLuggage);
      tpd=params.params.adnod*flight.economySeatsPrice+params.params.chnod*0.7*flight.economySeatsPrice;
      settp(tpd);
     }   
     else if(params.params.class === "Business class"){
      setba(flight.businessSeatsLuggage);
      tpd=params.params.adnod*flight.businessSeatsPrice+params.params.chnod*0.7*flight.businessSeatsPrice;
      settp(tpd);
  }
  var x = { flight: params.params._idr, user: params.params.user_id, adultsNumber: params.params.adnor, childrenNumber: params.params.chnor, totalPrice: tpr, classChoosen: params.params.classr, seatsChoosen:params.params.seatsr}
  var y = { flight: params.params._id, user: params.params.user_id, adultsNumber: params.params.adnod, childrenNumber: params.params.chnod, totalPrice: tpd, classChoosen: params.params.class, seatsChoosen:params.params.seats}
  setReservationDep(y)
  setReservationRet(x)


},[flight,flightr]);

    return (
        <div>
             <HeaderGuest />
             <br/>
             {message && <Alert style={{backgroundColor: 'rgb(206, 237, 214,0.3)'}} severity="success"><strong> {message}</strong></Alert>}

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
                                  <span style ={{fontWeight: '900' , fontSize: 18 , color: 'white'}}> RETURNING FLIGHT</span>
                              </Col>
                          </Row>
                          </Card.Header> 
  
                        <Card.Body> 
                          
                          
                          <Card.Text>
                              
                              <Grid celled columns={3}>
  
                              <Grid.Row>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FLIGHT NUMBER </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flightr.flightNumber}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FROM </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flightr.from.toUpperCase()}</span>
                                </Grid.Column>
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column/>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TO </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flightr.to.toUpperCase()}</span>
                                </Grid.Column>
                                <Grid.Column/>
                                <Grid.Column/>
                                <GridColumn />
                                <Grid.Column/>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>AIRPORT </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flightr.airport.toUpperCase()}</span>
                                </Grid.Column>
                                </Grid.Row>
  
                                <Grid.Row />
  
                                <Grid.Row>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE DATE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flightr.departureDate.substring(0,10)}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE TIME </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flightr.departureTime}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL DATE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flightr.arrivalDate.substring(0,10)}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL TIME </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flightr.arrivalTime}</span>
                                </Grid.Column>
                              </Grid.Row>
  
                              <Grid.Row />
  
                              <Grid.Row>
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DURATION </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{durationr}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TERMINAL </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flightr.terminal}</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CLASS CHOSEN</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.classr} </span>
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
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHOSEN SEATS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.seatsr} </span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>LUGGAGE ALLOWANCE</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{bar} KG</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ADULTS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.adnor}</span>
                                </Grid.Column>   
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column> 
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHILDREN</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.chnor} </span>
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
                                  <span style ={{fontWeight: '900' , fontSize: 18 , color: 'white'}}>DEPARTING FLIGHT</span>
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
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CLASS CHOSEN</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.class} </span>
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
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHOSEN SEATS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.seats} </span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>LUGGAGE ALLOWANCE</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{ba} KG</span>
                                </Grid.Column>
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ADULTS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.adnod}</span>
                                </Grid.Column>   
                                <GridColumn />
                                <GridColumn />
                                <Grid.Column>
                                <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHILDREN</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.chnod}</span>
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
             <Button type='submit' onClick={Login} variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(220, 0, 0)'}}>You Have To Login First</Button>

        </div>
    )
}
export default FinalSummGuest
