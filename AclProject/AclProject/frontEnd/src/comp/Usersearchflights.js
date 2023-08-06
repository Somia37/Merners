
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Header from'./Header'
import {useParams} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import {Button} from '@mui/material';
import {Grid, GridColumn} from 'semantic-ui-react';
import { Card , Container , Row , Col} from "react-bootstrap";
import {SiLotpolishairlines} from 'react-icons/si';

function Usersearchflights() {

    const [flightv, setflightv] = useState([]);
    const [flightq, setflightq] = useState([]);
    var res = [];
    const id=useParams();
    const [error,setError] =useState("");
    
    const params = { "params": id };

    if(error !== null)
    {
        setTimeout(() => {
            setError(null);
          }, 3000);
    }

    const HandleSubmit = (e) => {
        
        const qu=flightq;
        for (const item in qu) {
           if(qu[item]===""){
              delete qu[item];
           }
          }
          console.log(qu)
          console.log("henaaaaaaaaaaaaaaa")
          
        axios.get("http://localhost:8000/flights/get")
        .then((result) => {
            for (var key in qu) {
                if (key === "from" || key === "to" || key === "airport") {
                    for(var i in result.data ){
                        for (var key2 in result.data[i]) {
                            if (key2 === key && qu[key] === result.data[i][key2] ) {
                                res.push(result.data[i]);
                            }
                        }
                    }
                }
                else if (key === "departureDate" || key === "arrivalDate") {
                    for(var i in result.data ){
                        for (var key2 in result.data[i]) {
                            if (key2 === key && qu[key] === (""+result.data[i][key2]).substring(0,10) ) {
                                res.push(result.data[i]);
                            }
                        }
                    }
                }
                else if (key === "firstSeatsAvailable" || key === "economySeatsAvailable" || key === "businessSeatsAvailable" || key === "firstSeatsPrice" || key === "economySeatsPrice" || key === "businessSeatsPrice") {
                    for(var i in result.data ){
                        for (var key2 in result.data[i]) {
                            if (key2 === key && qu[key] <= result.data[i][key2] ) {
                                res.push(result.data[i]);
                            }
                        }
                    }
                }
                result.data = res;
                res = [];
            }

          const data = result.data;
          if(data.length === 0)
            setError("No result found")
          setflightv(data);
        })
        .catch((err)=>{console.log(err)});
       
        
        e.preventDefault();

       
    }
        useEffect(() => {
        },[flightq]);
      
        
            


    return (
        <div>

           <Header />
           <span style ={{fontWeight: '900' , fontSize: 70 , color: 'white', fontFamily: 'ui-sans-serif'}}>Search</span>
           
           {error && <Alert style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error"><strong> {error}</strong> </Alert>}
        <Container>
                        <Row>
                            <Col/>
                            <Col>
                    <Card style={{ width: '43rem' , margin: 20 , backgroundColor: 'rgba(255, 255, 255, 0.9)' }} borderRadius={50}> 
                      
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
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FROM </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="text" id="from" name="from" value={flightq.from} onChange={(e) => {  setflightq({ ...flightq, from: e.target.value }) }} />
                              </Grid.Column>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>TO </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="text" id="to" name="to" value={flightq.to} onChange={(e) => { setflightq({ ...flightq, to: e.target.value }) }} />
                              </Grid.Column>
                              <Grid.Column/>
                              <Grid.Column/>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>AIRPORT </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="text" id="airport" name="airport" value={flightq.airport} onChange={(e) => { setflightq({ ...flightq, airport: e.target.value }) }} />
                              </Grid.Column>
                              </Grid.Row>

                              
                            <Grid.Row />

                            <Grid.Row>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FIRST LUGGAGE </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="number" min = "0" id="firstSeatsLuggage" name="firstSeatsLuggage" value={flightq.firstSeatsLuggage} onChange={(e) => { setflightq({ ...flightq, firstSeatsLuggage: e.target.value }) }} />
                              </Grid.Column>   
                              <GridColumn />
                              <Grid.Column/>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FIRST PRICE</h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="number" min = "0" id="firstSeatsPrice" name="firstSeatsPrice" value={flightq.firstSeatsPrice} onChange={(e) => { setflightq({ ...flightq, firstSeatsPrice: e.target.value }) }} />
                              </Grid.Column>
                              <Grid.Column />
                              <Grid.Column />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>FIRST SEATS</h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="number" min = "0" id="firstSeatsAvailable" name="firstSeatsAvailable" value={flightq.firstSeatsAvailable} onChange={(e) => { setflightq({ ...flightq, firstSeatsAvailable: e.target.value }) }} />
                              </Grid.Column>
                            </Grid.Row>

                            <Grid.Row/>

                            <Grid.Row>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ECONOMY LUGGAGE </h3><input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="number" min = "0" id="economySeatsLuggage" name="economySeatsLuggage" value={flightq.economySeatsLuggage} onChange={(e) => { setflightq({ ...flightq, economySeatsLuggage: e.target.value }) }} /> 
                              </Grid.Column>
                              <GridColumn />
                              <Grid.Column />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ECONOMY PRICE </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="number" min = "0" id="economySeatsPrice" name="economySeatsPrice" value={flightq.economySeatsPrice} onChange={(e) => { setflightq({ ...flightq, economySeatsPrice: e.target.value }) }} />
                              </Grid.Column>   
                              <GridColumn />
                              <Grid.Column />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ECONOMY SEATS</h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="number" min = "0" id="EcoSeats" name="EcoSeats" value={flightq.economySeatsAvailable} onChange={(e) => { setflightq({ ...flightq, economySeatsAvailable: e.target.value }) }} />
                              </Grid.Column>
                            </Grid.Row>

                            <Grid.Row/>

                            <Grid.Row>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>BUISNESS LUGGAGE </h3><input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="number" min = "0" id="businessSeatsLuggage" name="businessSeatsLuggage" value={flightq.businessSeatsLuggage} onChange={(e) => { setflightq({ ...flightq, businessSeatsLuggage: e.target.value }) }} />
                              </Grid.Column>
                              <GridColumn />
                              <GridColumn />
                              <GridColumn>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>BUISNESS PRICE</h3><input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="number" min = "0" id="businessSeatsPrice" name="businessSeatsPrice" value={flightq.businessSeatsPrice} onChange={(e) => { setflightq({ ...flightq, businessSeatsPrice: e.target.value }) }} />
                              </GridColumn> 
                              <GridColumn />    
                              <GridColumn />    
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>BUISNESS SEATS </h3> <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="number" min = "0" id="BussSeats" name="BussSeats" value={flightq.businessSeatsAvailable} onChange={(e) => { setflightq({ ...flightq, businessSeatsAvailable: e.target.value }) }} />
                              </Grid.Column>
                              </Grid.Row>

                              <Grid.Row/>

                              <Grid.Row>
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>DEPARTURE DATE </h3>  <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="date" id="DepDt" name="DepDt" value={flightq.departureDate} onChange={(e) => { setflightq({ ...flightq, departureDate: e.target.value }) }} />
                              </Grid.Column>
                              <GridColumn />
                              <GridColumn />
                              <Button variant="contained" onClick={(e) => {HandleSubmit(e)}} style={{backgroundColor:'#7cc0d8' , width: 150 , height: 50}}startIcon={<SearchIcon style={{fill: "white"}} />}>Search</Button>
                              <GridColumn />
                              <GridColumn />
                              <Grid.Column>
                              <h3 className="mb-2 text-muted" style = {{fontSize : 18 , fontWeight: 500}}>ARRIVAL DATE </h3>  <input style = {{fontSize : 18 , fontWeight: 500 , width: '160px'}} type="date" id="ArvDt" name="ArvDt" value={flightq.arrivalDate} onChange={(e) => { setflightq({ ...flightq, arrivalDate: e.target.value }) }} />
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
            <br></br>

          <div>
          <table className="table" style= {{backgroundColor:'rgb(255,255,255 ,0.7)'}}>
                        <tr>
                            
                            <th>Flight Number</th> 
                            <th>From</th> 
                            <th>To</th> 
                            <th>Airport</th> 
                            <th>Terminal</th>
                            <th>Departure Time</th> 
                            <th>Arrival Time</th> 
                            <th>Departure Date</th> 
                            <th>Arrival Date</th> 
                            <th>First class seats available</th>
                            <th>First class luggage allowance</th>
                            <th>First class price</th>
                            <th>Buisness class seats available</th> 
                            <th>Buisness class luggage allowance</th> 
                            <th>Buisness class price</th> 
                            <th>Economy class seats available</th> 
                            <th>Economy class luggage allowance</th> 
                            <th>Economy class price</th>
                        </tr>
                   
          <tbody>
          {flightv.map((data) =>
         
              <tr>
              <td>{data.flightNumber} </td> 
              <td>{data.from}</td> 
              <td>{data.to}</td> 
              <td>{data.airport}</td> 
              <td>{data.terminal}</td>
              <td>{data.departureTime}</td> 
              <td>{data.arrivalTime}</td> 
              <td>{data.departureDate.substring(0,10)}</td>
              <td>{data.arrivalDate.substring(0,10)}</td>
              <td>{data.firstSeatsAvailable}</td>
              <td>{data.firstSeatsLuggage}</td>
              <td>{data.firstSeatsPrice}</td>
              <td>{data.businessSeatsAvailable}</td>
              <td>{data.businessSeatsLuggage}</td> 
              <td>{data.businessSeatsPrice}</td>
              <td>{data.economySeatsAvailable}</td>
              <td>{data.economySeatsLuggage}</td> 
              <td>{data.economySeatsPrice}</td>
              <td>
                <Link to={`/showDetails/${data._id}`+"/"+params.params.user_id} ><span style= {{fontSize: 14, fontWeight: "bold"}}>Show details</span></Link> {/*| <Link to={`/reserve/${data._id}`} >Reserve</Link>*/}
                
              </td> <td/>
              <td/>
                
       </tr>
       
  
       )
          }     </tbody>
        </table>

  
       </div> 
        </div>
    )
}

export default Usersearchflights
