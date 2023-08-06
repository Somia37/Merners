import React, { useState ,useEffect } from 'react';
import { Form , Col ,Row } from 'react-bootstrap';
import MainScreen from './mainScreen';
import axios from 'axios';
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import Header from './Header';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import ModeEdit from  '@mui/icons-material/ModeEdit';
import Alert from '@mui/material/Alert';



const EditProfile = () => {
    
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [homeAddress , setHomeAddress] = useState("");
    const [phoneNumber , setPhoneNumber] = useState("");
    const [passportNumber , setPassportNumber] = useState("");
    const [message , setMessage] = useState(null);
    const [error , setError] = useState(false);
    const [loading , setLoading] = useState(false);

    if(message !== null)
    {
        setTimeout(() => {
            setMessage(null);
          }, 3000);
    }

    if(error !== null)
    {
        setTimeout(() => {
            setError(null);
          }, 3000);
    }
    
  
    
    useEffect(() => {
       setFirstName(user.firstName);
       setLastName(user.lastName);
       setEmail(user.email);
       setHomeAddress(user.homeAddress);
       setPhoneNumber(user.phoneNumber);
       setPassportNumber(user.passportNumber);
    },[]);
    

    const submitHandler = async(e) => {
        e.preventDefault();
        
        try
        {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

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

            

            

            setLoading(true);
            const id = user._id;
            const username = user.username;
            const password = user.password;
            const reservedFlights = user.reservedFlights;
            const { data } = await axios.post(
                "http://localhost:8000/users/updateUser",
                {_id : id,
                username : username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                homeAddress: homeAddress,
                phoneNumber: phoneNumber,
                passportNumber: passportNumber,
                password: password,
                reservedFlights : reservedFlights,},
                config 
                );
                setLoading(false);
                setMessage("Profile is updated successfully");
                if(data == null)
                    setError("email already exits ")
                    
                const updatedUser = {_id : id,
                    username : username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    homeAddress: homeAddress,
                    phoneNumber: phoneNumber,
                    passportNumber: passportNumber,
                    password: password,
                    reservedFlights : reservedFlights, Token: user.Token}
                    
                localStorage.setItem("userInfo", JSON.stringify(updatedUser));
               
        }
        catch(error)
        {
            if(error == null)
            setError(error.message);
            setLoading(false);
           
        }



    }


    return (
        <div>
            <Header/>   
            
            <Grid>
            <br/><br/>
            {loading && <Loading />}  
            <Paper elevation={10} style={{padding :20,height:'65vh',width:500, margin:"20px auto"}}>
                <Grid align='center'>
                    <br/>
                     <Avatar style={{backgroundColor:'rgb(160, 208, 226)'}}><ModeEdit/></Avatar>
                    <h2>Edit Your Profile Info</h2>
                </Grid>
                 {error && <Alert style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error">{error}</Alert>}  
                 {message && <Alert style={{backgroundColor: 'rgb(206, 237, 214,0.5)'}} severity="success">{message}</Alert>}
                <br/>
                <TextField label='First Name' value = {firstName} required onChange= {(e)=>{setFirstName(e.target.value);setError(null);setMessage(null)}} fullWidth  />
                <br/><br/>
                <TextField label='Last Name' value = {lastName} required onChange= {(e)=>{setLastName(e.target.value);setError(null);setMessage(null)}} fullWidth/>
                <br/><br/>
                <TextField label='Email'  type ='email' value = {email} required onChange= {(e)=>{setEmail(e.target.value);setError(null);setMessage(null)}} fullWidth/>
                <br/><br/>
                <TextField label='HomeAddress'  value = {homeAddress} required onChange= {(e)=>{setHomeAddress(e.target.value);setError(null);setMessage(null)}} fullWidth/>
                <br/><br/>
                <TextField label='Phone Number' value = {phoneNumber} required onChange= {(e)=>{setPhoneNumber(e.target.value);setError(null);setMessage(null)}} fullWidth/>
                <br/><br/>
                <TextField label='Passport Number'  value = {passportNumber} required onChange= {(e)=>{setPassportNumber(e.target.value);setError(null);setMessage(null)}}fullWidth />
                <br/><br/>
                <Button type='submit' variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(160, 208, 226)'}} fullWidth onClick={submitHandler}>Submit</Button>
                
            </Paper>
         </Grid>
    </div>
        
    )
}

export default EditProfile
