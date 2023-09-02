import React from 'react'
import { Card, CardContent, Typography, CardActions, Grid, IconButton, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';

const SubgredditCard = ({ list }) => {

    const handleSubPage = () => {

    }

    const handleDelete = () => {

    }

  return (
    <Card sx={{ minWidth: 275, borderRadius: 2, bgColor: "gray", border:2, borderColor: "#eeeeee"}}>
        <CardContent>
            <Typography sx={{ fontSize: 28 , mb: 1.5}} color="#5c6bc0" gutterBottom>
            {(list.length !== 0) && list.Name}  
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
                <Button variant="outlined">LEAVE</Button>
            </Grid>
        </Grid>
            
        </CardActions>
    </Card>
  )
}

export default SubgredditCard