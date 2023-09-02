const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Subgreddits = require('../models/MySubgredditModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const Report = require('../models/reportModel');
const requireAuth = require('../middleware/requireAuth');
const { response } = require('express');

const router = express.Router();

// getting subgreddit details
router.post('/details', requireAuth, async (req, res) => {
    try {
        const { Name } = req.body;
        const currSub = await Subgreddits.find({Name : Name});
        // console.log(currSub);
        res.json({list: currSub});
    }
    catch (err) {
        res.json({list: err});
    }
})

// creating a post
router.post('/createPost', requireAuth, async (req, res) => {
    try {
        const { title, content, partOfSubgreddit } = req.body;
        const currUser = await User.findById(req.id);
        const currSub = await Subgreddits.findOne({Name : partOfSubgreddit})

        if(!title || !content || !partOfSubgreddit) {
            throw Error("Required field!");
        }

  
        let text = content;
        let text2 = [];
        text = text.split(" ");
        // console.log(text);
        for(let i = 0; i < text.length; i++)
        {
            let text3 = text[i].replace(/[^a-zA-Z ]/g, "").toLowerCase();
            if (currSub.Banned.includes(text3)) {
                text2.push("*****");
            }
            else {
                text2.push(text[i]);
            }
        }
        text2 = text2.join(" ");
        

        // console.log(title, content, partOfSubgreddit);

        const post = await Post.create({
            title : title,
            content : text2,
            partOfSubgreddit : partOfSubgreddit,
            author : currUser.firstName + " " + currUser.lastName,
            upvotes : [],
            downvotes : [],
            Comments : [],
            isComment : false,
            reports : [],
            isUserBlocked : false,
        });

        // console.log(post);

        const list = currSub.Posts;
        list.push(post._id);
        currSub.Posts = list;
        currSub.save();

        res.status(200).send({message : "Post created successfully!"});
    }
    catch (err) {
        res.status(400).send({message : err});
    }
})

// get posts 
router.post('/getPosts',requireAuth, async (req, res) => {
    try {
        const { Name } = req.body;
        // console.log(Name);
        const currSub = await Subgreddits.findOne({Name : Name});
        // console.log(currSub.Posts);
        // const listOfFollowers = [];
        const user = await User.findById(req.id);
        const listOfPosts = []

        if(currSub)
        {
            const list = currSub.Posts;
            // console.log(list);
            const listLength = list.length;
            for(let i=0; i<listLength; i+=2)
            {
                // console.log("hello");

                const tempList = [];
                if(list[i])
                {
                    const postID1 = list[i].toString();
                    const post1 = await Post.findById(postID1);
                    tempList.push(post1);
                }
                if(list[i+1])
                {
                    const postID2 = list[i+1].toString();
                    const post2 = await Post.findById(postID2);
                    tempList.push(post2);
                }
                listOfPosts.push(tempList);
            }

            // console.log(listOfPosts);

            res.send({list : listOfPosts});
        }
        else
            res.send({list : "User does not exist!"});

    }
    catch (err) {
        res.send({list : err});
    }
})

// add a comment
router.post('/addComment', requireAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const currUser = await User.findById(req.id);
        const currPost = await Post.findOne({title : title})

        // console.log(title, content, currPost._id);

        if(!content) {
            throw Error("Required field!");
        }

        const comment = await Comment.create({
            content : content,
            partOfPost : currPost._id,
            user : currUser.firstName + " " + currUser.lastName,
        });


        currPost.Comments.push(comment);
        currPost.save();

        res.status(200).send({message : "Comment added successfully!"});
    }
    catch (err) {
        res.status(400).send({message : "Could not add comment"});
    }
})

// get comments
router.post('/getComments', requireAuth, async (req, res) => {
    try {
        const { title } = req.body;
        const currPost = await Post.findOne({title : title})
        const listOfComments = [];

        res.status(200).send({list : currPost.Comments});
    }
    catch (err) {
        res.status(400).send({list : "Could not get comments"});
    }
})

// handle upvote
router.post('/handleUpvote', requireAuth, async (req, res) => {
    try {
        const { title } = req.body;
        const currPost = await Post.findOne({title : title});
        if(currPost.upvotes.includes(req.id) === false)
        {
            currPost.upvotes.push(req.id);
            currPost.downvotes = currPost.downvotes.filter((item) => {
                return item !== req.id
            })
        }
        currPost.save();

        res.send({message : "Done"});
    }
    catch (err) {

    }
})

// handle downvote
router.post('/handleDownvote', requireAuth, async (req, res) => {
    try {
        const { title } = req.body;
        // console.log(title);
        const currPost = await Post.findOne({title : title});
        if(currPost.downvotes.includes(req.id) === false)
        {
            currPost.downvotes.push(req.id);
            currPost.upvotes = currPost.upvotes.filter((item) => {
                return item !== req.id
            })
        }
        currPost.save();
    }
    catch (err) {
        res.send({message : err});
    }
})

// follow given user
router.post('/handleFollow', requireAuth, async (req, res) => {
    try {
        const { title } = req.body;
        const currPost = await Post.findOne({title : title});
        const userFollow = await User.findById(req.id);

        const fullname = userFollow.firstName + " " + userFollow.lastName;
        if(fullname === currPost.author)
        {
            res.send({message : "Cannot follow yourself!"});
        }
        else
        {
            const first = currPost.author.split(" ")[0];
            const toFollowUser = await User.findOne({firstName : first});
            if(toFollowUser.followers.includes(userFollow._id) === false)
            {
                // toFollowUser.JoinRequests.push(userFollow._id);
                userFollow.following.push(toFollowUser._id);
                toFollowUser.save();
                userFollow.save();
                res.send({message : `Following ${toFollowUser.username}`});
            }
            else
            {
                res.send({message : `Already following ${toFollowUser.username}`});
            }
        } 
    }
    catch (err) {
        res.send({message : err});
    }
})

// send report
router.post('/reportPost', requireAuth, async (req, res) => {
    try {
        const { concern, title } = req.body;
        // console.log(title);
        // console.log(req.id);
        const currPost = await Post.findOne({title : title});
        console.log(currPost)
        const userReport = await User.findById(req.id);
        const first = currPost.author.split(" ")[0];
        // console.log(first);
        const reportedUser = await User.findOne({firstName : first});
        // console.log(reportedUser);
        const currSub = await Subgreddits.findOne({Name : currPost.partOfSubgreddit});

        const count = await Report.countDocuments({reportedBy : userReport.username, textOfReportedPost : currPost.content});
        // console.log(count);
        if(count > 0)
        {
            console
            res.send({message : "Post has already been reported"});
        }
        else
        {
            const report = await Report.create({
                reportedBy : userReport.username,
                reportedUser : reportedUser.username,
                concern : concern,
                textOfReportedPost : currPost.content,
                blockedUser : reportedUser.username,
                isIgnored : false,
                isBlocked : false
            });
    
            currSub.reports.push(report._id);
            currSub.save();
    
            res.send({message : "Reported post succesfully"});
        }

    }
    catch (err) {
        res.send({message : err});
    }
})

// handle saved posts
router.post('/handleSavedPosts', requireAuth, async (req, res) => {
    try {
        const { title } = req.body;
        const currUser = await User.findById(req.id);
        const currPost = await Post.findOne({title : title});

        if(currUser.savedPosts.includes(currPost._id) === false)
        {
            currUser.savedPosts.push(currPost._id);
            res.send({message : "Post saved!"});
            currUser.save();
        }
        else
        {
            res.send({message : "Post has already been saved"});
        }

    }
    catch (err) {
        res.send({message : err});
    }
})

// get saved posts
router.get('/getSavedPosts',requireAuth, async (req, res) => {
    try {
        
        const currUser = await User.findById(req.id);
        const listOfPosts = []

        if(currUser)
        {
            const list = currUser.savedPosts;
            // console.log(list);
            const listLength = list.length;
            for(let i=0; i<listLength; i++)
            {
                const postID = list[i].toString();
                const post = await Post.findById(postID);

                listOfPosts.push(post);
            }
            console.log(listOfPosts);
            res.send({list : listOfPosts});
        }
        else
            res.send({list : "User does not exist!"})
    }
    catch (err) {
        res.send({list : err});
    }
})

// remove from saved posts
router.post('/removeSavedPosts',requireAuth, async (req, res) => {
    try {
        const { title } = req.body; 
        const currPost = await Post.findOne({ title : title});
        const currUser = await User.findById(req.id);

        if(currUser)
        {
            const list = currUser.savedPosts;
            const postID = currPost._id.toString();
            console.log(postID);

            const newList = list.filter((id) => {
                return (postID !== id.toString())
            })
            
            currUser.savedPosts = newList;
            
            currUser.save();

            res.send({list : "Removed Post!"});
        }
        else
            res.send({list : "User does not exist!"})
    }
    catch (err) {
        res.send({list : err});
    }
})


module.exports = router;