import React from 'react'
import { ThemeProvider } from '@emotion/react';
import { AppBar, Toolbar, Typography, createTheme, Container, Box, CssBaseline, Avatar, Grid, TextField, Divider, Chip, Button, Stack, Menu, MenuItem, IconButton, getContrastRatio, Dialog, DialogActions, DialogContent
, DialogContentText, DialogTitle, InputAdornment, Tooltip, Paper, Pagination, Card, CardContent, CardActions} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { purple } from '@mui/material/colors';
import Followers from './Followers';
import { BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import AppBarRemaining from '../components/AppBarRemaining';

const MySubgreddit = () => {

  const navigate = useNavigate(); 
  const [anchorElm, setAnchorElm] = useState(null);
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [subgredditList, setSubgredditList] = useState("");
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [bannedWords, setBannedWords] = useState("");
  const [followersList, setFollowersList] = useState([]);
  const [bannedList, setBannedList] = useState([]);
  const [inpVal, setInpVal] = useState({
    Name : "",
    Description : "",
    Tags : "",
    Banned : "",
})

const name = localStorage.getItem("currentUser");

const getDetails = async () => {
  if(name != null)
  {
      const token = JSON.parse(name);

      const rawResponse = await fetch("http://localhost:8000/api/subgreddits/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token.token,
        },
      });

      const response = await rawResponse.json();
      // console.log(response.list[0]);

      if(response)
        setSubgredditList(response.list);
  }
  
}

const refreshPage = () => {
  window.location.reload(false);
}

useEffect(() => 
{
    const status = localStorage.getItem("currentUser");
    if(!status)
    {
        navigate('/');
    }
});

useEffect(() => {
  // console.log("Hello");
  getDetails();
  // console.log(subgredditList[0].Tags);
}, []);

const printTags = (j) => {
  let temp = "";
  console.log("Hi")
  if(subgredditList[j])
  {
    for(let i=0; i<subgredditList[j].Tags.length; i++)
    {
      if(i===subgredditList[j].Tags.length - 1)
        temp = temp + subgredditList[j].Tags[i];
      else
        temp = temp + subgredditList[j].Tags[i] + ', ';   
    }

    setTags(temp);
    return temp;
  }
  else {
    return false;
  } 
}

const theme = createTheme({
  palette: {
      primary: {
      main: '#283593',
      },
      secondary: {
      main: purple[600],
      },
      background: {
      default: '#f5f5f5',
      }
  },
}); 

const handleCancelDetails = () => {
  // setInpVal(user);
  setDetailsOpen(false);
}

const getData = (e) => {
  const {value, name} = e.target;
  setInpVal({
  ...inpVal,
  [name] : value,
  });
}
  // console.log(subgredditList);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleDetailsOpen = () => {
      setDetailsOpen(true);
  };
  
  const handleDetailsClose = () => {
      setDetailsOpen(false);
  };

  const handleCreate = async (e) => 
  {
      e.preventDefault();

      const {Name, Description, Tags, Banned} = inpVal;
      // console.log(inpVal);
      let TagsList;
      let BannedList;
      if(inpVal.Tags !== "") {
        TagsList = Tags.split(',');
      }
      if(inpVal.Banned !== "") {
        BannedList = Banned.split(',');
      }
      // console.log(TagsList);

      setInpVal({
        Name : "",
        Description : "",
        Tags : "",
        Banned : "",
      });

      const name = localStorage.getItem("currentUser");
      if(name != null)
      {
          const token = JSON.parse(name);

          const rawResponse = await fetch("http://localhost:8000/api/subgreddits/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token.token,
            },
            body: JSON.stringify({ Name, Description, TagsList, BannedList})
          });

          const response = await rawResponse.json();

          // setMessage(response.message);
          alert(response.message);
      }
      // alert(message);

      setDetailsOpen(false);
      refreshPage();
  }

  const handleDelete = async () => {
    const name = localStorage.getItem("currentUser");
    if(name != null)
    {
        const token = JSON.parse(name);
        console.log(subgredditList[page-1].Name)
  
        const rawResponse = await fetch("http://localhost:8000/api/subgreddits/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token.token,
          },
          body: JSON.stringify({ Name : subgredditList[page-1].Name}),
        });
  
        const response = await rawResponse.json();
        alert(response.message);
        // setMessage(response.message);
      }
      // alert(message);
      refreshPage();
  }

  const handleSubPage = async () => {
      navigate(`/mysubgreddit/${subgredditList[page-1].Name}`);
  }

  return (
    <ThemeProvider theme={theme}>
          <AppBarRemaining />

          <Grid container component="main" sx={{ height: '91.5vh' }}>
            <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1674042981655-9ceaca15a2b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NjU4Nzc1Mg&ixlib=rb-4.0.3&q=80&w=1080)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
            sx={{
              my: 5,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              // alignItems: 'center',
            }}
          >
            <Box sx = {{display : 'flex', flexDirection: 'column', alignItems : 'center'}}>
            <Button onClick={handleDetailsOpen} variant="contained" sx={{height: '8vh', bgcolor: '#3f51b5', mb: 5}}>Create a new Subgreddit</Button>
            <Dialog open={detailsOpen} onClose={handleDetailsClose}>
                  <DialogTitle>Create a new Subgreddit</DialogTitle>
                  <DialogContent>
                  <Box 
                      component = "form" 
                      noValidate
                      elevation = {10}
                      >
                      <Grid container spacing = {1.5}>
                      <Grid item xs={12}>
                          <TextField 
                          autoComplete='Name'
                          name = "Name"
                          fullWidth
                          id = "Name"
                          label = "Name of the Subgreddit" 
                          onChange = {getData}
                          value = {inpVal.Name}
                          sx = {{mt:1}}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField 
                          autoComplete='Description'
                          name = "Description"
                          fullWidth
                          multiline
                          id = "Description"
                          label = "Description"
                          onChange = {getData} 
                          sx = {{mt:1}}
                          value = {inpVal.Description}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField 
                          autoComplete='Tags'
                          name = "Tags"
                          fullWidth
                          id = "Tags"
                          label = "Tags (Comma Separated, lowercase)" 
                          onChange = {getData}
                          
                          value = {inpVal.Tags}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField 
                          autoComplete='Banned'
                          name = "Banned"
                          fullWidth
                          id = "Banned"
                          label = "Banned Keywords (Comma Separated)" 
                          onChange = {getData}
                          
                          value = {inpVal.Banned}
                          />
                      </Grid>
                      </Grid>
                  </Box>
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={handleCancelDetails}>Cancel</Button>
                  <Button onClick={handleCreate}>Create</Button>
                  </DialogActions>
              </Dialog>
              </Box>
              <Divider sx={{mb: 4}}/>
              <Box>
                <Grid container spacing = {1.5} 
                sx = {{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',}}>
                  <Grid item xs = {12}>
                  <Typography color="textSecondary" sx={{fontWeight:400, fontSize:27, mb: 1, justifyContent:"center"}}>Existing Subgreddits</Typography>
                  </Grid>
                  <Grid item xs = {12}>
                      <Pagination
                        count={subgredditList.length}
                        variant="outlined"
                        onChange={(event, value) => setPage(value)}
                        sx = {{mb: 7}}
                      />
                  </Grid>
                </Grid>
            </Box>

            {(subgredditList.length !== 0) ?            
            <Card sx={{ minWidth: 275, borderRadius: 2, bgColor: "gray", border:2, borderColor: "#eeeeee"}}>
                <CardContent>
                  <Typography sx={{ fontSize: 28 , mb: 1.5}} color="#5c6bc0" gutterBottom>
                    {(subgredditList.length !== 0) && subgredditList[page-1].Name}  
                  </Typography>
                  <Typography sx={{ fontSize: 18 , mb: 5}} color="textSecondary" gutterBottom>
                    {(subgredditList !== "") && subgredditList[page-1].Description}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="green">
                    Tags : {(subgredditList !== "") && (subgredditList[page-1].Tags !== []) && (subgredditList[page-1].Tags.map(tag => (
                      tag + ", "
                    )) )}
                  </Typography>
                  <Typography sx={{ }} color="red">
                    Banned Keywords : {(subgredditList !== "") && (subgredditList[page-1].Banned !== []) && (subgredditList[page-1].Banned.map(banned => (
                      banned + ", "
                    )) )}
                  </Typography>
                </CardContent>
                <CardActions>
                <Grid container>
                    <Grid item xs = {6} sx={{mb:2}}>
                      <Typography variant="h6" component="div" color="textSecondary">
                        Followers : {(subgredditList !== "") && subgredditList[page-1].Followers.length}
                      </Typography>
                    </Grid>
                    <Grid item xs = {6} sx = {{mb:2}}>
                      <Typography variant="h6" component="div" color="textSecondary">
                        Posts : {(subgredditList !== "") && subgredditList[page-1].Posts.length}
                      </Typography>
                    </Grid>
                    <Grid item xs = {6}>
                      <IconButton onClick={handleSubPage}>
                        <LaunchIcon size="large"></LaunchIcon>
                      </IconButton>
                      
                    </Grid>
                    <Grid item xs = {6} sx={{display:"flex", justifyContent:"end"}}>
                      <IconButton onClick={handleDelete}>
                        <DeleteIcon size="large"></DeleteIcon>
                      </IconButton>
                    </Grid>
                </Grid>
                  
                </CardActions>
            </Card>
            : <Typography color="textSecondary" sx={{mt:1, fontWeight:400, fontSize:21, mb: 1, justifyContent:"center", textAlign:"center"}}>No Existing Subgreddits</Typography>}

            </Box>
        </Grid>
      </Grid>


      </ThemeProvider>
  )
}

export default MySubgreddit;