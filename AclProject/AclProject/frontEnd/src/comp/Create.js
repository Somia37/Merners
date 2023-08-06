import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import NavbarAdmin from'./NavbarAdmin'
import {useParams} from 'react-router-dom'
import {Grid, GridColumn} from 'semantic-ui-react';
import {Button} from '@material-ui/core';
import { Card , Container , Row , Col} from "react-bootstrap";
import {SiLotpolishairlines} from 'react-icons/si';
import Alert from '@mui/material/Alert';

function Create() {
    const [flight, setflight] = useState({ flightNumber: "", departureTime: "", arrivalTime: "", departureDate: "", arrivalDate: "",terminal:"1", firstSeatsAvailable: "9", firstSeatsLuggage: "30", firstSeatsPrice: "1000", economySeatsAvailable: "11", economySeatsLuggage: "25", economySeatsPrice: "250", businessSeatsAvailable: "10", businessSeatsLuggage: "35", businessSeatsPrice: "750", airport: "1", from: "", to: ""});
    const id=useParams();
    const [error,setError] = useState(null)
    const [message,setMessage] = useState(null)

    const params = { "params": id };

    if(error !== null)
    {
        setTimeout(() => {
            setError(null);
          }, 3000);
    }
    if(message !== null)
    {
        setTimeout(() => {
            setMessage(null);
          }, 3000);
    }

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
    const duration=((arrivalHour*60+arrivalMin)-(departureHour*60+departureMin)+((arrivalDay-departureDay)*24*60))+((arrivalMon-departureMon)*30*24*60)+((arrivalYear-departureYear)*12*30*24*60);
    
    const  cancel = () => {
        if(window.confirm("Are you sure? ")){
            
            window.location.href = "http://localhost:3000/home/"+params.params.user_id;  
        }  
    }

    const HandleSubmit = (e) => {
        if(duration <= 0) {
            alert("The flight cannot arrive before departing.")
            e.preventDefault();
        }
        else{
            
            Axios.post('http://localhost:8000/flights/create', flight).then(() => {
               setMessage("Flight is added successfully")
            }).catch((err) => {setError('An error occured while creating the flight, Please make sure that you fill in all fields')});
        }
    }

    return (
        <div>
        <NavbarAdmin />
        <span style ={{fontWeight: '900' , fontSize: 70 , color: 'white', fontFamily: 'ui-sans-serif'}}>Create New Flight</span>
        {error && <Alert style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error"><strong> {error}</strong> </Alert>}
        {message && <Alert severity="success" style={{backgroundColor: 'rgb(206, 237, 214,0.5)'}}><strong> {message}</strong> </Alert> } 
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
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FLIGHT NUMBER </h3>  <input type="text" id="flightNumber" name="flightNumber" style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} value={flight.flightNumber} onChange={(e) => { setflight({ ...flight, flightNumber: e.target.value }) }} required/>
                              </Grid.Column>
                              <Grid.Column/>
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FROM </h3>  <input type="text" id="from" name="from" style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} value={flight.from} onChange={(e) => { setflight({ ...flight, from: e.target.value }) }} required/>
                              </Grid.Column>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TO </h3> <input  type="text" id="to" name="to" style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} defaultValue={flight.to} onChange={(e) => { setflight({ ...flight, to: e.target.value }) }} required/>
                              </Grid.Column>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>AIRPORT </h3>  <input type="text" id="airport" name="airport" style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} value={flight.airport} onChange={(e) => { setflight({ ...flight, airport: e.target.value }) }} required/>
                              </Grid.Column>
                              </Grid.Row>

                              <Grid.Row />

                              <Grid.Row>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE DATE </h3> <input  style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="date" id="DepDt" name="DepDt" value={flight.departureDate.substring(0,10)} onChange={(e) => { setflight({ ...flight, departureDate: e.target.value }) }} required/>
                              </Grid.Column>
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE TIME </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="time" id="DepTime" name="DepTime" value={flight.departureTime} onChange={(e) => { setflight({ ...flight, departureTime: e.target.value }) }} required/>
                              </Grid.Column>
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL DATE </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}}  type="date" id="ArvDt" name="ArvDt" value={flight.arrivalDate.substring(0,10)} onChange={(e) => { setflight({ ...flight, arrivalDate: e.target.value }) }} required/>
                              </Grid.Column>
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL TIME </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="time" id="ArvTime" name="ArvTime" value={flight.arrivalTime} onChange={(e) => { setflight({ ...flight, arrivalTime: e.target.value }) }} required/>

                              </Grid.Column>
                            </Grid.Row>

                            <Grid.Row />

                            <Grid.Row>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TERMINAL </h3>  <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="number" id="terminal" name="terminal" value={flight.terminal} onChange={(e) => { setflight({ ...flight, terminal: e.target.value }) }} required/>
                              </Grid.Column>
                              <GridColumn />
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FIRST LUGGAGE </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="number" min = "0" id="firstSeatsLuggage" name="firstSeatsLuggage" value={flight.firstSeatsLuggage } onChange={(e) => { setflight({ ...flight, firstSeatsLuggage: e.target.value }) }} required></input>
                              </Grid.Column>   
                              <GridColumn />
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FIRST PRICE</h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="number" min = "0" id="firstSeatsPrice" name="firstSeatsPrice" value={flight.firstSeatsPrice} onChange={(e) => { setflight({ ...flight, firstSeatsPrice: e.target.value }) }} required/>
                              </Grid.Column>
                              <Grid.Column />
                              <Grid.Column />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FIRST SEATS</h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} min = "0" type="number" id="firstSeatsAvailable" name="firstSeatsAvailable" value={flight.firstSeatsAvailable} onChange={(e) => { setflight({ ...flight, firstSeatsAvailable: e.target.value }) }} required/>
                              </Grid.Column>
                            </Grid.Row>

                            <Grid.Row/>

                            <Grid.Row>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ECONOMY LUGGAGE </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="number" min = "0" id="economySeatsLuggage" name="economySeatsLuggage" value={flight.economySeatsLuggage} onChange={(e) => { setflight({ ...flight, economySeatsLuggage: e.target.value }) }} required/>
                              </Grid.Column>
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ECONOMY PRICE </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="number" min = "0" id="economySeatsPrice" name="economySeatsPrice" value={flight.economySeatsPrice} onChange={(e) => { setflight({ ...flight, economySeatsPrice: e.target.value }) }} required/>
                              </Grid.Column>   
                              <GridColumn />
                              <Grid.Column />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ECONOMY SEATS</h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} min="0" type="number" id="EcoSeats" name="EcoSeats" value={flight.economySeatsAvailable} onChange={(e) => { setflight({ ...flight, economySeatsAvailable: e.target.value }) }} required/>
                              </Grid.Column>
                              <Grid.Column />
                              <Grid.Column />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>BUISNESS PRICE</h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="number" min = "0" id="businessSeatsPrice" name="businessSeatsPrice" value={flight.businessSeatsPrice} onChange={(e) => { setflight({ ...flight, businessSeatsPrice: e.target.value }) }} required/>
                              </Grid.Column>
                            </Grid.Row>
                            
                             <Grid.Row/>

                            <Grid.Row>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>BUISNESS LUGGAGE </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="number" min = "0" id="businessSeatsLuggage" name="businessSeatsLuggage" value={flight.businessSeatsLuggage} onChange={(e) => { setflight({ ...flight, businessSeatsLuggage: e.target.value }) }} required/>
                              </Grid.Column>
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>BUISNESS SEATS </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '120px'}} type="number" min = "0" id="businessSeatsAvailable" name="businessSeatsAvailable" value={flight.businessSeatsAvailable} onChange={(e) => { setflight({ ...flight, businessSeatsAvailable: e.target.value }) }} required/>
                              </Grid.Column>   
                              <Grid.Column/> 
                              <Grid.Column/> 
                              <Grid.Column/> 
                              <Grid.Column/> 
                              <Grid.Column/> 
                              <Grid.Column/> 
                            </Grid.Row>

                            <Grid.Row>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column>
                              <Button type='submit' variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(220, 0, 0 , 0.7)'}} onClick={cancel} >Cancel</Button>
                             </Grid.Column>
                              <Grid.Column >
                              <Button type='submit' variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(160, 208, 226)'}}  onClick={HandleSubmit}>Create</Button>
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
       
    </div>
    )
}

export default Create