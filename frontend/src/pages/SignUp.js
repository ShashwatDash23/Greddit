import logo from '../logo.svg';
import '../App.css';
import * as React from 'react';
import { AppBar, Button, Typography, Container, createTheme, ThemeProvider, makeStyles, TextField, Avatar, Toolbar, CssBaseline, Box, Grid, Link, InputAdornment, IconButton } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import RedditIcon from '@mui/icons-material/Reddit';
import { purple } from '@mui/material/colors';
import { bgcolor, borderRadius, padding } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import {useState, useEffect} from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import AppBarLogin from '../components/AppBarLogin';

const SignUp = ( {login, setLogin} ) => {
  const [showPassword, setShowPassword] = useState(false);
  const[data, setData] = useState([]);

  const navigate = useNavigate(); 

  const [inpVal, setInpVal] = useState({
    firstName : "",
    lastName : "",
    email : "",
    age : "",
    contactNumber : "",
    username : "",
    password : ""
  })

  const checkDisabled = () =>
  {
    return (
      inpVal.firstName.length &&
      inpVal.lastName.length &&
      inpVal.email.length &&
      inpVal.age.length &&
      inpVal.contactNumber.length &&
      inpVal.username.length &&
      inpVal.password.length
    )
  }

  const getData = (e) => 
  {
    const {value, name} = e.target;
    setInpVal({
      ...inpVal,
      [name] : value,
    });
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleAddUser = async (e) => {

    e.preventDefault();

    const { firstName, lastName, age, contactNumber, email, username, password} = inpVal;

    
    const rawResponse = await fetch("http://localhost:8000/api/users/signup", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, age, email, contactNumber, username, password})
    });

    const response = await rawResponse.json();
    
    if(response.token)
    {
        localStorage.setItem("currentUser", JSON.stringify({token: response.token}));
        localStorage.setItem("status", "success");
        setLogin(!login);
        navigate('/profile');
    }
    else
    {
        alert(response.err);
    }
    
  }

  const handleHome = () =>
    {
        navigate('/home');
    } 

  const theme = createTheme({
    palette: {
      primary: {
        main: '#283593',
      },
      secondary: {
        main: purple[600],
      },
      // background: {
      //   default: '#cfd8dc',
      // }
    },
  });

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
                bgcolor : "white"
              }}
            >
              <Avatar src="./icons8-panda-66.png" sx = {{mt : 7, mr: 3, width: "85px", height: "70px"}}>
              </Avatar>
              <Typography component="h1" variant="h5" sx = {{mt : 0.5, mb: 4, mr: 3}}>Sign Up</Typography>
              <Box 
                component = "form" 
                noValidate
                elevation = {10}>
                <Grid container spacing = {2}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      autoComplete='given-name'
                      name = "firstName"
                      required
                      fullWidth
                      id = "firstName"
                      label = "First Name" 
                      onChange = {getData}
                      variant = "standard"
                      value = {inpVal.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      autoComplete='family-name'
                      name = "lastName"
                      required
                      fullWidth
                      id = "lastName"
                      label = "Last Name"
                      onChange = {getData} 
                      variant = "standard"
                      value = {inpVal.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      autoComplete='email'
                      name = "email"
                      required
                      fullWidth
                      id = "email"
                      label = "Email Address" 
                      onChange = {getData}
                      variant = "standard"
                      value = {inpVal.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      autoComplete='age'
                      name = "age"
                      required
                      fullWidth
                      id = "age"
                      label = "Age" 
                      onChange = {getData}
                      variant = "standard"
                      value = {inpVal.age}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      autoComplete='contact'
                      name = "contactNumber"
                      required
                      fullWidth
                      id = "contact"
                      label = "Contact Number" 
                      onChange = {getData}
                      variant = "standard"
                      value = {inpVal.contactNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      // autoComplete='username'
                      name = "username"
                      required
                      fullWidth
                      id = "username"
                      label = "User Name" 
                      onChange = {getData}
                      variant = "standard"
                      value = {inpVal.username}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      autoComplete='password'
                      name = "password"
                      required
                      fullWidth
                      id = "password"
                      label = "Password" 
                      onChange = {getData}
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
                      value = {inpVal.password}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5, mb: 2 , ml: 3, height: "45px", bgcolor: "darkblue"}}
                    disabled = {!checkDisabled()}
                    onClick = {handleAddUser}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link
                       component = "button"
                       variant="body2"
                       onClick={() => setLogin(!login)}
                       >
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
  
                </Grid>
  
              </Box>
  
            </Box>
  
          </Container>
  
      </ThemeProvider>
  );
}

export default SignUp