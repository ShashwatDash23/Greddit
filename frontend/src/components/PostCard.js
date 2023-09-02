import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, createTheme, Container, Box, CssBaseline, Avatar, Grid, TextField, Divider, Chip, Button, Stack, Menu, MenuItem, IconButton, getContrastRatio, Dialog, DialogActions, DialogContent
  , DialogContentText, DialogTitle, InputAdornment, Tooltip, Paper, Pagination, Card, CardContent, CardActions, Tabs, Tab, CardMedia, CardActionArea, Collapse} from '@mui/material';
import { useState, useEffect } from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReportIcon from '@mui/icons-material/Report';
import CommentIcon from '@mui/icons-material/Comment';
import { styled } from '@mui/material/styles';
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
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

function PostCard({ post }) {

    const [commentOpen, setCommentOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [report, setReport] = useState([]);
    const [comment, setComment] = useState("");

    const refreshPage = () => {
      window.location.reload(false);
    } 

    const handleExpandClick =  async () => {
      const name = localStorage.getItem("currentUser");

      if(name != null)
      {
          const token = JSON.parse(name);

          const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/getComments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token.token,
            },
            body : JSON.stringify({ title : post.title })
          });
    
          const response = await rawResponse.json();
          setComments(response.list);
          console.log(response.list);
      }
      setExpanded(!expanded);
  };

    const handleCommentOpen = () => {
      setCommentOpen(true);
    };

    const handleCreateComment = async () => {

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
              body: JSON.stringify({title : post.title, content: comment})
          });

          const response = await rawResponse.json();
          alert(response.message)

          setComment("");

          setCommentOpen(false);
      }
    };

    const handleCommentClose = () => {
      setCommentOpen(false);
  };

      const handleUpvote = async () => {
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
              body : JSON.stringify({ title : post.title})
            });
      
            const response = await rawResponse.json();
        }
        refreshPage();
    }

    const handleDownvote = async () => {
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
              body : JSON.stringify({ title : post.title})
            });
      
            const response = await rawResponse.json();
        }
        refreshPage();
    }

      const handleFollowUser = async () => {
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
                body: JSON.stringify({title : post.title})
            });

            const response = await rawResponse.json();
            alert(response.message)
        }
    }

    const handleReportOpen = () => {
      setReportOpen(true);
    };

    const handleReportClose = () => {
        setReport("");
        setReportOpen(false);
    };

    const handleCreateReport = async () => {

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
                body: JSON.stringify({title:post.title, concern:report})
            });

            const response = await rawResponse.json();
            alert(response.message)

            setReport("");
        }
        setReportOpen(false);
    };

    const handleRemoveSavedPosts = async () => {
        const name = localStorage.getItem("currentUser");

        if(name != null)
        {
            const token = JSON.parse(name);

            const rawResponse = await fetch("http://localhost:8000/api/personalSubgreddit/removeSavedPosts", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-auth-token": token.token,
                },
                body: JSON.stringify({title : post.title})
            });

            const response = await rawResponse.json();
            alert(response.list)
        }
        refreshPage();
    }

  return (
    <Box>
      {post !== null ? 
      <CardActionArea component="a" href="#">
          <Card sx={{ display: 'flex', bgcolor:"#fafafa"}}>
          <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5" color="#5c6bc0">
              {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          {post.isUserBlocked ? "Blocked User" : post.author}
          </Typography>
          <Typography variant="subtitle1" paragraph color="green">
          Subgreddit : {post && post.partOfSubgreddit}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" paragraph>
              {post && post.content}
          </Typography>
          <CardActions disableSpacing>
              <Button onClick={handleUpvote} sx = {{color:"gray"}} startIcon={<ThumbUpIcon />}>{post.upvotes.length}</Button>
              <Button onClick={handleDownvote} sx = {{color:"gray"}} startIcon={<ThumbDownIcon />}>{post.downvotes.length}</Button>
              <Tooltip title="Follow User"><Button onClick={handleFollowUser} sx = {{color:"gray"}} startIcon={<PersonAddIcon />}></Button></Tooltip>
              <Tooltip title="Report Post"><Button onClick={handleReportOpen} sx = {{color:"gray"}} startIcon={<ReportIcon />}></Button></Tooltip>
              <Dialog open={reportOpen} onClose={handleReportClose}>
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
                      onChange = {(e) => setReport(e.target.value)}
                      value = {report}
                      sx = {{mt:1}}
                      />
                  </Grid>
                  </Grid>
              </Box>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleReportClose}>Cancel</Button>
              <Button onClick={handleCreateReport}>Report</Button>
              </DialogActions>
              </Dialog>
              <Tooltip title="Remove from Saved Posts"><Button onClick={handleRemoveSavedPosts} sx = {{color:"gray"}} startIcon={<DeleteSweepIcon />}></Button></Tooltip>
              <Tooltip title="Add Comment"><Button onClick={handleCommentOpen} sx = {{color:"gray"}} startIcon={<AddCommentIcon />}></Button></Tooltip>
              <Dialog open={commentOpen} onClose={handleCommentClose}>
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
                      onChange = {(e) => setComment(e.target.value)}
                      value = {comment}
                      sx = {{mt:1}}
                      />
                  </Grid>
                  </Grid>
              </Box>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleCommentClose}>Cancel</Button>
              <Button onClick={handleCreateComment}>Add</Button>
              </DialogActions>
              </Dialog>
              <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                  >
                  <CommentIcon />
              </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      {comments.length !== 0 ? comments.map((comment) => (
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
      : ""}
    </Box>
  )
}


export default PostCard;