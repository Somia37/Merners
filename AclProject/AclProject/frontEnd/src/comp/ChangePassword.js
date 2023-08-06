import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import Loading from "./Loading";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import VpnKey from '@material-ui/icons/VpnKey';
import Alert from '@mui/material/Alert';
import Header from './/Header';


const ChangePassword = () => {
    
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const [currentPassword, setCurrentPassword] = useState("");
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [message , setMessage] = useState(null);
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(null);

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
    

    const submitHandler = async(e) => {
        e.preventDefault();
        
        
        try
        {
            if(currentPassword === "")
            {
                setError('The current password field is required');
                throw new Error();
            }
            if(password === "")
            {
                setError('The password field is required');
                throw new Error();
            }
            if(confirmPassword === "")
            {
                setError('The password confirmation field is required');
                throw new Error();
            }
            if(currentPassword !== user.password)
            {
                setError('Current password is not correct');
                throw new Error();
            }
            if(password !== confirmPassword)
            {
                setError('The new Passwords does not match the confirmation password');
                throw new Error();
            }

            if(password === currentPassword)
            {
                setError('Your new password can not be the same as your current password');
                throw new Error();
            }
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            setLoading(true);
            const { data } = await axios.post(
                'http://localhost:8000/users/changePassword',
                {
                    _id: user._id ,
                    password: password
                },
                config 
                );
                setLoading(false);
                setError(null);
                setMessage('Password Changed Successfully!!')
                setPassword("");
                setCurrentPassword("");
                setConfirmPassword("");
               
        }
        catch(error)
        {
            setMessage(null);
            console.log(error.message)
            setLoading(false);
            if(error === null)
                setError("error occured please check all the fields");
        }
    }


    return (
        <div> 
             <Header />
        <Grid>
        {loading && <Loading />}  
        <Paper elevation={10} style={{padding :20,height:'47vh',width:400, margin:"20px auto"}}>
            <Grid align='center'>
                <br/>
                 <Avatar style={{backgroundColor:'rgb(160, 208, 226)'}}><VpnKey/></Avatar>
                <h2>Change Password</h2>
            </Grid>
            {error && <Alert style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error"><strong> {error}</strong> </Alert> }
            {message && <Alert style={{backgroundColor: 'rgb(206, 237, 214,0.5)'}} severity="success"><strong> {message}</strong> </Alert> }
            <br/><br/>
            <TextField label='Current Password'  value = {currentPassword} type='password'  required onChange= {(e)=>{setCurrentPassword(e.target.value)}} />
            <br/><br/>
            <TextField label='New Password' value = {password} type='password'  required onChange= {(e)=> {setPassword(e.target.value)}}/>
            <br/><br/>
            <TextField label='Confirm Password' value = {confirmPassword} type='password' required onChange= {(e) =>{setConfirmPassword(e.target.value)}} />
            <br/><br/>
            <Button type='submit' variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(160, 208, 226)'}}  onClick={submitHandler}>Save</Button>
            
            
        </Paper>
    </Grid>
        </div>
       
    )
}

export default ChangePassword
