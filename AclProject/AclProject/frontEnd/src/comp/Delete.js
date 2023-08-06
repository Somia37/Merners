import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

function Delete() {
    const id=useParams();
    
    
    const params = { "params": id };
    useEffect(() => {
        console.log(params)
        if(window.confirm("Are you sure you want to delete this doc?")){
            axios.post('http://localhost:8000/flights/delete', id).then(() => console.log("deleted sucsessfully")).catch((err) => {console.log(err)});
            window.location.href = "http://localhost:3000/home"+"/"+params.params.user_id
        }
        else{
            window.location.href = "http://localhost:3000/Home"+"/"+params.params.user_id
        }
     });
    return (
        <div>
            
        </div>
    )
}

export default Delete
