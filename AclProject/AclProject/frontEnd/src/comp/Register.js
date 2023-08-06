import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core';
import React, { useState } from 'react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {Row , Col} from "react-bootstrap";
import axios from 'axios';
import Loading from "./Loading";
import Alert from '@mui/material/Alert';


const Register=()=>{
    const [username , setUsername] = useState("");
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [homeAddress , setHomeAddress] = useState("");
    const [phoneNumber , setPhoneNumber] = useState("");
    const [passportNumber , setPassportNumber] = useState("");
    const [password , setPassword] = useState("");
    const [confirmpassword , setConfirmPassword] = useState("");
    const [message , setMessage] = useState(null);
    const [error , setError] = useState(false);
    const [loading , setLoading] = useState(false);
    
    const submitHandler = async(e) => {
        e.preventDefault();
        
        var flag = phoneNumber.length !== 11 ;
         if(flag)
            setError('Phone Number Should be 11 charecters');
        else
        if(password !== confirmpassword)
        setError('Passwords do not match');
        else
        {
            setMessage(null)
            try
            {
                const config = {
                    headers: {
                        "Content-type": "application/json"
                    }
                }
                setLoading(true);
                if(firstName.length == 0)
            {
                setError("Fisrt name can not be empty");
                throw new Error() ;
            }

            if(lastName.length == 0)
            {
                setError("Last name can not be empty");
                throw new Error() ;
            }

            if(email.length == 0)
            {
                setError("Email can not be empty");
                throw new Error() ;
            }

            if(homeAddress.length == 0)
            {
                setError("Home address can not be empty");
                throw new Error() ;
            }

            if(phoneNumber.length !== 11)
            {
                setError("Phone number is not correct");
                throw new Error() ;
            }

            if(passportNumber.length == 0)
            {
                setError("Email can not be empty");
                throw new Error() ;
            }

                const { data } = await axios.post(
                    'http://localhost:8000/users/register',
                    {
                       username: username,
                       firstName: firstName,
                       lastName: lastName,
                       email: email,
                       homeAddress: homeAddress,
                       phoneNumber: phoneNumber,
                       passportNumber: passportNumber,
                       password: password
                    },
                    config 
                    );
                    console.log(data);  
                    setLoading(false);
                    if(data === null)
                        setError("Please check all the fields")

                    if(data.username === null)
                        setError("Username already used")
                    
                    if(data.email === null)
                        setError("Email address already used")    

                    if( data !== null && data.email !== null && data.username !== null)
                        window.location = '/'
                }
                catch(error)
                {
                    console.log(error.message)
                    setLoading(false);
                    if(error == null)
                        setError("error occured please check all the fields");
                }

            }


    }


    return(
        <Grid>
              {loading && <Loading />}
            <Paper elevation={10} style={{padding :20,height:'58vh',width:500, margin:"20px auto"}}>
                <Grid align='center'>
                <Avatar style={{backgroundColor:'rgb(160, 208, 226)'}}><AppRegistrationIcon/></Avatar>
                    <h2>Register</h2>
                </Grid>
                {error && <Alert  style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error"><strong> {error}</strong> </Alert> }
             
                <Row>
                    <Col>
                        <TextField label='First Name' type ='text'inputProps={{ minLength: 1}}  onChange= {(e) => {setFirstName(e.target.value);setError(null);setMessage(null);}} required/>
                    </Col>
                    <Col>
                        <TextField label='Last Name' type ='text' inputProps={{ minLength: 1}}  onChange ={(e) => {setLastName(e.target.value);setError(null);setMessage(null);}} required />
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <TextField label='Email'  placeholder='example@email.com' type ='email' onChange = {(e) => {setEmail(e.target.value);setError(null);setMessage(null);}} required/>
                    </Col>
                    <Col>
                        <TextField label='Username' type = 'text' required onChange ={(e) => {setUsername(e.target.value);setError(null);setMessage(null);}} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <TextField label='Home Address'  placeholder='Street, City, Country' type ='text' required onChange = {(e) => {setHomeAddress(e.target.value);setError(null);setMessage(null);}}/>
                    </Col>
                    <Col>
                        <TextField label='Phone Number' placeholder='01xxxxxxxxx' inputProps={{ maxLength: 11 , maxLength : 11}} required onChange = {(e) => {setPhoneNumber(e.target.value);setError(null);setMessage(null);}}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <TextField label='Password' type ='password' inputProps={{ minLength: 3}} required onChange = {(e) => {setPassword(e.target.value);setError(null);setMessage(null);}}/>
                    </Col>
                    <Col>
                        <TextField label='Confirm Password' type ='password' required inputProps={{ minLength: 3}} onChange = {(e) => {setConfirmPassword(e.target.value);setError(null);setMessage(null);}}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <TextField label='Passport Number' type ='text' required  onChange = {(e) => {setPassportNumber(e.target.value);setError(null);setMessage(null);}}/>
                    </Col>
                    <Col/>
                </Row>
                <br/>
                <Button type='submit' variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(160, 208, 226)'}} fullWidth onClick={submitHandler}>Register</Button>
                <br/><br/>
                <Typography > You have an account ?
                     <Link href="/" >
                        Login
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Register