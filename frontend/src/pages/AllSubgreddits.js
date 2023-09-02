import React from 'react'
import { ThemeProvider } from '@emotion/react';
import { AppBar, Toolbar, Typography, createTheme, Container, Box, CssBaseline, Avatar, Grid, TextField, Divider, Chip, Button, Stack, Menu, MenuItem, IconButton, getContrastRatio, Dialog, DialogActions, DialogContent
, DialogContentText, DialogTitle, InputAdornment, Tooltip, Paper, Pagination, Card, CardContent, CardActions, Tabs, Tab, InputBase, OutlinedInput, InputLabel, FormControl, ListItemText, Select, Checkbox} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { purple } from '@mui/material/colors';
import Followers from './Followers';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useParams} from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import AppBarRemaining from '../components/AppBarRemaining';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import PropTypes from 'prop-types';
import FeaturedPost from '../components/PostCard';
import NoteCard from '../components/NoteCard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FollowerCard from '../components/FollowerCard';
import MySubgredditUsers from '../components/MySubgredditUsers';
import JoiningRequests from '../components/JoiningRequests';
import SubgredditCard from '../components/subgredditCard';
import OtherSubgredditCard from '../components/OtherSubgredditCard';
import LayersIcon from '@mui/icons-material/Layers';
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const sorts = [
    "Sort by Name (Ascending)",
    "Sort by Name (Descending)",
    "Number of Followers (Descending)",
    "Creation Date (New First)",
    "None"
];


const AllSubgreddits = () => {

    const [subDetails, setSubDetails] = useState([]);
    const [otherSubDetails, setOtherSubDetails] = useState([]);
    const navigate = useNavigate(); 
    const [anchorElm, setAnchorElm] = useState(null);
    const [open, setOpen] = useState(false);
    const [subName, setSubName] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]);
    const [printSubs, setPrintSubs] = useState([]);
    const [sortName, setSortName] = useState(["None"]);
    const [subTimeSort, setSubTimeSort] = useState([]);
    const [otherSubTimeSort, setOtherSubTimeSort] = useState([]);
    const [currUser, setCurrUser] = useState("");

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
            setSelectedTags(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
     };

     const handleChange2 = (event) => {
        const {
            target: { value },
            } = event;
                setSortName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
            );
     };

     useEffect(() => 
     {
         const status = localStorage.getItem("currentUser");
         if(!status)
         {
             navigate('/');
         }
     });

    // console.log(selectedTags);

    const getCurrUser = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/allSubgreddits/getCurrUser", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
            });
      
            const response = await rawResponse.json();
            setCurrUser(response.list);
            // console.log(response.list);
            // setSubTimeSort(response.list);
            // setSubDetails(response.list);
      
            // if(response)
            //   setSubgredditList(response.list);
        }
      }

    useEffect(() => {
        getCurrUser();
    }, [])

    const getTimeDetails = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/allSubgreddits/getTime", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
            });
      
            const response = await rawResponse.json();
            // console.log(response.list);
            setSubTimeSort(response.list);
            // setSubDetails(response.list);
      
            // if(response)
            //   setSubgredditList(response.list);
        }
      }

    useEffect(() => {
        getTimeDetails();
    }, [])

    const getOtherTimeDetails = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/allSubgreddits/getOtherTime", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
            });
      
            const response = await rawResponse.json();
            // console.log(response.list);
            setOtherSubTimeSort(response.list);
      
            // if(response)
            //   setSubgredditList(response.list);
        }
      }

    useEffect(() => {
        getOtherTimeDetails();
    }, [])

    const getSubDetails = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/allSubgreddits/getFollowedSubs", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
            });
      
            const response = await rawResponse.json();
            // console.log(response.list);
            setSubDetails(response.list);
      
            // if(response)
            //   setSubgredditList(response.list);
        }
      }

    useEffect(() => {
        getSubDetails();
    }, [])

    // Sorted Followed Subgreddits in ascending order
    const sortedAscSubgreddits = subDetails.slice().sort((a, b) => {
        const nameA = a.Name.toUpperCase();
        const nameB = b.Name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

    // Sorted Followed Subgreddits in descending order
    const sortedDescSubgreddits = subDetails.slice().sort((a, b) => {
        const nameA = a.Name.toUpperCase();
        const nameB = b.Name.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });

    // Sorted Followed Subgreddits by Followers in descending order
    const sortedDescFollowersSubgreddits = subDetails.slice().sort((a,b) => {
        const num1 = a.Followers.length;
        const num2 = b.Followers.length;
        if (num1 < num2) {
            return 1;
        }
        if (num1 > num2) {
            return -1;
        }
        return 0;
    });

    const getOtherSubDetails = async () => {
        const name = localStorage.getItem("currentUser");
        
        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/allSubgreddits/getOtherSubs", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
            });
      
            const response = await rawResponse.json();
            // console.log(response.list);
            setOtherSubDetails(response.list);
      
            // if(response)
            //   setSubgredditList(response.list);
        }
      }

    useEffect(() => {
        getOtherSubDetails();
    }, [])


     // Sorted Other Subgreddits in ascending order
     const sortedAscOtherSubgreddits = otherSubDetails.slice().sort((a, b) => {
        const nameA = a.Name.toUpperCase();
        const nameB = b.Name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

     // Sorted Other Subgreddits in descending order
     const sortedDescOtherSubgreddits = otherSubDetails.slice().sort((a, b) => {
        const nameA = a.Name.toUpperCase();
        const nameB = b.Name.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });

    const getTags = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/allSubgreddits/getTags", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
            });
      
            const response = await rawResponse.json();
            // console.log(response.list);
            setTags(response.list);
      
            // if(response)
            //   setSubgredditList(response.list);
        }
      }

    useEffect(() => {
        getTags();
    }, [])

    // console.log(printSubs);

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

    const handleMySubgreddit = () =>
    {   
        navigate('/mysubgreddit');
    }
    const handleCloseMenu = () => {
        setAnchorElm(null);
        setOpen(false);
    }

    const handleMenuClick = (e) =>
    {
        setAnchorElm(e.currentTarget);
        setOpen(true);
    }

    const handleFollowers = () =>
    {
        navigate("/profile/followers"); 
    }
    const handleFollowing = () =>
    {
        navigate("/profile/following"); 
    }

    const handleProfile = () => 
    {
        navigate('/profile');
    }

    const handleSavedPosts = () => 
    {
        navigate('/savedPosts');
    }

    const handleLogout = () =>
    {
        localStorage.setItem("status", "authorize");
        localStorage.removeItem("currentUser");
        navigate('/');
    }

    const handleAllSubgreddits = () => 
    {
        navigate('/allsubgreddits');
    }

    const getData = (e) => 
    {
        const name = e.target.value;
        setSubName(name);
    }

    const handleSearch = () => {

    }

    // console.log(subName);
    // console.log(sortName[0])
    // setDateData(new Date(subDetails[0].creationDate)) 

  return (
    <ThemeProvider theme={theme}>
        <AppBar position="relative">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
            sx={{ mr: 0}}
        >
            <AdbIcon sx = {{width: "2rem", height: "2rem"}}/>
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight:500 }}>
            Greddiit
        </Typography>
        <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center', width: 400 , border: 1, borderColor: "lightblue", mr:3}}
            >
            <InputBase
                sx={{ ml: 1, flex: 1,}}
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search' }}
                onChange = {(e) => getData(e)}
                value = {subName}
            />
            <IconButton type="button" onClick = {handleSearch} sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <Tooltip title="Saved Posts">
        <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleSavedPosts}
                color="inherit"
        >
            <BookmarksIcon sx = {{width: "2rem", height: "2rem"}}/>
        </IconButton>
        </Tooltip>
        <Tooltip title="All Subgreddits">
        <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleAllSubgreddits}
                color="inherit"
        >
            <LayersIcon sx = {{width: "2rem", height: "2rem"}}/>
        </IconButton>
        </Tooltip>
        <Tooltip title="My Subgreddit">
        <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMySubgreddit}
                color="inherit"
            >
            <HomeIcon sx = {{width: "2rem", height: "2rem"}}/>
        </IconButton>
        </Tooltip>
        <div>
            <Tooltip title="Account">
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuClick}
                color="inherit"
            >
                <AccountCircle sx = {{width: "2rem", height: "2rem"}}/>
            </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorElm} open={open} onClose={handleCloseMenu}>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
        </Toolbar>
        </AppBar>
        <Grid container>
            <Grid item xs = {2.6}>
                <div>
                    <FormControl sx={{ mt:2, ml: 2, width: 300, }}>
                        <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
                        <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedTags}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        >
                        {tags.map((name) => (
                            <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedTags.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
            </Grid>
            <Grid item xs = {2.6}>
            <div>
                    <FormControl sx={{ mt:2, ml: 2, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Sort</InputLabel>
                        <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        // multiple
                        value={sortName}
                        onChange={handleChange2}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        >
                        {sorts.map((name) => (
                            <MenuItem key={name} value={name}>
                            <Checkbox checked={sortName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
            </Grid>
        </Grid>
        
                
        <Grid container spacing={5} sx={{ padding:4 }}>
            <Grid item xs={12}>
                <Paper sx={{minHeight:200, border:2, borderColor:"lightgray", padding:1.5}}>
                    <Typography color="textSecondary" sx={{fontWeight:400, fontSize:30, mb: 1, justifyContent:"center", textAlign:"center"}}>
                        Joined Subgreddits
                    </Typography>

                    {sortName.length === 0 || sortName[0] === "None" ? selectedTags.length === 0 ?
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                        {subDetails.map(user => (
                        subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                        <Grid item xs={6}>
                            <SubgredditCard list = {user} mod = {currUser} />
                        </Grid> : ""
                        ))}
                    </Grid>
                    : 
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                        {subDetails.map((sub) => {
                            let gridDisplayed = false;
                            return sub.Tags.map((tag) => {
                            if (selectedTags.includes(tag) && !gridDisplayed) {
                                gridDisplayed = true;
                                return (
                                <Grid item xs={6} key={sub.id}>
                                    <SubgredditCard list={sub} mod = {currUser}/>
                                </Grid>
                                );
                            } else {
                                return null;
                            }
                            });
                        })}
                    </Grid>
                    : sortName[0] === "Sort by Name (Ascending)" ? 
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                    {sortedAscSubgreddits.map(user => (
                    subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                    <Grid item xs={6}>
                        <SubgredditCard list = {user} mod = {currUser}/>
                    </Grid> : ""
                    ))}
                    </Grid>
                    :
                    sortName[0] === "Sort by Name (Descending)" ?
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                    {sortedDescSubgreddits.map(user => (
                    subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                    <Grid item xs={6}>
                        <SubgredditCard list = {user} mod = {currUser}/>
                    </Grid> : ""
                    ))}
                    </Grid>
                    :
                    sortName[0] === "Number of Followers (Descending)" ?
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                    {sortedDescFollowersSubgreddits.map(user => (
                    subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                    <Grid item xs={6}>
                        <SubgredditCard list = {user} mod = {currUser}/>
                    </Grid> : ""
                    ))}
                    </Grid>
                    :
                    sortName[0] === "Creation Date (New First)" ?
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                    {subTimeSort.map(user => (
                    subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                    <Grid item xs={6}>
                        <SubgredditCard list = {user} mod = {currUser}/>
                    </Grid> : ""
                    ))}
                    </Grid>
                    : ""}       
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{minHeight:200, border:2, borderColor:"lightgray", padding:1.5}}>
                    <Typography color="textSecondary" sx={{fontWeight:400, fontSize:27, mb: 1, justifyContent:"center", textAlign:"center"}}>
                        Other Subgreddits
                    </Typography>

                    {sortName.length === 0 || sortName[0] === "None" ? selectedTags.length === 0 ?
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                        {otherSubDetails.map(user => (
                        subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                        <Grid item xs={6}>
                            <OtherSubgredditCard list = {user} />
                        </Grid> : ""
                        ))}
                    </Grid>
                    : 
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                        {otherSubDetails.map((sub) => {
                            let gridDisplayed = false;
                            return sub.Tags.map((tag) => {
                            if (selectedTags.includes(tag) && !gridDisplayed) {
                                gridDisplayed = true;
                                return (
                                <Grid item xs={6} key={sub.id}>
                                    <OtherSubgredditCard list={sub} />
                                </Grid>
                                );
                            } else {
                                return null;
                            }
                            });
                        })}
                    </Grid>
                    : sortName[0] === "Sort by Name (Ascending)" ? 
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                    {sortedAscOtherSubgreddits.map(user => (
                    subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                    <Grid item xs={6}>
                        <OtherSubgredditCard list = {user} />
                    </Grid> : ""
                    ))}
                    </Grid>
                    :
                    sortName[0] === "Sort by Name (Descending)" ?
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                    {sortedDescOtherSubgreddits.map(user => (
                    subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                    <Grid item xs={6}>
                        <OtherSubgredditCard list = {user} />
                    </Grid> : ""
                    ))}
                    </Grid>
                    :
                    sortName[0] === "Number of Followers (Descending)" ?
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                    {sortedDescOtherSubgreddits.map(user => (
                    subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                    <Grid item xs={6}>
                        <OtherSubgredditCard list = {user} />
                    </Grid> : ""
                    ))}
                    </Grid>
                    :
                    sortName[0] === "Creation Date (New First)" ?
                    <Grid container spacing={5} sx={{padding:2, mb:2}}>
                    {otherSubTimeSort.map(user => (
                    subName === "" || user.Name.toLowerCase().includes(subName.toLowerCase()) ?
                    <Grid item xs={6}>
                        <SubgredditCard list = {user} />
                    </Grid> : ""
                    ))}
                    </Grid>
                    : ""}       
                </Paper>
            </Grid>
        </Grid>
    </ThemeProvider>
  )
}

export default AllSubgreddits