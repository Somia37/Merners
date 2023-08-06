import React , {useState} from "react"; 
import axios from 'axios';
import Loading from './Loading';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@mui/material/Alert';

const Login=({history}) => {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [loading , setLoading] = useState(false);
    const [usernameError , setUsernameError] = useState(null);
    const [passError , setPassError] = useState(null);
    localStorage.removeItem("Guest");

    const submitHandler = async(e) => {
        e.preventDefault();
        try
        {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            setLoading(true);
            const { data } = await axios.post(
                "http://localhost:8000/users/login",
                {
                   username: username,
                   password: password,
                },
                config 
                );
            if(data.username === null)
            {
                setUsernameError("Username doesn't exists");
            }
            else if(data.password === null )
            {
                setPassError("Wrong password");
            }
            else
                
            {
                console.log(data)
                data.password = password;
                localStorage.setItem("userInfo", JSON.stringify(data));
               
                
                if(localStorage.getItem('URL') === null)
                {
                    if(data.isAdmin)
                        window.location = "/home/" + data._id;
                    else
                        window.location = "/homePageUser/"+ data._id
                }
                else
                        window.location.href = "http://localhost:3000/FinalSumm/"+JSON.parse(localStorage.getItem('URL'))+data._id
                 
            }    
            setLoading(false);
        }

        catch(error)
        {
            setLoading(false);
            setPassError(error.message);
            setUsernameError(error.message);
        }
    }



    return(
            
        <Grid>
            {loading && <Loading />}  
            <Paper elevation={10} style={{padding :20,height:'52vh',width:500, margin:"20px auto"}}>
                <Grid align='center'>
                    <br/>
                     <Avatar style={{backgroundColor:'rgb(160, 208, 226)'}}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                {usernameError && <Alert style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error"><strong> {usernameError}</strong> </Alert> }
                {passError && <Alert style={{backgroundColor: 'rgb(244, 67, 54,0.3)'}} severity="error"><strong> {passError}</strong> </Alert> }
                <br/>
                {usernameError && <TextField label='Username' value = {username} error fullWidth required onChange= {(e)=>{setUsername(e.target.value);setPassError(null);}} />} 
                {!usernameError && <TextField label='Username' value={username} fullWidth required onChange= {(e)=> {setUsername(e.target.value);setPassError(null); }} />} 
                <br/><br/><br/>
                {!passError && <TextField label='Password' value={password} type='password' fullWidth required onChange= {(e) =>{setPassword(e.target.value);setUsernameError(null)}} />}
                {passError && <TextField label='Password' value={password} error type='password' fullWidth required onChange= {(e) =>{setPassword(e.target.value);setUsernameError(null) }} />}
                <br/><br/><br/>
                <Button type='submit' variant="contained" style={{margin:'8px 0' , backgroundColor:'rgb(160, 208, 226)'}} fullWidth onClick={submitHandler}>Sign in</Button>
                <br/><br/>
                <Typography >
                     <Link href="/GuestHomePage" onClick={()=>{localStorage.setItem(('Guest'),true)}}>
                        Continue as a guest ?
                </Link>
                </Typography>
               
                <br/><br/>
                <Typography > Do you have an account ?
                     <Link to="/Register"  >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login