import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FollowerCard from './FollowerCard';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useParams} from 'react-router-dom';
import NoteCard from './NoteCard';
import RequestsCard from './RequestsCard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const JoiningRequests = ( {params} ) => {

  const [joinRequestsList, setJoinRequestsList] = useState([]);
  

  useEffect(() => 
    {
        const getJoinRequestsList = async () => 
        {
            const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);
                // console.log(params.id);

                const rawResponse = await fetch("http://localhost:8000/api/subgreddits/getJoinRequests", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                    body : JSON.stringify({ Name : params.id}),
                });

                const response = await rawResponse.json();
                // alert(response.list);
                setJoinRequestsList(response.list);
            }
        }
        getJoinRequestsList(); 
    }, [joinRequestsList]);


  return (
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
                    <PersonAddIcon sx = {{width: "35px", height: "35px", mr: 1.5, mt:0.2}}></PersonAddIcon>
                    <Typography variant="h4" sx = {{fontWeight: 300, mb: 5}}>JOINING REQUESTS</Typography>
                </Grid>
            </Grid> 
            <Grid container spacing ={3}>
                {joinRequestsList.map(user => (
                    <Grid item xs={12} md = {6}>
                        <RequestsCard note = {user} subG = {params.id} />
                    </Grid>
                ))}
            </Grid>
    </Box>
  )
}

export default JoiningRequests