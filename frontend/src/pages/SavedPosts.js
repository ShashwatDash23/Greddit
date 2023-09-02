import React from 'react'
import { ThemeProvider } from '@emotion/react';
import { AppBar, Toolbar, Typography, createTheme, Container, Box, CssBaseline, Avatar, Grid, TextField, Divider, Chip, Button, Stack, Menu, MenuItem, IconButton, getContrastRatio, Dialog, DialogActions, DialogContent
, DialogContentText, DialogTitle, InputAdornment, Tooltip, Paper, Pagination, Card, CardContent, CardActions} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { purple } from '@mui/material/colors';
import Followers from './Followers';
import { BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import AppBarRemaining from '../components/AppBarRemaining';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PostCard from '../components/PostCard';

const SavedPosts = () => {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

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

    const refreshPage = () => {
        window.location.reload(false);
    }

    useEffect(() => 
    {
        const status = localStorage.getItem("currentUser");
        if(!status)
        {
            navigate('/');
        }
    });

    const getPosts = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
      
            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/getSavedPosts", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
            });
      
            const response = await rawResponse.json();
            setPosts(response.list);
        }
      }

    useEffect(() => {
        getPosts();
    }, [])

    // console.log(posts);

  return (
        <ThemeProvider theme={theme}>
            <AppBarRemaining />
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Box 
                sx={{
                marginTop: 10,
                // ml: 24,
                // mr: 7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center",
                padding : 3,
                border: 2,
                borderColor : "lightgray",
                borderRadius : 4,
                bgcolor : "white",
                maxWidth: 800,
                width : "100%",
                }}
                >
                    <Grid container>
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <BookmarksIcon sx = {{width: "40px", height: "40px", mr: 2, mt:0.2, color:"darkblue"}}></BookmarksIcon>
                            <Typography variant="h4" sx = {{fontWeight: 300, mb: 1}}>SAVED POSTS</Typography>
                        </Grid>
                    </Grid> 
                    <Grid container spacing = {5} sx={{p:3}}>
                        {posts.map(post => (
                            <Grid item xs={12}>
                                <PostCard post = {post} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
  )
}

export default SavedPosts