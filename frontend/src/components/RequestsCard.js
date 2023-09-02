import React, { useEffect } from 'react'
import { Card, CardHeader, Avatar, Button, Typography, IconButton } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RequestsCard = ( {note, subG} ) => {

    const refreshPage = () => {
        window.location.reload(false);
      }

    const handleAccept = async () => {
        const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);
                // console.log(params.id);

                const rawResponse = await fetch("http://localhost:8000/api/subgreddits/acceptRequest", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                    body : JSON.stringify({ username: note[1], subG: subG}),
                });

                const response = await rawResponse.json();
                alert(response.message);
            }
            refreshPage();
    }

    const handleDelete = async () => {
        const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);
                // console.log(params.id);

                const rawResponse = await fetch("http://localhost:8000/api/subgreddits/rejectRequest", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                    body : JSON.stringify({ username: note[1], subG: subG}),
                });

                const response = await rawResponse.json();
                alert(response.message);
            }
            refreshPage();
    }

  return (
    <div>
        <Card sx = {{border: 2, borderRadius: 1, borderColor: "#f5f5f5"}}>
            <CardHeader 
                avatar={
                    <Avatar sx = {{bgcolor: "#673ab7"}}>{note[0][0].toUpperCase()}</Avatar>
                }
                action={
                    <div>
                    {/* <Button onClick={handleClick} variant="outlined" sx = {{color: '#ff6659', mt:0.7}}>Accept</Button> */}
                        <IconButton onClick={handleAccept} sx = {{color: '#388e3c', mt:0.7}}>
                            <DoneIcon sx={{width:30, height:30}}/>
                        </IconButton>
                        <IconButton onClick={handleDelete} sx = {{color: '#ff6659', mt:0.7}}>
                            <CloseIcon sx={{width:30, height:30}}/>
                        </IconButton>
                    </div>
                }
                title = {
                    <div>
                        <Typography>{note[1]}</Typography>
                        <Typography color="textSecondary">{note[0]}</Typography>
                    </div>
                }
            >
            </CardHeader>
        </Card>
    </div>
  )
}

export default RequestsCard