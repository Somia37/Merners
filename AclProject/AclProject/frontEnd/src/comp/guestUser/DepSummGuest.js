import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import HeaderGuest from './HeaderGuest'
import 'react-dropdown/style.css';
import { Card , Container , Row , Col} from "react-bootstrap";
import {Grid, GridColumn} from 'semantic-ui-react';
import {Button,Paper} from '@material-ui/core';
import {SiLotpolishairlines} from 'react-icons/si';

function DepSummGuest() {
    const id=useParams();
  
    const params = { "params": id };
    const [flight, setflight] = useState({ flightNumber: "", departureTime: "", arrivalTime: "", departureDate: "", arrivalDate: "",terminal:"", firstSeatsAvailable: "", firstSeatsLuggage: "", firstSeatsPrice: "", economySeatsAvailable: "", economySeatsLuggage: "", economySeatsPrice: "", businessSeatsAvailable: "", businessSeatsLuggage: "", businessSeatsPrice: "", airport: "", from: "", to: ""});
    const [tp, settp] = useState(0);
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
    
    const  HandleSubmit = (e) => {
        e.preventDefault();
        var adultsd=params.params.adnod;
        var childrend=params.params.chnod;
        var tnopd=params.params.tnopd;
        window.location.href = "http://localhost:3000/ReturnFlightGuest/"+params.params._id+"/"+params.params.class+"/"+params.params.seats+"/"+params.params.totalseats+"/"+adultsd+"/"+childrend+"/"+tnopd;
      
    }

    useEffect(() => {
        console.log(params);
   
       // console.log(flight.firstSeatsPrice*(params.params.totalseats));
        axios.get('http://localhost:8000/flights/flight', params).then(resp => { setflight(resp.data) }).catch((err) => { console.log(err) });
       
    },[]);
  useEffect(()=>{
    if(params.params.class === "First class"){
        setba(flight.firstSeatsLuggage);
        settp(flight.firstSeatsPrice*(params.params.adnod)+ flight.firstSeatsPrice*(params.params.chnod)*0.7);
       
      }
       else if(params.params.class === "Economy class"){
        setba(flight.economySeatsLuggage);
        settp(flight.economySeatsPrice*(params.params.adnod) + flight.economySeatsPrice*(params.params.chnod)*0.7);
       }   
       else if(params.params.class === "Business class"){
        setba(flight.businessSeatsLuggage);
        settp(flight.businessSeatsPrice*(params.params.adnod) + flight.businessSeatsPrice*(params.params.chnod)*0.7);
    }

  },[flight]);

    return (
        <div>
          <HeaderGuest />
         <span style ={{fontWeight: '900' , fontSize: 70 , color: 'white', fontFamily: 'ui-sans-serif'}}>Flight Summary</span>
         <form onSubmit={(e) => {HandleSubmit(e);}}>

             <Container>
                        <Row>
                            <Col/>
                            <Col>
                    <Card style={{ width: '50rem' , margin: 20 , backgroundColor: 'rgba(255, 255, 255, 0.9)' }} borderRadius={50}> 
                      
                    <Card.Header borderRadius={50} style = {{fontSize : 22 ,color: 'white' ,fontWeight : "bold" , backgroundColor : 'rgb(112,201,225,255)'}}>
                        <Row>
                            <Col>
                                <SiLotpolishairlines fill="white"/>
                               
                                <sapn style = {{fontSize : 18 ,color: 'white' ,fontWeight : "bold" , backgroundColor : 'rgb(112,201,225,255)'}}>  <i class="fa fa-cloud"/>GUC AIRLINES</sapn>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                                <span style ={{fontWeight: '900' , fontSize: 24 , color: 'white'}}></span>
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
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ADULTS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.adnod} </span>
                              </Grid.Column>   
                              <GridColumn />
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>CHILDREN</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{params.params.chnod} </span>
                              </Grid.Column>
                            </Grid.Row>
                        

                             </Grid>
                          
                        
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer borderRadius={50} class="d-flex" style ={{ backgroundColor : 'rgb(112,201,225,255)' , fontSize: 17 , fontWeight: 'bold' }}> </Card.Footer>
                   
                    </Card> 
                    </Col>
                    <Col/>
                    </Row>
                    </Container>
                   
                    <Button type='submit' variant="contained" style={{margin:'6px 0' , backgroundColor:'rgb(160, 208, 226)'}}>CHOOSE RETURN FLIGHT</Button> 
                    

        </form>
        
    </div>
           )
}
export default DepSummGuest
