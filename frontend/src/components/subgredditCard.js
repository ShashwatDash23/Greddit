import React from 'react'
import { Card, CardContent, Typography, CardActions, Grid, IconButton, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

const SubgredditCard = ({ list, mod }) => {

    const navigate = useNavigate(); 
    const [check, setCheck] = useState(false);


    const handleSubPage = () => {
        navigate(`/allsubgreddits/${list.Name}`);
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleLeave = async () => {
        const name = localStorage.getItem("currentUser");
        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/allSubgreddits/leaveSub", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body : JSON.stringify({Name : list.Name})
            });

            const response = await rawResponse.json();
            // console.log(response.list[0]);
            alert(response.message);
        }
        refreshPage();
    }

    const handleDelete = () => {

    }

  return (
    <Card sx={{ minWidth: 275, borderRadius: 2, bgColor: "gray", border:2, borderColor: "#eeeeee"}}>
        <CardContent>
            <Typography sx={{ fontSize: 28 , mb: 1.5}} color="#5c6bc0" gutterBottom>
            Gr/{(list.length !== 0) && list.Name}  
            </Typography>
            <Typography sx={{ fontSize: 18 , mb: 5}} color="textSecondary" gutterBottom>
            {(list !== "") && list.Description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="green">
            Tags : {(list !== "") && (list.Tags !== []) && (list.Tags.map(tag => (
                tag + ", "
            )) )}
            </Typography>
            <Typography sx={{ }} color="red">
            Banned Keywords : {(list !== "") && (list.Banned !== []) && (list.Banned.map(banned => (
                banned + ", "
            )) )}
            </Typography>
        </CardContent>
        <CardActions>
        <Grid container>
            <Grid item xs = {6} sx={{mb:2}}>
                <Typography variant="h6" component="div" color="textSecondary">
                Followers : {(list !== "") && list.Followers.length}
                </Typography>
            </Grid>
            <Grid item xs = {6} sx = {{mb:2}}>
                <Typography variant="h6" component="div" color="textSecondary">
                Posts : {(list !== "") && list.Posts.length}
                </Typography>
            </Grid>
            <Grid item xs = {6}>
                <IconButton onClick={handleSubPage}>
                <LaunchIcon size="large"></LaunchIcon>
                </IconButton>
                
            </Grid>
            <Grid item xs = {6} sx={{display:"flex", justifyContent:"end"}}>
                <Button onClick={handleLeave} disabled = {list.Moderator.toString() === mod} variant="outlined">LEAVE</Button>
            </Grid>
        </Grid>
            
        </CardActions>
    </Card>
  )
}

export default SubgredditCard