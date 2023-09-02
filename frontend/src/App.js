import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { AppBar, Button, Typography, Container, createTheme, ThemeProvider, makeStyles, TextField, Avatar, Toolbar, CssBaseline, Box, Grid, Link, InputAdornment, IconButton } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import RedditIcon from '@mui/icons-material/Reddit';
import { purple } from '@mui/material/colors';
import { bgcolor, borderRadius, padding } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import {useState, useEffect} from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MySubgreddit from './pages/MySubgreddit';
import ProfilePage from './pages/ProfilePage';
import Followers from './pages/Followers';
import Following from './pages/Following';
import StartPage from './pages/StartPage';
import MySubgredditPage from './pages/MySubgredditPage';
import AllSubgreddits from './pages/AllSubgreddits';
import AllSubgredditPage from './pages/AllSubgredditPage';
import SavedPosts from './pages/SavedPosts';

function App() {
  const [status, setStatus] = useState(localStorage.getItem("status"));

  useEffect(() => {
    if(!status)
    {
      setStatus("authorize");
      localStorage.setItem("status", "authorize");
    }
  }, [status]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<StartPage/>} />
      <Route path='/profile' element = {<ProfilePage/>} />
      <Route path='/profile/followers' element = {<Followers/>}/>
      <Route path='/profile/following' element = {<Following/>}/>
      <Route path='/mysubgreddit' element = {<MySubgreddit />} />
      <Route path='/mysubgreddit/:id' element = {<MySubgredditPage />} />
      <Route path='/allsubgreddits' element = {<AllSubgreddits />} />
      <Route path='/allsubgreddits/:id' element = {<AllSubgredditPage />} />
      <Route path='/savedPosts' element = {<SavedPosts />} />
    </Routes>
    </BrowserRouter>
    // (login ? <SignIn login={login} setLogin ={setLogin}/> : <SignUp login={login} setLogin ={setLogin}/>)
  )
}

export default App;
