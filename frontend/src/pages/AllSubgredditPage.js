import React from 'react'
import { ThemeProvider } from '@emotion/react';
import { AppBar, Toolbar, Typography, createTheme, Container, Box, CssBaseline, Avatar, Grid, TextField, Divider, Chip, Button, Stack, Menu, MenuItem, IconButton, getContrastRatio, Dialog, DialogActions, DialogContent
, DialogContentText, DialogTitle, InputAdornment, Tooltip, Paper, Pagination, Card, CardContent, CardActions, Tabs, Tab, CardMedia, CardActionArea, Collapse} from '@mui/material';
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
import PropTypes from 'prop-types';
import FeaturedPost from '../components/PostCard';
import NoteCard from '../components/NoteCard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FollowerCard from '../components/FollowerCard';
import MySubgredditUsers from '../components/MySubgredditUsers';
import JoiningRequests from '../components/JoiningRequests';
import AppBarRemaining from '../components/AppBarRemaining';
import SubgredditCard from '../components/subgredditCard';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReportIcon from '@mui/icons-material/Report';
import CommentIcon from '@mui/icons-material/Comment';
import { styled } from '@mui/material/styles';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CommentCard from '../components/CommentCard';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

const AllSubgredditPage = () => {

    const params = useParams();
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [comment1Open, setComment1Open] = useState(false);
    const [comment2Open, setComment2Open] = useState(false);
    const [report1Open, setReport1Open] = useState(false);
    const [report2Open, setReport2Open] = useState(false);
    const [page, setPage] = useState(1);
    const [subDetails, setSubDetails] = useState([]);
    const [posts, setPosts] = useState([]);
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [comments1, setComments1] = useState([]);
    const [comments2, setComments2] = useState([]);
    const [report1, setReport1] = useState([]);
    const [report2, setReport2] = useState([]);
    const [inpVal, setInpVal] = useState({
        title : "",
        content : "",
        partOfSubgreddit : ""
    });
    const [comment1, setComment1] = useState("");
    const [comment2, setComment2] = useState("");
    const navigate = useNavigate();
    // console.log(params.id);

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

    const getSubDetails = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/details", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
              body : JSON.stringify({ Name : params.id })
            });
      
            const response = await rawResponse.json();
            // console.log(response.list[0].Name);
            setInpVal({...inpVal, partOfSubgreddit : response.list[0].Name});
            setSubDetails(response.list);
      
            // if(response)
            //   setSubgredditList(response.list);
        }
      }

    useEffect(() => {
        getSubDetails();
    }, [])

    const getPosts = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/getPosts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
              body : JSON.stringify({ Name : params.id })
            });
      
            const response = await rawResponse.json();
            setPosts(response.list);
            
      
            // if(response)
            //   setSubgredditList(response.list);
        }
      }

    useEffect(() => {
        getPosts();
    }, [])

    const handleCreate = async () => {
        const { title, content, partOfSubgreddit } = inpVal;

        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/createPost", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({title:title, content:content, partOfSubgreddit:partOfSubgreddit})
            });

            const response = await rawResponse.json();
            alert(response.message)

            setInpVal({
                ...inpVal,
                title:"",
                content:"",
            });

            setDetailsOpen(false);
        }
        refreshPage();
    };

    const handleExpandClick1 =  async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/getComments", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
              body : JSON.stringify({ title : posts[page-1][0].title})
            });
      
            const response = await rawResponse.json();
            setComments1(response.list);
            console.log(response.list);
            
            // if(response)
            //   setSubgredditList(response.list);
        }
        setExpanded1(!expanded1);
    };

    const handleExpandClick2 =  async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
            // console.log("Hi");
      
            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/getComments", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
              body : JSON.stringify({ title : posts[page-1][1].title})
            });
      
            const response = await rawResponse.json();
            setComments2(response.list);
            console.log(response.list);
            
            // if(response)
            //   setSubgredditList(response.list);
        }
        setExpanded2(!expanded2);
    };

    const getData = (e) => {
        const {value, name} = e.target;
        setInpVal({
        ...inpVal,
        [name] : value,
        });
    };

    const handleDetailsOpen = () => {
        setDetailsOpen(true);
    };
    
    const handleDetailsClose = () => {
        setDetailsOpen(false);
    };

    const handleUpvote1 = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
      
            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/handleUpvote", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
              body : JSON.stringify({ title : posts[page-1][0].title})
            });
      
            const response = await rawResponse.json();
        }
        refreshPage();
    }

    const handleDownvote1 = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
      
            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/handleDownvote", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
              body : JSON.stringify({ title : posts[page-1][0].title})
            });
      
            const response = await rawResponse.json();
        }
        refreshPage();
    }

    const handleUpvote2 = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
      
            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/handleUpvote", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
              body : JSON.stringify({ title : posts[page-1][1].title})
            });
      
            const response = await rawResponse.json();
        }
        refreshPage();
    }

    const handleDownvote2 = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);
      
            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/handleDownvote", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
              },
              body : JSON.stringify({ title : posts[page-1][1].title})
            });
      
            const response = await rawResponse.json();
        }

        refreshPage();
    }


    const handleCreateComment1 = async () => {

        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/addComment", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({title : posts[page-1][0].title, content: comment1})
            });

            const response = await rawResponse.json();
            alert(response.message)

            setComment1("");

            setComment1Open(false);
        }
    };

    const handleCreateComment2 = async () => {

        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/addComment", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({title : posts[page-1][1].title, content: comment2})
            });

            const response = await rawResponse.json();
            alert(response.message)

            setComment2("");

            setComment2Open(false);
        }
    };
    
    const handleCommentOpen1 = () => {
        setComment1Open(true);
    };

    const handleCommentClose1 = () => {
        setComment1Open(false);
    };

    const handleCommentOpen2 = () => {
        setComment2Open(true);
    }
    
    const handleCommentClose2 = () => {
        setComment2Open(false);
    };

    const handleFollowUser1 = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/handleFollow", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({title : posts[page-1][0].title})
            });

            const response = await rawResponse.json();
            alert(response.message)
        }
    }

    const handleFollowUser2 = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/handleFollow", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({title : posts[page-1][1].title})
            });

            const response = await rawResponse.json();
            alert(response.message)
        }
    }

    // for reports

    const handleReportOpen1 = () => {
        setReport1Open(true);
    };

    const handleReportClose1 = () => {
        setReport1("");
        setReport1Open(false);
    };

    const handleCreateReport1 = async () => {

        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/reportPost", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({title:posts[page-1][0].title, concern:report1})
            });

            const response = await rawResponse.json();
            alert(response.message)

            setReport1("");
        }
        setReport1Open(false);
    };

    const handleCreateReport2 = async () => {

        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/reportPost", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({title:posts[page-1][1].title, concern:report2})
            });

            const response = await rawResponse.json();
            alert(response.message)

            setReport2("");
        }
        setReport2Open(false);
    };

    const handleReportOpen2 = () => {
        setReport2Open(true);
    };

    const handleReportClose2 = () => {
        setReport2Open(false);
    };

    const handleSavedPosts1 = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/handleSavedPosts", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({ title: posts[page-1][0].title })
            });

            const response = await rawResponse.json();
            alert(response.message)
        }
    }

    const handleSavedPosts2 = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/handleSavedPosts", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({ title: posts[page-1][1].title })
            });

            const response = await rawResponse.json();
            alert(response.message)
        }
    };

    // console.log(subDetails.Name);

    return (
        <ThemeProvider theme={theme}>
            <AppBarRemaining />

            <Grid container component="main" sx={{ height: '91.5vh' }}>
            <CssBaseline />
                <Grid
                    item
                    xs={12}
                    sm={7}
                    md={6}
                    sx={{backgroundColor: "white"}}
                    
                >
                    <Card sx={{ minWidth: 100, borderRadius: 2, bgColor: "gray", border:3, borderColor: "lightgray", m:5, p:3 }}>
                        <CardMedia
                            component="img"
                            sx={{
                            height:370
                            
                            }}
                            image="https://images.unsplash.com/photo-1674239687175-72ac5a535e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NzIxNjM4NA&ixlib=rb-4.0.3&q=80&w=1080"
                            // image="https://source.unsplash.com/random"
                            alt="random"
                        />
                        <CardContent>
                        <Typography sx={{ fontSize: 28 , mb: 1.5}} color="#5c6bc0" gutterBottom>
                                Gr/{(subDetails.length !== 0) && subDetails[0].Name}  
                            </Typography>
                            <Typography sx={{ fontSize: 18 , mb: 5}} color="textSecondary" gutterBottom>
                                {(subDetails.length !== 0) && subDetails[0].Description}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="green">
                                Tags : {(subDetails.length !== 0) && (subDetails[0].Tags !== []) && (subDetails[0].Tags.map(tag => (
                                tag + ", "
                                )) )}
                            </Typography>
                            <Typography sx={{ }} color="red">
                                Banned Keywords : {(subDetails.length !== 0) && (subDetails[0].Banned !== []) && (subDetails[0].Banned.map(banned => (
                                banned + ", "
                                )) )}
                            </Typography>
                            </CardContent>
                            <CardActions>
                            <Grid container>
                                <Grid item xs = {6} sx={{mb:2}}>
                                <Typography variant="h6" component="div" color="textSecondary">
                                    Followers : {(subDetails.length !== 0) && subDetails[0].Followers.length}
                                </Typography>
                                </Grid>
                                <Grid item xs = {6} sx = {{mb:2}}>
                                <Typography variant="h6" component="div" color="textSecondary">
                                    Posts : {(subDetails.length !== 0) && subDetails[0].Posts.length}
                                </Typography>
                                </Grid>
                            </Grid>
                            
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={false} sm={5} md={6} component={Paper} elevation={6} square>
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
                        <Button onClick={handleDetailsOpen} variant="contained" sx={{height: '8vh', bgcolor: '#3f51b5', mb: 4}}>Create a new Post</Button>
                        <Dialog open={detailsOpen} onClose={handleDetailsClose}>
                            <DialogTitle>Create a new Post</DialogTitle>
                            <DialogContent>
                            <Box 
                                component = "form" 
                                noValidate
                                elevation = {10}
                                >
                                <Grid container spacing = {1.5}>
                                <Grid item xs={12}>
                                    <TextField 
                                    autoComplete='title'
                                    name = "title"
                                    fullWidth
                                    id = "title"
                                    label = "Title of Post" 
                                    onChange = {getData}
                                    value = {inpVal.title}
                                    sx = {{mt:1}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                    autoComplete='content'
                                    name = "content"
                                    fullWidth
                                    multiline
                                    id = "content"
                                    label = "Post Content"
                                    onChange = {getData} 
                                    sx = {{mt:1}}
                                    value = {inpVal.content}
                                    />
                                </Grid>
                                </Grid>
                            </Box>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleDetailsClose}>Cancel</Button>
                            <Button onClick={handleCreate}>Create</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Divider />
                    </Box>
                    <Box>
                    <Grid container spacing = {1.5} 
                        sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}>
                        <Grid item xs = {12}>
                        <Typography color="textSecondary" sx={{fontWeight:400, fontSize:30, mb: 1, justifyContent:"center"}}>Posts</Typography>
                        </Grid>
                        <Grid item xs = {12}>
                            <Pagination
                                count={posts.length}
                                variant="outlined"
                                onChange={(event, value) => setPage(value)}
                                sx = {{mb: 1}}
                            />
                        </Grid>
                    </Grid>
                    </Box>
                    {posts[page-1] && posts[page-1][0] ?
                    <Grid item xs={12} sx = {{ p:4 }}>
                        <CardActionArea component="a" href="#">
                        <Card sx={{ display: 'flex' }}>
                        <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5" color="#5c6bc0">
                            {posts[page-1] && posts[page-1][0].title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                        {posts[page-1] && (posts[page-1][0].isUserBlocked ? "Blocked User" : posts[page-1][0].author)}
                        </Typography>
                        <Typography variant="subtitle1" paragraph color="green">
                        Subgreddit : {posts[page-1] && posts[page-1][0].partOfSubgreddit}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" paragraph>
                            {posts[page-1] && posts[page-1][0].content}
                        </Typography>
                        <CardActions disableSpacing>
                            <Button onClick={handleUpvote1} sx = {{color:"gray"}} startIcon={<ThumbUpIcon />}>{posts[page-1] && posts[page-1][0] && posts[page-1][0].upvotes.length}</Button>
                            <Button onClick={handleDownvote1} sx = {{color:"gray"}} startIcon={<ThumbDownIcon />}>{posts[page-1] && posts[page-1][0] && posts[page-1][0].downvotes.length   }</Button>
                            <Tooltip title="Follow User"><Button onClick={handleFollowUser1} sx = {{color:"gray"}} startIcon={<PersonAddIcon />}></Button></Tooltip>
                            <Tooltip title="Save Post"><Button onClick={handleSavedPosts1} sx = {{color:"gray"}} startIcon={<BookmarkAddIcon />}></Button></Tooltip>
                            <Tooltip title="Report Post"><Button onClick={handleReportOpen1} sx = {{color:"gray"}} startIcon={<ReportIcon />}></Button></Tooltip>
                            <Dialog open={report1Open} onClose={handleReportClose1}>
                            <DialogTitle>Report Post</DialogTitle>
                            <DialogContent>
                            <Box 
                                component = "form" 
                                noValidate
                                elevation = {10}
                                >
                                <Grid container spacing = {1.5}>
                                <Grid item xs={12}>
                                    <TextField 
                                    autoComplete='report'
                                    name = "report"
                                    fullWidth
                                    multiline
                                    id = "report"
                                    label = "Reason for report" 
                                    onChange = {(e) => setReport1(e.target.value)}
                                    value = {report1}
                                    sx = {{mt:1}}
                                    />
                                </Grid>
                                </Grid>
                            </Box>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleReportClose1}>Cancel</Button>
                            <Button onClick={handleCreateReport1}>Report</Button>
                            </DialogActions>
                            </Dialog>
                            <Tooltip title="Add Comment"><Button onClick={handleCommentOpen1} sx = {{color:"gray"}} startIcon={<AddCommentIcon />}></Button></Tooltip>
                            <Dialog open={comment1Open} onClose={handleCommentClose1}>
                            <DialogTitle>Add Comment</DialogTitle>
                            <DialogContent>
                            <Box 
                                component = "form" 
                                noValidate
                                elevation = {10}
                                >
                                <Grid container spacing = {1.5}>
                                <Grid item xs={12}>
                                    <TextField 
                                    autoComplete='comment'
                                    name = "comment"
                                    fullWidth
                                    id = "comment"
                                    label = "Comment" 
                                    onChange = {(e) => setComment1(e.target.value)}
                                    value = {comment1}
                                    sx = {{mt:1}}
                                    />
                                </Grid>
                                </Grid>
                            </Box>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleCommentClose1}>Cancel</Button>
                            <Button onClick={handleCreateComment1}>Add</Button>
                            </DialogActions>
                            </Dialog>
                            <ExpandMore
                                expand={expanded1}
                                onClick={handleExpandClick1}
                                aria-expanded={expanded1}
                                aria-label="show more"
                                >
                                <CommentIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded1} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {comments1.length !== 0 ? comments1.map((comment) => (
                                        <CommentCard note = {comment} />
                                    )) : ""}
                                </Grid>
                            </Grid>
                            </CardContent>
                        </Collapse>
                        </CardContent>
                        <CardMedia
                        component="img"
                        sx={{ width: 180, display: { xs: 'none', sm: 'block' } }}
                        image="https://images.unsplash.com/photo-1674840690385-520922dbd526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NzIyMjgxNA&ixlib=rb-4.0.3&q=80&w=1080"
                        alt="hello"
                        />
                        </Card>
                    </CardActionArea>
                    </Grid>
                    : ""}
                    {posts[page-1] && posts[page-1][1] ? 
                    <Grid item xs={12} sx = {{ p:4 }}>
                        <CardActionArea component="a" href="#">
                        <Card sx={{ display: 'flex' }}>
                        <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5" color="#5c6bc0">
                            {posts[page-1] && posts[page-1][1] && posts[page-1][1].title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                        {posts[page-1] && posts[page-1][1] && (posts[page-1][1].isUserBlocked ? "Blocked User" : posts[page-1][1].author)}
                        </Typography>
                        <Typography variant="subtitle1" paragraph color="green">
                        Subgreddit : {posts[page-1] && posts[page-1][1] && posts[page-1][1].partOfSubgreddit}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" paragraph>
                            {posts[page-1] && posts[page-1][1] && posts[page-1][1].content}
                        </Typography>
                        <CardActions disableSpacing>
                            <Button onClick={handleUpvote2} sx = {{color:"gray"}} startIcon={<ThumbUpIcon />}>{posts[page-1] && posts[page-1][1] && posts[page-1][1].upvotes.length}</Button>
                            <Button onClick={handleDownvote2} sx = {{color:"gray"}} startIcon={<ThumbDownIcon />}>{posts[page-1] && posts[page-1][1] && posts[page-1][1].downvotes.length}</Button>
                            <Tooltip title="Add User"><Button onClick={handleFollowUser2} sx = {{color:"gray"}} startIcon={<PersonAddIcon />}></Button></Tooltip>
                            <Tooltip title="Save Post"><Button onClick={handleSavedPosts2} sx = {{color:"gray"}} startIcon={<BookmarkAddIcon />}></Button></Tooltip>
                            <Tooltip title="Report Post"><Button onClick={handleReportOpen2} sx = {{color:"gray"}} startIcon={<ReportIcon />}></Button></Tooltip>
                            <Dialog open={report2Open} onClose={handleReportClose2}>
                            <DialogTitle>Report Post</DialogTitle>
                            <DialogContent>
                            <Box 
                                component = "form" 
                                noValidate
                                elevation = {10}
                                >
                                <Grid container spacing = {1.5}>
                                <Grid item xs={12}>
                                    <TextField 
                                    autoComplete='report'
                                    name = "report"
                                    fullWidth
                                    id = "report"
                                    label = "Reason for report" 
                                    onChange = {(e) => setReport2(e.target.value)}
                                    value = {report2}
                                    sx = {{mt:1}}
                                    />
                                </Grid>
                                </Grid>
                            </Box>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleReportClose2}>Cancel</Button>
                            <Button onClick={handleCreateReport2}>Report</Button>
                            </DialogActions>
                            </Dialog>

                            <Tooltip title="Add Comment"><Button onClick={handleCommentOpen2} sx = {{color:"gray"}} startIcon={<AddCommentIcon />}></Button></Tooltip>
                            <Dialog open={comment2Open} onClose={handleCommentClose2}>
                            <DialogTitle>Add Comment</DialogTitle>
                            <DialogContent>
                            <Box 
                                component = "form" 
                                noValidate
                                elevation = {10}
                                >
                                <Grid container spacing = {1.5}>
                                <Grid item xs={12}>
                                    <TextField 
                                    autoComplete='comment'
                                    name = "comment"
                                    fullWidth
                                    id = "comment"
                                    label = "Comment" 
                                    onChange = {(e) => setComment2(e.target.value)}
                                    value = {comment2}
                                    sx = {{mt:1}}
                                    />
                                </Grid>
                                </Grid>
                            </Box>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleCommentClose2}>Cancel</Button>
                            <Button onClick={handleCreateComment2}>Add</Button>
                            </DialogActions>
                            </Dialog>
                            <ExpandMore
                                expand={expanded2}
                                onClick={handleExpandClick2}
                                aria-expanded={expanded2}
                                aria-label="show more"
                                >
                                <CommentIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded2} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {comments2.length !== 0 ? comments2.map((comment) => (
                                        <CommentCard note = {comment} />
                                    )) : ""}
                                </Grid>
                            </Grid>
                            </CardContent>
                        </Collapse>
                        </CardContent>
                        <CardMedia
                        component="img"
                        sx={{ width: 180, display: { xs: 'none', sm: 'block' } }}
                        image="https://images.unsplash.com/photo-1674840690385-520922dbd526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NzIyMjgxNA&ixlib=rb-4.0.3&q=80&w=1080"
                        alt="hello"
                        />
                        </Card>
                    </CardActionArea>
                    </Grid>
                    : ""}
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default AllSubgredditPage