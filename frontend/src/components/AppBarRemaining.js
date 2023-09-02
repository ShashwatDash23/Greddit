import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Menu, MenuItem } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { purple } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import LayersIcon from '@mui/icons-material/Layers';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const AppBarRemaining = () => {
  const navigate = useNavigate(); 
  const [anchorElm, setAnchorElm] = useState(null);
  const [open, setOpen] = useState(false);

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

const handleSavedPosts = () => {
    navigate('/savedPosts');
}


  return (
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
  )
}

export default AppBarRemaining