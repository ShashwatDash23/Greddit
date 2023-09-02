import React from 'react'
import { ThemeProvider } from '@emotion/react';
import { AppBar, Toolbar, Typography, createTheme, Container, Box, CssBaseline, Avatar, Grid, TextField, Divider, Chip, Button, Stack, Menu, MenuItem, IconButton, getContrastRatio, Dialog, DialogActions, DialogContent
, DialogContentText, DialogTitle, InputAdornment, Tooltip, Paper, Pagination, Card, CardContent, CardActions, Tabs, Tab} from '@mui/material';
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
import Reports from '../components/Reports';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
const MySubgredditPage = () => {

    const params = useParams();  
    console.log(params);
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

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

    useEffect(() => 
    {
        const status = localStorage.getItem("currentUser");
        if(!status)
        {
            navigate('/');
        }
    });

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (

    <ThemeProvider theme={theme}>
        <AppBarRemaining />
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" variant="fullWidth"
              sx={{color:"blue", mt:0.5}}>
            {/* <Tab icon={<DescriptionIcon />} label="HOME" /> */}
            <Tab icon={<GroupIcon />} label="USERS" />
            <Tab icon={<GroupAddIcon />} label="JOINING REQUESTS" />
            <Tab icon={<BarChartIcon />} label="STATS" />
            <Tab icon={<ReportIcon />} label="REPORTS" />
        </Tabs>
        <TabPanel value={value} index={0}>
            <MySubgredditUsers params = {params} />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <JoiningRequests params = {params} />
        </TabPanel>
        <TabPanel value={value} index={3}>
            <Reports params = {params} />
        </TabPanel>
    </ThemeProvider>
  )
}

export default MySubgredditPage