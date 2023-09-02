import logo from '../logo.svg';
import '../App.css';
import * as React from 'react';
import { AppBar, Button, Typography, Container, createTheme, ThemeProvider, makeStyles, TextField, Avatar, Toolbar, CssBaseline, Box, Grid, Link, InputAdornment, IconButton, Alert, AlertTitle } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import RedditIcon from '@mui/icons-material/Reddit';
import { purple } from '@mui/material/colors';
import { bgcolor, borderRadius, padding } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import {useState, useEffect} from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import AppBarLogin from '../components/AppBarLogin';
import { SiFoodpanda } from "react-icons/si";

const SignIn = ({ login, setLogin }) => {

    const navigate = useNavigate();   
    
    useEffect(() => {
        const status = localStorage.getItem("status");
        // console.log(status);
        if(status === "success")
        {
            navigate('/profile');
        }
    },)

    const theme = createTheme({
        palette: {
            primary: {
            main: '#283593',
            },
            secondary: {
            main: purple[600],
            },
            // background: {
            //   default: '#212121',
            // }
        },
        });    
        
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState([]);

    const [loginValue, setLoginValue] = useState(
        {
            email: "",
            password: ""
        }
    )

    const checkDisabled = () => 
    {
        return (
            loginValue.email.length && loginValue.password.length
        )
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const getData = (e) => 
    {
        const {value, name} = e.target;
        setLoginValue({
            ...loginValue,
            [name] : value,
        })
        console.log(loginValue.email);
    }

    const handleHome = () =>
    {
        navigate('/home');
    }


    const handleLogin = async (e) => 
    {
        e.preventDefault();

        const { email, password } = loginValue;

        const rawResponse = await fetch("http://localhost:8000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password})
        });

        const response = await rawResponse.json();

        if(response.token)
        {
            localStorage.setItem("currentUser", JSON.stringify({token: response.token}));
            localStorage.setItem("status", "success");
            navigate('/profile');
        }
        else
        {
            alert(response.err);
        }

        // if(getUser && getUser.length)
        // {
        //     const data = JSON.parse(getUser);
        //     if(data.password == loginValue.password)
        //     {
        //         localStorage.setItem("currentUser", getUser);
        //         localStorage.setItem("status", "success");
        //         navigate('/profile');
        //     }
        //     else
        //     {
        //         alert("Incorrect password entered");
        //     }
        // }
        // else
        // {
        //     setLoginValue({
        //         username: "",
        //         password: "",
        //     })
        //     alert("User Name does not exist");
        // }

    }

    return (
        <ThemeProvider theme={theme}>
            <AppBarLogin login={login} setLogin={setLogin}/>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box 
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding : 3,
                    // border: 2,
                    // borderColor : "lightgray",
                    // borderRadius : 2,
                    bgcolor : "white",
                }}
                >
                <Avatar src="./icons8-panda-66.png" sx = {{mt : 12, mr: 3, width: "85px", height: "70px"}}>
                    
                </Avatar>
                <Typography component="h1" variant="h5" sx = {{mt : 0.5, mb: 4, mr: 3}}>Sign In</Typography>
                <Box 
                    component = "form" 
                    noValidate
                    elevation = {10}
                    >
                    <Grid container spacing = {2}>
                    <Grid item xs={12}>
                        <TextField 
                        value={loginValue.email}
                        autoComplete='email'
                        name = "email"
                        required
                        fullWidth
                        id = "email"
                        label = "Email" 
                        variant = "standard"
                        onChange={(e) => getData(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        value={loginValue.password}
                        autoComplete='password'
                        name = "password"
                        required
                        fullWidth
                        id = "password"
                        label = "Password" 
                        onChange={(e) => getData(e)}
                        type={showPassword ? 'text' : 'password'}
                        endadornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        }
                        variant = "standard"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5, mb: 2 , ml: 3, height: "45px", bgcolor: "darkblue"}}
                        onClick = {handleLogin}
                        disabled = {!checkDisabled()}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                        <Link
                        component = "button"
                        variant="body2"
                        onClick={() => setLogin(!login)}
                        >
                            Don't have an account? Sign Up
                        </Link>
                        </Grid>
                    </Grid>
    
                    </Grid>
    
                </Box>
    
                </Box>
    
            </Container>
        </ThemeProvider>
    )
}

export default SignIn