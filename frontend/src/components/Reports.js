import React from 'react'
import ReportCard from './ReportCard'
import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material'
import ReportIcon from '@mui/icons-material/Report';

const Reports = ( {params} ) => {

    const [reportList, setReportList] = useState([]);

    const refreshPage = () => {
        window.location.reload(false);
    }

    useEffect(() =>     
    {
        const getReports = async () => 
        {
            const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);
                // console.log(params.id);

                const rawResponse = await fetch("http://localhost:8000/api/subgreddits/getReports", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                    body : JSON.stringify({ Name : params.id}),
                });

                const response = await rawResponse.json();
                // console.log(response.message);
                setReportList(response.message);
            }
        }
        getReports(); 
    }, [reportList]);

    // console.log(reportList);

  return (
    <Box 
        sx={{
            marginTop: 8,
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
        >
            <Grid container>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <ReportIcon sx = {{width: "40px", height: "40px", mr: 1.5, mt:0.2, color:"red"}}></ReportIcon>
                    <Typography variant="h4" sx = {{fontWeight: 300, mb: 1}}>REPORTS</Typography>
                </Grid>
            </Grid> 
           <Grid container spacing ={5} sx={{p:3}}>
                {reportList.map(report => (
                    <Grid item xs={12} md = {6}>
                        <ReportCard reports = {report} params = {params.id}/>
                    </Grid>
                ))}
            </Grid>
    </Box>
  )
}

export default Reports