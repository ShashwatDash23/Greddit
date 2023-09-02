import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { AppBar, Toolbar, Typography, createTheme, Container, Box, CssBaseline, Avatar, Grid, TextField, Divider, Chip, Button, Stack, Menu, MenuItem, IconButton, getContrastRatio, Dialog, DialogActions, DialogContent
, DialogContentText, DialogTitle, InputAdornment, Tooltip } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { purple } from '@mui/material/colors';
import Followers from './Followers';
import { BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AppBarRemaining from '../components/AppBarRemaining';

const ProfilePage = () => {

    const [anchorElm, setAnchorElm] = useState(null);
    const [open, setOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [followingList, setFollowingList] = useState([]);
    const [followersList, setFollowersList] = useState([]);

    let isPassChange = false;
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate(); 
    let initialPass = "";
    const [user, setUser] = useState({
        firstName : "",
        lastName : "",
        email : "",
        age : "",
        contactNumber : "",
        username : "",
        password : ""
    })
    const [inpVal, setInpVal] = useState({
        firstName : "",
        lastName : "",
        email : "",
        age : "",
        contactNumber : "",
        username : "",
        password : ""
    })

    useEffect(() => 
    {
        const getFollowingList = async () => 
        {
            const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);

                const rawResponse = await fetch("http://localhost:8000/api/profile/following", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                });

                const response = await rawResponse.json();
                setFollowingList(response.list);
            }
        }
        getFollowingList(); 
    }, [followingList]);

    useEffect(() => 
    {
        const getFollowersList = async () => 
        {
            const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);

                const rawResponse = await fetch("http://localhost:8000/api/profile/followers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                });

                const response = await rawResponse.json();
                setFollowersList(response.list);
            }
        }
        getFollowersList(); 
    }, [followersList]);
    

    useEffect(() => {
        
        const name = localStorage.getItem("currentUser");
        if(name !== null)
        {
            const token = JSON.parse(name);

            const fetchData = async () => {
                const rawResponse = await fetch("http://localhost:8000/api/profile/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                });

                // getting user details from database    
                const response = await rawResponse.json();
                setUser({
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    age: response.age,
                    contactNumber: response.contactNumber,
                    username: response.username,
                    password: response.password
                });
                setInpVal({
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    age: response.age,
                    contactNumber: response.contactNumber,
                    username: response.username,
                    password: response.password
                });
            }
            fetchData();
            // setInpVal(inpVal => user);
        }
        else
        {
            navigate("/");
        }
        
    }, [update]);

    useEffect(() => 
    {
        const status = localStorage.getItem("currentUser");
        if(!status)
        {
            navigate('/');
        }
    });
    
    const theme = createTheme({
        palette: {
            primary: {
            main: '#283593',
            },
            secondary: {
            main: purple[600],
            },
            background: {
            default: '#f5f5f5',
            }
        },
    }); 

    const name = localStorage.getItem("currentUser");
    const token = JSON.parse(name);

    const handleEditDetails = async () => {
        const { firstName, lastName, age, contactNumber, email, username, password} = inpVal;
        if(password !== user.password)
             isPassChange = true;

        console.log(isPassChange);     

        const rawResponse = await fetch("http://localhost:8000/api/profile/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token
            },
            body: JSON.stringify({ firstName, lastName, age, email, contactNumber, username, password, isPassChange})
        });

        // getting user details from database    
        setDetailsOpen(false);
        const response = await rawResponse.json();
        if(response)
        {
            alert("Details updated successfully!");
            setUpdate(!update);
        }
            
        else
            alert("Could not update details :(");    
          
    }

    const handleCancelDetails = () => {
        setInpVal(user);
        setDetailsOpen(false);
    }

    const getData = (e) => {
        const {value, name} = e.target;
        setInpVal({
        ...inpVal,
        [name] : value,
        });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleDetailsOpen = () => {
        setDetailsOpen(true);
    };
    
    const handleDetailsClose = () => {
        setDetailsOpen(false);
        console.log(inpVal);
    };

    const handleCloseMenu = () => {
        setAnchorElm(null);
        setOpen(false);
    }

    const handleMenuClick = (e) =>
    {
        setAnchorElm(e.currentTarget);
        setOpen(true);
    }

    const handleFollowers = () =>
    {
        navigate("/profile/followers"); 
    }
    const handleFollowing = () =>
    {
        navigate("/profile/following"); 
    }

    const handleProfile = () => 
    {
        navigate('/profile');
    }

    const handleLogout = () =>
    {
        localStorage.setItem("status", "authorize");
        localStorage.removeItem("currentUser");
        navigate('/');
    }

    const handleMySubgreddit = () =>
    {
        navigate('/mysubgreddit');
    }

  return (
    <ThemeProvider theme={theme}>
        <AppBarRemaining />
        <Container component="main" maxWidth="m" sx = {{display: 'flex', flexDirection: 'row'}}>
            <CssBaseline />
            <Box 
            sx={{
                marginTop: 15,
                ml: 7,
                mr: 7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding : 3,
                border: 2,
                borderColor : "lightgray",
                borderRadius : 4,
                bgcolor : "white",
                maxWidth: 350,
                width : "100%",
                maxHeight: 700,
                height : "100%"
            }}
            >
                <Box sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper', height : '100%', maxHeight: 700 }}>
                    <Box>
                        <Grid container  alignItems = "center" justifyContent="center">
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <Avatar
                                        sx = {{
                                            bgcolor : "purple",
                                            width : "130px",
                                            height : "130px",
                                            fontSize : "60px",
                                            
                                        }}
                                        >
                                        {((user.firstName) !== "") ? user.firstName[0].toUpperCase() : ""}{(user.lastName !== "") ? user.lastName[0].toUpperCase() : ""}
                                    </Avatar>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <Typography variant = "h5"
                                        sx = {{
                                            mt : 2,
                                            color: "textSecondary",
                                            fontWeight: 500
                                        }}
                                    >
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">    
                                    <Typography variant = "h6"
                                        sx = {{
                                            // fontSize : "20px",
                                            mb : 1,
                                            color: "#757575"
                                        }}
                                    >
                                        {user.age}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{ mt : 2 }}>
                    <Grid container>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="start">
                            <Typography 
                            variant = "h6" 
                            
                            sx = {{
                                color: "textSecondary",
                                fontWeight: 500}}>
                                Description
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="start">
                            <Typography variant = "body2" justifyContent="center"
                                sx = {{
                                    mt : 1,
                                    // fontSize : "25px",
                                    color: "#424242"
                                }}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                    </Box>
                </Box>
                
            </Box>

            <Box 
            sx={{
                marginTop: 15,
                mr: 7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding : 3,
                border: 2,
                borderColor : "lightgray",
                borderRadius : 4,
                bgcolor : "white",
                maxWidth: 900,
                width : "100%",
                maxHeight: 700,
                height : "100%"
            }}
            >
                <Box sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper', height : '100%', maxHeight: 700, }}>
                    <Box sx={{mb : 1}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="start">
                                    <Typography variant="h6" color="textSecondary">USER INFORMATION</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider variant="middle" />

                    <Box sx={{ mt : 3 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography 
                                    sx = {{
                                        fontSize : "18px",
                                        color: "textSecondary",
                                        fontWeight: 500,
                                    }}
                                    >First Name</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography justifyContent="center"
                                    sx = {{
                                        fontSize : "18px",
                                        color: "textSecondary",
                                        fontWeight: 500
                                    }}
                                >
                                Last Name    
                                </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography 
                                    sx = {{
                                        mt: 1,
                                        fontSize : "18px",
                                        color: "textSecondary",
                                        fontWeight: 300
                                    }}
                                    >{user.firstName}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography justifyContent="center"
                                        sx = {{
                                            mt : 1,
                                            mb: 1,
                                            fontSize : "18px",
                                            color: "#textSecondary",
                                            fontWeight: 300
                                        }}
                                    >
                                    {user.lastName}   
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>  

                    <Divider variant="middle" />

                    <Box sx={{ mt : 2 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography 
                                    sx = {{
                                        fontSize : "18px",
                                        color: "#textSecondary",
                                        fontWeight: 500
                                    }}
                                    >Email</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography justifyContent="center"
                                    sx = {{
                                        fontSize : "18px",
                                        color: "textSecondary",
                                        fontWeight: 500
                                    }}
                                >
                                User Name    
                                </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography 
                                    sx = {{
                                        mt: 1,
                                        fontSize : "18px",
                                        color: "textSecondary",
                                        fontWeight: 300
                                    }}
                                    >{user.email}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography justifyContent="center"
                                        sx = {{
                                            mt : 1,
                                            fontSize : "18px",
                                            color: "textSecondary",
                                            fontWeight: 300
                                        }}
                                    >
                                    {user.username}   
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider variant="middle" />

                    <Box sx={{ mt : 2 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography 
                                    sx = {{
                                        fontSize : "18px",
                                        color: "textSecondary",
                                        fontWeight: 500
                                    }}
                                    >Age</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography justifyContent="center"
                                    sx = {{
                                        fontSize : "18px",
                                        color: "textSecondary",
                                        fontWeight: 500
                                    }}
                                >
                                Contact Number    
                                </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography 
                                    sx = {{
                                        mt: 1,
                                        fontSize : "18px",
                                        color: "textSecondary",
                                        fontWeight: 300
                                    }}
                                    >{user.age}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="start">
                                    <Typography justifyContent="center"
                                        sx = {{
                                            mt : 1,
                                            fontSize : "18px",
                                            color: "textSecondary",
                                            fontWeight: 300
                                        }}
                                    >
                                    {user.contactNumber}   
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider variant="middle" />

                    <Box sx={{ mt : 2 }}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Box display="flex" justifyContent="center">
                                    <Button variant="outlined" color="secondary"
                                        onClick = {handleFollowers}
                                        sx = {{
                                        mt: 3,
                                        height: 40
                                        
                                    }}>Followers {followersList.length}</Button>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box display="flex" justifyContent="center">
                                    <Button variant="outlined" color="secondary"
                                        onClick = {handleFollowing}
                                        sx = {{
                                        mt: 3,
                                        height: 40
                                    }}>Following {followingList.length}</Button>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box display="flex" justifyContent="center">
                                    <Button variant="outlined" onClick={handleDetailsOpen} color="secondary" sx = {{
                                        mt: 3,
                                        height: 40
                                    }}>Edit Details</Button>
                                    <Dialog open={detailsOpen} onClose={handleDetailsClose}>
                                        <DialogTitle>Edit Details</DialogTitle>
                                        <DialogContent>
                                        <Box 
                                            component = "form" 
                                            noValidate
                                            elevation = {10}
                                            >
                                            <Grid container spacing = {1.5}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField 
                                                autoComplete='given-name'
                                                name = "firstName"
                                                fullWidth
                                                id = "firstName"
                                                label = "First Name" 
                                                onChange = {getData}
                                                value = {inpVal.firstName}
                                                sx = {{mt:1}}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField 
                                                autoComplete='family-name'
                                                name = "lastName"
                                                fullWidth
                                                id = "lastName"
                                                label = "Last Name"
                                                onChange = {getData} 
                                                sx = {{mt:1}}
                                                value = {inpVal.lastName}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField 
                                                autoComplete='email'
                                                name = "email"
                                                fullWidth
                                                id = "email"
                                                label = "Email Address" 
                                                onChange = {getData}
                                                
                                                value = {inpVal.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField 
                                                autoComplete='age'
                                                name = "age"
                                                fullWidth
                                                id = "age"
                                                label = "Age" 
                                                onChange = {getData}
                                                
                                                value = {inpVal.age}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField 
                                                autoComplete='contact'
                                                name = "contactNumber"
                                                fullWidth
                                                id = "contact"
                                                label = "Contact Number" 
                                                onChange = {getData}
                                                
                                                value = {inpVal.contactNumber}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField 
                                                // autoComplete='username'
                                                name = "username"
                                                fullWidth
                                                id = "username"
                                                label = "User Name" 
                                                onChange = {getData}
                                                
                                                value = {inpVal.username}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField 
                                                autoComplete='password'
                                                name = "password"
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
                                               
                                                value = {inpVal.password}
                                                />
                                            </Grid>
                                            </Grid>
                                        </Box>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={handleCancelDetails}>Cancel</Button>
                                        <Button onClick={handleEditDetails}>Save</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                

                </Box>

                </Box>                             

        </Container>    
    </ThemeProvider>

  )
}

export default ProfilePage;