import React, { useEffect } from 'react'
import { Card, CardHeader, Avatar, Button, Typography, CardContent } from '@mui/material'

const CommentCard = ({ note }) => {
    let status = "";
    console.log(note.content);

    return (
        <div>
            <Card >
                <CardHeader 
                    avatar={
                        <Avatar sx = {{bgcolor: "#673ab7", width:30, height:30}}>{note && note.user[0]}</Avatar>
                    }
                    title = {
                        <div>
                        <Typography sx={{fontWeight:400, fontSize:15}}>{note && note.user}</Typography>
                        <Typography color="textSecondary" sx={{fontSize:15}}>{note && note.content}</Typography>
                        </div>
                    }
                >
                </CardHeader>
            </Card>
        </div>
    )
}

export default CommentCard