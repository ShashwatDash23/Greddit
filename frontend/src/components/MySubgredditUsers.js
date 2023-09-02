import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FollowerCard from './FollowerCard';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useParams} from 'react-router-dom';

const MySubgredditUsers = ({ params }) => {

    const [followersList, setFollowersList] = useState([]);
    const [blockedList, setBlockedList] = useState([]);

    useEffect(() => 
    {
        const getFollowersList = async () => 
        {
            const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);
                // console.log(params.id);

                const rawResponse = await fetch("http://localhost:8000/api/subgreddits/getUsers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                    body : JSON.stringify({ Name : params.id}),
                });

                const response = await rawResponse.json();
                // alert(response.list);
                setFollowersList(response.list);
            }
        }
        getFollowersList(); 
    }, [followersList]);

    useEffect(() => 
    {
        const getBlockedList = async () => 
        {
            const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);
                // console.log(params.id);

                const rawResponse = await fetch("http://localhost:8000/api/subgreddits/getBlockedUsers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                    body : JSON.stringify({ Name : params.id}),
                });

                const response = await rawResponse.json();
                // alert(response.list);
                setBlockedList(response.list);
            }
        }
        getBlockedList(); 
    }, [blockedList]);

  return (
    <Grid container spacing = {5}>
        <Grid item xs = {6}>
            <Box 
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding : 3,
                    border: 2,
                    borderColor : "lightgray",
                    borderRadius : 2,
                    bgcolor : "white",
                    
                }}>
                <Grid container display="flex" justifyContent="center">
                    <Grid item xs={6} display="flex" justifyContent="center">
                        <PeopleAltIcon sx = {{width: "40px", height: "40px", mr: 1.5, mt:0.2}}></PeopleAltIcon>
                        <Typography variant="h4" sx = {{fontWeight: 300, mb: 5}}>FOLLOWERS</Typography>
                    </Grid>
                </Grid> 
                <Grid container spacing ={3}>
                    {followersList.map(user => (
                        <Grid item xs={12} md = {6}>
                            <FollowerCard note = {user}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Grid>
        <Grid item xs = {6}>
            <Box 
                sx={{
                    marginTop: 10,
                    
                    // mr: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding : 3,
                    border: 2,
                    borderColor : "lightgray",
                    borderRadius : 2,
                    bgcolor : "white",
                    // maxWidth: 700,
                    // width : "100%",
                }}>
                <Grid container display="flex" justifyContent="center">
                    <Grid item xs={6} display="flex" justifyContent="center" justifyItems="center">
                        <PersonOffIcon sx = {{width: "40px", height: "40px", mr: 1.5, mt:0.2}}></PersonOffIcon>
                        <Typography variant="h4" sx = {{fontWeight: 300, mb: 5}}>BLOCKED USERS</Typography>
                    </Grid>
                </Grid> 
                <Grid container spacing ={3}>
                    {blockedList.map(user => (
                        <Grid item xs={12} md = {6}>
                            <FollowerCard note = {user}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Grid>
    </Grid>
  )
}

export default MySubgredditUsers