import React from 'react'
import { Card, CardContent, Typography, CardActions, Grid, IconButton, Button, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

const ReportCard = ( {reports, params} ) => {

    const [isBlocking, setIsBlocking] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const blockUser = async () => {

        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/subgreddits/blockUser", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({textOfReportedPost : reports.textOfReportedPost, reportedBy : reports.reportedBy, Name : params})
            });

            const response = await rawResponse.json();
            // alert(response.message)

            // setReport1("");
        }
        // setReport1Open(false);
    };

    useEffect(() => {
        let timerId;

        if (isBlocking && countdown > 0) {
        timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
        // Code to block the user here
        setIsBlocking(false);
        setCountdown(3);
        blockUser();
        }

        return () => clearTimeout(timerId);
    }, [isBlocking, countdown]);

  const handleBlockClick = () => {
    if (isBlocking) {
      setIsBlocking(false);
      setCountdown(3);
    } else {
      setIsBlocking(true);
    }
  };

  console.log(reports);

    const refreshPage = () => {
        window.location.reload(false);
    }

    const handleIgnore = async () => {
        const name = localStorage.getItem("currentUser");
        if(name !== null)
        {
            const token = JSON.parse(name);
            

            const rawResponse = await fetch("http://localhost:8000/api/subgreddits/ignoreButton", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token.token
                },
                body : JSON.stringify({ textOfReportedPost : reports.textOfReportedPost }),
            });

            const response = await rawResponse.json();
            
            // console.log(response.list[0]);
            // setReportList(response.list);
        }
        refreshPage();
    }

    const handleDeletePost = async () => {
        const name = localStorage.getItem("currentUser");
        if(name !== null)
        {
            const token = JSON.parse(name);
        
            const rawResponse = await fetch("http://localhost:8000/api/subgreddits/deletePost", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token.token
                },
                body : JSON.stringify({ textOfReportedPost : reports.textOfReportedPost }),
            });

            const response = await rawResponse.json();
            alert(response.message);
            
            // console.log(response.list[0]);
            // setReportList(response.list);
        }
    }

  return (
    <Box>
        {reports !== null ?
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', border:1, borderColor:"lightgray",  }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
            <Typography sx = {{fontWeight:300}} variant="h6" component="h2">
                Reported By : {reports.reportedBy}
            </Typography>
            <Typography sx = {{fontWeight:300}} gutterBottom variant="h6" component="h2">
                Reported User : {reports.reportedUser}
            </Typography>
            <Typography sx = {{fontWeight:400}} gutterBottom  component="h2">
                Concern : {reports.concern}
            </Typography>
            <Typography sx = {{fontWeight:200}}>
                Post : {reports.textOfReportedPost}
            </Typography>
            </CardContent>
            <CardActions>
            <Button onClick={handleBlockClick} sx={{mr:2}} disabled = {reports.isIgnored} variant="contained" size="small">
                {reports.isBlocked ? "Blocked User" :
                isBlocking ? `Cancel (${countdown}s)` : "Block"}       
                
                </Button>
            <Button onClick={handleDeletePost} sx={{mr:2}} disabled = {reports.isIgnored || reports.isBlocked} variant="contained" size="small">Delete Post</Button>
            <Button onClick={handleIgnore} disabled = {reports.isBlocked} variant="contained" size="small">Ignore</Button>
            </CardActions>
        </Card>
        : ""}
    </Box>

  )
}

export default ReportCard