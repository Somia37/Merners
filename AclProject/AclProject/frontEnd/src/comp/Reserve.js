import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Header from'./Header'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Reserve() {
    const id=useParams();
    const options = [];
    const params = { "params": id };
    const [flight, setflight] = useState({ flightNumber: "", departureTime: "", arrivalTime: "", departureDate: "", arrivalDate: "",terminal:"", firstSeatsAvailable: "", firstSeatsLuggage: "", firstSeatsPrice: "", economySeatsAvailable: "", economySeatsLuggage: "", economySeatsPrice: "", businessSeatsAvailable: "", businessSeatsLuggage: "", businessSeatsPrice: "", airport: "", from: "", to: ""});
    const [firstClass, setClass] = useState({ key: ""})
    const [numberOfSeats, setNumberOfSeats] = useState({ key: ""})
    var flag = false;
    const [maxValue, setmaxval]=useState("Max: ");

    

    if(flight.firstSeatsAvailable > 0)
        options.push("First class");
    if(flight.economySeatsAvailable > 0)
        options.push("Economy class");
    if(flight.businessSeatsAvailable > 0)
        options.push("Business class");

    const HandleSubmit = (e) => {
        if(firstClass.key === "First class"){
            if(numberOfSeats.key <= flight.firstSeatsAvailable && numberOfSeats.key !== 0){
                alert("http://localhost:3000/chooseSeats/"+params.params._id+"/"+firstClass.key+"/"+numberOfSeats.key);
                window.location.href = "http://localhost:3000/chooseSeats/"+params.params._id+"/"+firstClass.key+"/"+numberOfSeats.key;
            }
            else if(numberOfSeats.key == 0)
                alert("Zero is a small number!");
            else if(numberOfSeats.key > flight.firstSeatsAvailable)
                alert("This is too much!");
        }
        else if(firstClass.key === "Economy class" && numberOfSeats.key !== 0){
                if(numberOfSeats.key <= flight.economySeatsAvailable){
                    alert("http://localhost:3000/chooseSeats/"+params.params._id+"/"+firstClass.key+"/"+numberOfSeats.key);
                    window.location.href = "http://localhost:3000/chooseSeats/"+params.params._id+"/"+firstClass.key+"/"+numberOfSeats.key;
                }
                else if(numberOfSeats.key == 0)
                    alert("Zero is a small number!");
                else if(numberOfSeats.key > flight.economySeatsAvailable)
                    alert("This is too much!");
            }
        else if(firstClass.key === "Business class" && numberOfSeats.key !== 0){
                if(numberOfSeats.key <= flight.businessSeatsAvailable){
                    alert("http://localhost:3000/chooseSeats/"+params.params._id+"/"+firstClass.key+"/"+numberOfSeats.key);
                    window.location.href = "http://localhost:3000/chooseSeats/"+params.params._id+"/"+firstClass.key+"/"+numberOfSeats.key;
                }
                else if(numberOfSeats.key == 0)
                    alert("Zero is a small number!");
                else if(numberOfSeats.key > flight.businessSeatsAvailable)
                    alert("This is too much!");
        }
        else{
            alert("Choose a class.");
        }
        e.preventDefault();
    }

    useEffect(() => {
        axios.get('http://localhost:8000/flights/flight', params).then(resp => { setflight(resp.data) }).catch((err) => { console.log(err) });
        
    },[]);
   

    return (
        <div>
             <Header /> <br/><br/>
            <form onSubmit={(e) => {
                HandleSubmit(e);

            }}>

                <Dropdown options={options} placeholder="Select a class" onChange={(e) => { setClass({key: e.value }); 
                    if(e.value === "First class") setmaxval("Max: "+flight.firstSeatsAvailable);
                    else if(e.value === "Economy class") setmaxval("Max: "+flight.economySeatsAvailable);
                    else if(e.value === "Business class") setmaxval("Max: "+flight.businessSeatsAvailable);
                    console.log(maxValue); }}></Dropdown><br/> 

                <h4>How many seats to reserve?</h4><br/>
                <input type="number" min = "0" value={numberOfSeats.key} onChange={(e) => { setNumberOfSeats({key: e.target.value }) }} placeholder={maxValue} required></input><br/><br/><br/>
                 
                <input type="submit" value="Proceed to choose seats"></input>

            </form>

        </div>
    )
}

export default Reserve;