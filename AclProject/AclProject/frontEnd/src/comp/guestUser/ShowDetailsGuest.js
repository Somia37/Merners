import axios from 'axios'
import { useState, useEffect ,React} from 'react'
import {useParams} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import {Grid, GridColumn} from 'semantic-ui-react';
import {Button,Paper} from '@material-ui/core';
import { Card , Container , Row , Col} from "react-bootstrap";
import {SiLotpolishairlines} from 'react-icons/si';
import Alert from '@mui/material/Alert';
import HeaderGuest from './HeaderGuest';


function ShowDetailsGuest() {
    const id=useParams();
    const options = [];
    const params = { "params": id };
    const [flight, setflight] = useState({ flightNumber: "", departureTime: "", arrivalTime: "", departureDate: "", arrivalDate: "",terminal:"", firstSeatsAvailable: "", firstSeatsLuggage: "", firstSeatsPrice: "", economySeatsAvailable: "", economySeatsLuggage: "", economySeatsPrice: "", businessSeatsAvailable: "", businessSeatsLuggage: "", businessSeatsPrice: "", airport: "", from: "", to: "", firstSeatsAvailablePositions: [], economySeatsAvailablePositions: [], businessSeatsAvailablePositions: []});
    const [Class, setClass] = useState({ key: ""})
    var [children, setchild] = useState(0)
    var [adults, setadults] = useState(0)
    const [error,setError] = useState(null); 

    if(error !== null)
    {
        setTimeout(() => {
            setError(null);
          }, 2000);
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
    const d=((arrivalHour*60+arrivalMin)-(departureHour*60+departureMin)+((arrivalDay-departureDay)*24*60))+((arrivalMon-departureMon)*30*24*60)+((arrivalYear-departureYear)*12*30*24*60);
    const hours = Math.floor(d / 60);
    const minutes = d % 60;
    const duration= hours+" hours and "+minutes+ " minutes";
    if(flight.firstSeatsAvailable > 0)
        options.push("First class");
    if(flight.economySeatsAvailable > 0)
        options.push("Economy class");
    if(flight.businessSeatsAvailable > 0)
        options.push("Business class");

    const HandleSubmit = (e) => {
        var tnop=Number(adults)+Number(children);
        if(Class.key === ""){
            e.preventDefault();
            setError("Select a class.");
        }
        else if(tnop===0){
            e.preventDefault();
            setError("number of seats needed can not be 0");
        }
        
        else{
            
            e.preventDefault();
            if(Class.key === "First class"){
                if(tnop>flight.firstSeatsAvailable){
                    setError("number of seats needed can not be bigger than number of available seats");
                }
                else{
           
                    window.location.href = "http://localhost:3000/chooseSeatsGuest/"+params.params._id+"/"+Class.key+"/"+adults+"/"+children+"/"+tnop;
                }
                
              }
               else if(Class.key === "Economy class"){
                if(tnop>flight.economySeatsAvailable){
                    setError("number of seats needed can not be bigger than number of available seats");
                }
                else{
           
                    window.location.href = "http://localhost:3000/chooseSeatsGuest/"+params.params._id+"/"+Class.key+"/"+adults+"/"+children+"/"+tnop;
                }
            
               }   
               else if(Class.key === "Business class"){
                if(tnop>flight.businessSeatsAvailable){
                    setError("number of seats needed can not be bigger than number of available seats");
                }
                else{
                    localStorage.setItem("depFlight", JSON.stringify(flight));
                    window.location.href = "http://localhost:3000/chooseSeatsGuest/"+params.params._id+"/"+Class.key+"/"+adults+"/"+children+"/"+tnop;
                }
            }
            }
    }

    useEffect(() => {
        console.log(params);
        axios.get('http://localhost:8000/flights/flight', params).then(resp => { setflight(resp.data) }).catch((err) => { console.log(err) });
        // alert(flight.firstSeatsAvailablePositions.length)
    },[]);

    return (
        
        <div>
            <HeaderGuest />
            <br/> <br/>
             <span style ={{fontWeight: '900' , fontSize: 70 , color: 'white', fontFamily: 'ui-sans-serif'}}>Departure Flight Details</span>
             {error && <Alert style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error"><strong> {error}</strong></Alert>}
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
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FIRST LUGGAGE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.firstSeatsLuggage} KG</span>
                                  </Grid.Column>   
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FIRST PRICE</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.firstSeatsPrice} €</span>
                                  </Grid.Column>
                                </Grid.Row>

                                <Grid.Row/>

                                <Grid.Row>
                                <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FIRST SEATS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.firstSeatsAvailable} </span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ECONOMY LUGGAGE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.economySeatsLuggage} KG</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ECONOMY PRICE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.economySeatsPrice} €</span>
                                  </Grid.Column>   
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ECONOMY SEATS</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.economySeatsAvailable} </span>
                                  </Grid.Column>
                                </Grid.Row>
                                
                                <Grid.Row>
                                <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>BUISNESS PRICE</h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.businessSeatsPrice} €</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>BUISNESS LUGGAGE </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.businessSeatsLuggage} KG</span>
                                  </Grid.Column>
                                  <GridColumn />
                                  <Grid.Column>
                                  <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>BUISNESS SEATS </h3> <span style = {{fontSize : 18 , fontWeight: 500}}>{flight.businessSeatsAvailable}</span>
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
                        <Paper elevation={10} style={{padding :20,height:'25vh',width:500, margin:"20px auto" , backgroundColor:'rgb(255, 255, 255,0.7)'}}>
                        <h3 > Adult:</h3>
                          <input type="number" min = "0" id="AdultsNumber" name="AdultsNumber" value={adults} onChange={(e) => { setadults(e.target.value) }} ></input><br /><br></br>

                            <h3> Children: </h3>
                          <input type="number" min = "0" id="ChildrenNumber" name="ChildrenNumber" value={children} onChange={(e) => { setchild(e.target.value) }} ></input><br /><br></br>
                         
                
                <Dropdown options={options} placeholder="Select a class" onChange={(e) => { setClass({key: e.value }); }}></Dropdown><br/> 
                </Paper>
                <Button type='submit' variant="contained" style={{margin:'6px 0' , backgroundColor:'rgb(160, 208, 226)'}}>Proceed to choosing seats</Button>   
               
            </form>
        </div>
    )
}

export default ShowDetailsGuest;