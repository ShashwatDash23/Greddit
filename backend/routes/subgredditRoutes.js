const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Subgreddits = require('../models/MySubgredditModel');
const Report = require('../models/reportModel');
const Post = require('../models/postModel')
const Comment = require('../models/commentModel');
const requireAuth = require('../middleware/requireAuth');
const { findByIdAndDelete, findById } = require('../models/reportModel');

const router = express.Router();

// creating a new subgreddit
router.post('/create',requireAuth, async (req, res) => {
    try {
        const {Name, Description, TagsList, BannedList} = req.body;
        const currUser = await User.findById(req.id);

        if(!Name || !Description) {
            throw Error("Required field!");
        }

        let flag = 0;

        for(let i=0; i<TagsList.length; i++)
        {
            for(let j=0; j<TagsList[i].length; j++)
            {
                if(TagsList[i][j].toUpperCase() === TagsList[i][j])
                    flag = 1;
            }
        }

        if(flag === 1)
        {
            res.send({message : "Invalid tag : Must be lowercase"});
        }
        else
        {
            let list1 = [];
            list1.push(currUser._id);
    
            const subgreddit = await Subgreddits.create({
                Name: Name,
                Description: Description,
                Tags: TagsList,
                Banned: BannedList,
                Moderator: currUser._id,
                Followers : list1,
                Posts : [],
                Blocked : [],
                LeftFollowers : [],
                JoinRequests : [],
                creationDate : new Date()
            });
    
            const list = currUser.subgredditsFollowing;
            list.push(subgreddit._id);
            currUser.subgredditsFollowing = list;
    
            currUser.save();
    
            res.status(200).send({message : "Subgreddit created successfully!"});
        }

       
    }
    catch (err) {
        res.status(400).send({message : err});
    }
})

// getting all existing subgreddits
router.get('/', requireAuth, async (req, res) => {
    const currUser = await Subgreddits.find({Moderator : req.id});
    res.json({list: currUser});
})

// deleting an existing subgreddit
router.post('/delete', requireAuth, async (req, res) => {
    try {
        const { Name } = req.body;
        const currSub = await Subgreddits.findOne({Name : Name});
        
        const listOfPosts = currSub.Posts;
        
        for(let k=0; k < listOfPosts.length; k++)
        {
            const currPost = await Post.findById(listOfPosts[k].toString());
            const comments = currPost.Comments;
            for(let i=0; i < comments.length; i++)
            {
                const delID = comments[i]._id.toString();
                await Comment.findByIdAndDelete(delID);
            }

            const reportsList = currSub.reports;

            for(let i=0; i < reportsList.length; i++)
            {
                const currReport = await Report.findById(reportsList[i].toString());
                if(currReport.textOfReportedPost === currPost.content)
                {
                    await Report.findByIdAndDelete(reportsList[i].toString());
                    const newList = reportsList.filter((id) => {
                        return (id.toString() !== reportsList[i].toString());
                    })
                    currSub.reports = newList;
                }
            }

            const userList = currSub.Followers;
            const blockedUser = currSub.Blocked;
            for(let i=0; i < userList.length; i++)
            {
                const user = await User.findById(userList[i].toString());
                const list = user.savedPosts;
                for(let j=0; j < list.length; j++)
                {
                    const post = await Post.findById(list[j].toString());
                    if(post.title === currPost.title)
                    {
                        const newList = list.filter((id) => {
                            return (id.toString() !== currPost._id.toString())
                        })
                        user.savedPosts = newList;
                        user.save();
                    }
                }
            }

            const newList = currSub.Posts.filter((id) => {
                return (id.toString() !== currPost._id.toString());
            })


            currSub.Posts = newList;
            currSub.save();
            
            await Post.findByIdAndDelete(currPost._id.toString());
        }

        // console.log("CurrSub id : ", currSub._id.toString());
        const userList = currSub.Followers;
        // console.log(userList);

        for(let i=0; i<userList.length; i++)
        {
            const currUser = await User.findById(userList[i].toString());
            const list = currUser.subgredditsFollowing;
            console.log(list);
            const newList = list.filter((id) => {
                return (currSub._id.toString() !== id.toString());
            })
            currUser.subgredditsFollowing = newList;
            currUser.save();
        }

        await Subgreddits.deleteOne({Name : Name});
        res.send({message: "Subgreddit deleted successfully"});
    }
    catch (err) {
        res.status(400).send({message: err});
    }  
});

// delete a post
router.delete('/deletePost', requireAuth, async (req, res) => {
    
    try {

        const { textOfReportedPost } = req.body;
        // console.log(textOfReportedPost);
        const currPost = await Post.findOne({content : textOfReportedPost});
        // console.log(currPost._id.toString());
        const currSub = await Subgreddits.findOne({Name : currPost.partOfSubgreddit});

        const comments = currPost.Comments;
        for(let i=0; i < comments.length; i++)
        {
            const delID = comments[i]._id.toString();
            await Comment.findByIdAndDelete(delID);
        }

        const reportsList = currSub.reports;

        for(let i=0; i < reportsList.length; i++)
        {
            const currReport = await Report.findById(reportsList[i].toString());
            if(currReport.textOfReportedPost === currPost.content)
            {
                await Report.findByIdAndDelete(reportsList[i].toString());
                const newList = reportsList.filter((id) => {
                    return (id.toString() !== reportsList[i].toString());
                })
                currSub.reports = newList;
            }
        }

        const userList = currSub.Followers;
        const blockedUser = currSub.Blocked;
        for(let i=0; i < userList.length; i++)
        {
            const user = await User.findById(userList[i].toString());
            const list = user.savedPosts;
            for(let j=0; j < list.length; j++)
            {
                const post = await Post.findById(list[j].toString());
                if(post.title === currPost.title)
                {
                    const newList = list.filter((id) => {
                        return (id.toString() !== currPost._id.toString())
                    })
                    user.savedPosts = newList;
                    user.save();
                }
            }
        }

        const newList = currSub.Posts.filter((id) => {
            return (id.toString() !== currPost._id.toString());
        })


        currSub.Posts = newList;
        currSub.save();
        
        await Post.findByIdAndDelete(currPost._id.toString());

        res.send({message : "Deleted Post successfully"});
    }
    catch (err) {
        res.send({message : "Error in deleting post"});
    }
})

// get followers list
router.post('/getUsers',requireAuth, async (req, res) => {
    try {
        const { Name } = req.body;
        const currSub = await Subgreddits.findOne({Name : Name});
        const listOfFollowers = [];

        if(currSub)
        {
            const list = currSub.Followers;
            // console.log(list);

            for(let i=0; i<list.length; i++)
            {
                const userID = list[i].toString();
                // console.log(userID);
                const followingUser = await User.findById(userID);
                const fullname = followingUser.firstName + " " + followingUser.lastName;
                listOfFollowers.push(followingUser.username);
            }
            res.send({list: listOfFollowers});
        }
        else
            res.send({message: "User does not exist!"});

    }
    catch (err) {
        res.send({message : err});
    }
})

// get blocked users
router.post('/getBlockedUsers',requireAuth, async (req, res) => {
    try {
        const { Name } = req.body;
        const currSub = await Subgreddits.findOne({Name : Name});
        const listOfBlocked = [];

        if(currSub)
        {
            const list = currSub.Blocked;
            // console.log(list);

            for(let i=0; i<list.length; i++)
            {
                const userID = list[i].toString();
                // console.log(userID);
                const BlockedUser = await User.findById(userID);
                const fullname = BlockedUser.firstName + " " + BlockedUser.lastName;
                listOfBlocked.push(BlockedUser.username);
            }
            res.send({list: listOfBlocked});
        }
        else
            res.send({message: "User does not exist!"});

    }
    catch (err) {
        res.send({message : err});
    }
})

// get join requests
router.post('/getJoinRequests',requireAuth, async (req, res) => {
    try {
        const { Name } = req.body;
        const currSub = await Subgreddits.findOne({Name : Name});
        const listOfFollowers = [];

        if(currSub)
        {
            const list = currSub.JoinRequests;
            // console.log(list);

            for(let i=0; i<list.length; i++)
            {
                const userID = list[i].toString();
                // console.log(userID);
                const followingUser = await User.findById(userID);
                const fullname = followingUser.firstName + " " + followingUser.lastName;
                // console.log(fullname)
                listOfFollowers.push([fullname, followingUser.username]);
            }
            res.send({list: listOfFollowers});
        }
        else
            res.send({message: "User does not exist!"});

    }
    catch (err) {
        res.send({message : err});
    }
})

// accept join requests
router.post('/acceptRequest', requireAuth, async (req, res) => {
    try {
        const { username, subG } = req.body;
        const currSub = await Subgreddits.findOne({Name: subG});
        const user = await User.findOne({username});

        if(currSub)
        {
            const list = currSub.Followers;
            const list2 = currSub.JoinRequests;
            list.push(user._id);
            const delID = user._id.toString();

            const newList = list2.filter((id) => {
                return (delID !== id.toString());
            })

            currSub.Followers = list;
            currSub.JoinRequests = newList;
            user.subgredditsFollowing.push(currSub._id);
            user.save();
            currSub.save();

            res.send({message : `Accepted User ${username}`});   
        }
    }
    catch (err) {
        res.send({message : err});
    }
    
})

// Reject join requests
router.post('/rejectRequest', requireAuth, async (req, res) => {
    try {
        const { username, subG } = req.body;
        const currSub = await Subgreddits.findOne({Name: subG});
        const user = await User.findOne({username});

        if(currSub)
        {
            const list = currSub.JoinRequests;
            const delID = user._id.toString();

            const newList = list.filter((id) => {
                return (delID !== id.toString());
            })

            currSub.JoinRequests = newList;
            currSub.save();

            res.send({message : `Rejected User ${username}`});   
        }
    }
    catch (err) {
        res.send({message : err});
    }
    
})

// get reports 
router.post('/getReports',requireAuth, async (req, res) => {
    try {
        const { Name } = req.body;
        const currSub = await Subgreddits.findOne({Name : Name});
        const listOfReports = [];
        // console.log("Hi");

        if(currSub)
        {
            const list = currSub.reports.slice();
            for(let i=0; i<list.length; i++)
            {
                let x = list[i].getTimestamp();
                let y = x.getTime();
                let newVar = new Date();
                let timeVar = newVar.getTime();
                if((timeVar - y) / (1000*60) > 15)
                {
                    // console.log("time");
                    const newList = currSub.reports.filter((id) => {
                        return (id.toString() !== list[i].toString())
                    })
                    currSub.reports = newList;
                    
                    await Report.findByIdAndDelete(list[i].toString());
                    
                }
                else
                {
                    const report = await Report.findById(list[i].toString());
                    listOfReports.push(report);
                }
                
            }
            res.send({message: listOfReports});
            currSub.save();
        }
        else
            res.send({message: "User does not exist!"});

    }
    catch (err) {
        res.send({message : err});
    }
})

// ignore buttons
router.post('/ignoreButton', requireAuth, async (req, res) => {
    try {
        const { textOfReportedPost } = req.body;
        console.log(textOfReportedPost);
        // console.log(textOfReportedPost);
        const currReport = await Report.findOne ({textOfReportedPost : textOfReportedPost});
        console.log(currReport);
        currReport.isIgnored = true;
        console.log(currReport);

        currReport.save();

        res.send({message : "Reported post succesfully"});
    }
    catch (err) {
        res.send({message : err});
    }
})

// block user
router.post('/blockUser', requireAuth, async (req, res) => {
    try {
        const { textOfReportedPost, reportedBy, Name } = req.body;
        // console.log(textOfReportedPost);
        const currReport = await Report.findOne({textOfReportedPost : textOfReportedPost, reportedBy : reportedBy});
        // console.log(currReport);
        const currSub = await Subgreddits.findOne({Name : Name});
        const user = await User.findOne({username : currReport.blockedUser});
        const currPost = await Post.findOne({content : textOfReportedPost});
        if(user._id.toString() === req.id)
            res.send({message : "Cannot block yourself!"});
        else
        {
            if(currSub.Blocked.includes(user._id) === false)
                currSub.Blocked.push(user._id);
            currPost.isUserBlocked = true;

            // console.log(user._id);

            const list = currSub.Followers;
            const delID = user._id.toString();

            const list2 = user.subgredditsFollowing;
            const delID2 = currSub._id.toString();

            const newList = list.filter((id) => {
                return (delID !== id.toString());
            })
            currSub.Followers = newList;

            const newList2 = list2.filter((id) => {
                return (delID2 !== id.toString());
            })
            user.subgredditsFollowing = newList2;

            const currAuthor = currPost.author;
            const listOfPosts = currSub.Posts;

            for(let i=0; i<listOfPosts.length; i++)
            {
                const post = await Post.findById(listOfPosts[i].toString());
                if(post.author === currAuthor)
                {
                    post.isUserBlocked = true;
                }
                post.save();
            }

            currReport.isBlocked = true;


            currSub.save();
            currReport.save();
            user.save();
            currPost.save();

            res.send({message : "Blocked User"});
        }    

        
    }
    catch (err) {
        res.send({message : err});
    }
})


module.exports = router;