import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { AppBar, Toolbar, Typography, createTheme, Container, Box, CssBaseline, Avatar, Grid, TextField, Divider, Button, Card, CardHeader, CardContent, IconButton, Menu, MenuItem } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { purple } from '@mui/material/colors';
import { BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteCard from '../components/NoteCard';
import AppBarRemaining from '../components/AppBarRemaining';

const Followers = () => {

    const getUser = localStorage.getItem("currentUser");
    const user = JSON.parse(getUser);
    const navigate = useNavigate();
    const [followersList, setFollowersList] = useState([]);

    useEffect(() => 
    {
        const status = localStorage.getItem("currentUser");
        if(!status)
        {
            navigate('/');
        }
    });

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

    const [anchorElm, setAnchorElm] = useState(null);
    const [open, setOpen] = useState(false);
  
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

    const handleProfile = () => 
    {
        navigate('/profile');
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBarRemaining />
            <Container component="main" maxWidth="m">
                <CssBaseline />
                <Box 
                    sx={{
                        marginTop: 15,
                        ml: 24,
                        mr: 7,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding : 3,
                        border: 2,
                        borderColor : "lightgray",
                        borderRadius : 4,
                        bgcolor : "white",
                        maxWidth: 1000,
                        width : "100%",
                    }}
            >   <Grid container>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <PeopleAltIcon sx = {{width: "35px", height: "35px", mr: 1.5, mt:0.2}}></PeopleAltIcon>
                        <Typography variant="h4" sx = {{fontWeight: 300, mb: 5}}>FOLLOWERS</Typography>
                    </Grid>
                </Grid> 
                <Grid container spacing ={3}>
                    {followersList.map(user => (
                        <Grid item xs={12} md = {6}>
                            <NoteCard note = {user} flag = "Followers"/>
                        </Grid>
                    ))}
                </Grid>
                <Button 
                variant="contained"
                size= "large" 
                sx = {{bgcolor: "darkblue", mt:3, borderRadius: 2}}
                onClick = {handleProfile}
                >Close</Button>


            </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Followers;