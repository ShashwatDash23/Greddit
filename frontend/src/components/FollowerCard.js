import React, { useEffect } from 'react'
import { Card, CardHeader, Avatar, Button, Typography } from '@mui/material'

const FollowerCard = ({ note }) => {
    let status = "";

    return (
        <div>
            <Card sx = {{border: 2, borderRadius: 1, borderColor: "#f5f5f5", bgcolor:"#fafafa"}}>
                <CardHeader 
                    avatar={
                        <Avatar sx = {{bgcolor: "#673ab7"}}>{note[0].toUpperCase()}</Avatar>
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

export default FollowerCard