import { ThemeProvider, AppBar, Toolbar, Typography, IconButton, createTheme, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AdbIcon from '@mui/icons-material/Adb';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { SiFoodpanda } from "react-icons/si";

const AppBarLogin = ( {login, setLogin} ) => {

const navigate = useNavigate();

const theme = createTheme({
    palette: {
        primary: {
        main: '#283593',
        },
        secondary: {
        main: purple[600],
        },
        // background: {
        //   default: '#cfd8dc',
        // }
    },
    });

    const handleHome = () =>
    {
        navigate('/home');
    }

  return (
    <ThemeProvider theme={theme}>
        <AppBar position="relative">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0 }}
            >
                <AdbIcon sx = {{width: "2rem", height: "2rem"}}/>
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
                Greddiit
            </Typography>
            <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setLogin(!login)}
                color="inherit"
                sx = {{mt: 0.3, mr: 2, fontWeight: 500}}
            >
                {login ? "SIGN UP" : "SIGN IN"} 
            </IconButton>
            <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleHome}
                    color="inherit"
                >
                <HomeIcon sx = {{width: "2rem", height: "2rem"}}/>
            </IconButton>
            </Toolbar>
        </AppBar>
    </ThemeProvider>
  )
}

export default AppBarLogin