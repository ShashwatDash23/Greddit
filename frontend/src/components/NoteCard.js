import React, { useEffect } from 'react'
import { Card, CardHeader, Avatar, Button, Typography } from '@mui/material'

const NoteCard = ({ note, flag }) => {
    let status = "";
    if(flag === "Following")
        status = "Unfollow";
    else
        status = "Remove";    

    const handleClick = async () => {
        if(status === "Unfollow")
        {
            const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);

                const rawResponse = await fetch("http://localhost:8000/api/profile/following/unfollow", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                    body: JSON.stringify({username: note})
                });

                const response = await rawResponse.json();
            }
        }
        else
        {
            const name = localStorage.getItem("currentUser");
            if(name !== null)
            {
                const token = JSON.parse(name);

                const rawResponse = await fetch("http://localhost:8000/api/profile/followers/remove", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token.token
                    },
                    body: JSON.stringify({username: note})
                });

                const response = await rawResponse.json();
            }
        }
    }

  return (
    <div>
        <Card sx = {{border: 2, borderRadius: 1, borderColor: "#f5f5f5"}}>
            <CardHeader 
                avatar={
                    <Avatar sx = {{bgcolor: "#673ab7"}}>{note[0].toUpperCase()}</Avatar>
                }
                action={
                    <Button onClick={handleClick} variant="outlined" sx = {{color: '#ff6659', mt:0.7}}>{status}</Button>
                }
                title = {
                    <Typography>{note}</Typography>
                }
            >
            </CardHeader>
        </Card>
    </div>
  )
}

export default NoteCard