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
import { Route, Routes, useNavigate} from 'react-router-dom';

import SignUp from './SignUp';
import SignIn from './SignIn';
import ProfilePage from './ProfilePage';

const StartPage = () => {

  const [login, setLogin] = useState(true);  

  return (
    (login ? <SignIn login={login} setLogin ={setLogin}/> : <SignUp login={login} setLogin ={setLogin}/>)
  )
}

export default StartPage