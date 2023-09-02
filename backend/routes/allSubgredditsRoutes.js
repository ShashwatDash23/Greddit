const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Subgreddits = require('../models/MySubgredditModel');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// get followed subgreddits
router.get('/getFollowedSubs',requireAuth, async (req, res) => {
    try {
        // const { Name } = req.body;
        // const currSub = await Subgreddits.findOne({Name : Name});
        // const listOfFollowers = [];
        const user = await User.findById(req.id);
        const listOfSubgreddits = []

        if(user)
        {
            const list = user.subgredditsFollowing;
            const listLength = list.length;
            for(let i=0; i<listLength; i++)
            {
                // console.log("hello");
                const subID = list[i].toString();
                const subG = await Subgreddits.findById(subID);
                // console.log(subG);
                listOfSubgreddits.push(subG);
                // console.log(subG.Name);
            }

            // console.log(listOfSubgreddits);

            res.send({list : listOfSubgreddits});
        }
        else
            res.send({list : "User does not exist!"});

    }
    catch (err) {
        res.send({list : err});
    }
})

// get other subgreddits
router.get('/getOtherSubs',requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.id);
        const listOfSubgreddits1 = []
        const listOfSubgreddits = []

        if(user)
        {
            const list = user.subgredditsFollowing;
            const listLength = list.length;
            for(let i=0; i<listLength; i++)
            {
                // console.log("hello");
                const subID = list[i].toString();
                const subG = await Subgreddits.findById(subID);
                // console.log(subG);
                listOfSubgreddits1.push(subG.Name);
                // console.log(subG.Name);
            }
        }

        if(user)
        {
            const fullList = await Subgreddits.find();

            // console.log(fullList.length);
            for(let i=0; i<fullList.length; i++)
            {
                const name = fullList[i].Name;
                // if(mod !== req.id)
                //     listOfSubgreddits.push(fullList[i]);
                if(listOfSubgreddits1.includes(name) === false)
                {
                    listOfSubgreddits.push(fullList[i]);
                }
            }

            res.send({list : listOfSubgreddits});
        }
        else
            res.send({list : "User does not exist!"});
    }
    catch (err) {
        res.send({list : err});
    }
})

// get all tags
router.get('/getTags',requireAuth, async (req, res) => {
    try {
        const fullList = await Subgreddits.find();
        const listOfTags = []

        if(fullList)
        {
            // console.log(fullList.length);
            for(let i=0; i<fullList.length; i++)
            {
                const tag = fullList[i].Tags;
                for(let j=0; j<tag.length; j++)
                {
                    if(!listOfTags.includes(tag[j]))
                    {
                        listOfTags.push(tag[j]);
                    }
                    
                }
                    
            }

            res.send({list : listOfTags});
        }
        else
            res.send({list : "No Subgreddits exist!"});
    }
    catch (err) {
        res.send({list : err});
    }
})


// get created time for followed subgreddits
router.get('/getTime',requireAuth, async (req, res) => {
    try {
        const fullList = await Subgreddits.find();
        const listOfTags = []
        const user = await User.findById(req.id);
        const listOfSubgreddits = []

        if(user)
        {
            const list = user.subgredditsFollowing;
            const listLength = list.length;
            for(let i=0; i<listLength; i++)
            {
                // console.log("hello");
                const subID = list[i].toString();
                const subG = await Subgreddits.findById(subID);
                // console.log(subG);
                listOfSubgreddits.push(subG);
                // console.log(subG.Name);
            }

            const newArray = listOfSubgreddits.slice().sort((a, b) => 
            {
                if (a.creationDate.getTime() > b.creationDate.getTime()) {
                    return 1;
                }
                if (a.creationDate.getTime() < b.creationDate.getTime()) {
                    return -1;
                }
                return 0;
            });

            // console.log(newArray);

            res.send({list : newArray});
        }
        else
            res.send({list : "User does not exist!"});
    }
    catch (err) {
        res.send({list : err});
    }
})

// get creation time for other subgreddits
router.get('/getOtherTime',requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.id);
        const listOfSubgreddits = []

        if(user)
        {
            const fullList = await Subgreddits.find();

            // console.log(fullList.length);
            for(let i=0; i<fullList.length; i++)
            {
                const mod = fullList[i].Moderator.toString();
                if(mod !== req.id)
                    listOfSubgreddits.push(fullList[i]);
            }

            const newArray = listOfSubgreddits.slice().sort((a, b) => 
            {
                if (a.creationDate.getTime() > b.creationDate.getTime()) {
                    return 1;
                }
                if (a.creationDate.getTime() < b.creationDate.getTime()) {
                    return -1;
                }
                return 0;
            });

            res.send({list : newArray});
        }
        else
            res.send({list : "User does not exist!"});

    }
    catch (err) {
        res.send({list : err});
    }
})

// get curr user
router.get('/getCurrUser',requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.id);
        res.send({list : user._id.toString()})
    }
    catch (err) {
        res.send({list : err});
    }
})

// leave subgreddit
router.post('/leaveSub',requireAuth, async (req, res) => {
    try {
        const { Name } = req.body
        const user = await User.findById(req.id);
        const delSub = await Subgreddits.findOne( {Name : Name} );

        if(user)
        {
            user.subgredditsFollowing = user.subgredditsFollowing.filter((subs) => {
                return (subs.toString()) !== (delSub._id.toString());
            })

            console.log(delSub.Followers);

            delSub.Followers = delSub.Followers.filter((users) => {
                return (users.toString()) !== (req.id);
            })

            console.log(delSub.Followers);

            delSub.LeftFollowers.push(user._id);

            user.save();
            delSub.save();

            res.send({message : `Left Subgreddit ${delSub.Name}`});
        }
        else
            res.send({message : "User does not exist!"});

    }
    catch (err) {
        res.send({message : err});
    }
})

// join subgreddit
router.post('/joinSub',requireAuth, async (req, res) => {
    try {
        const { Name } = req.body
        const user = await User.findById(req.id);
        const joinSub = await Subgreddits.findOne( {Name : Name} );

        if(user)
        {
            if(joinSub.LeftFollowers.includes(user._id))
            {
                res.send({message : `Cannot Join ${joinSub.Name}: Left once already`});
            }
            else if(joinSub.Blocked.includes(user._id))
            {
                res.send({message : `Blocked From ${joinSub.Name}`});
            }
            else
            {
                // user.subgredditsFollowing.push(joinSub._id);
                if(joinSub.JoinRequests.includes(user._id) === false)
                {
                    joinSub.JoinRequests.push(user._id);
                    user.save();
                    joinSub.save();

                    res.send({message : `Sent Join Request to ${joinSub.Name}`});
                }
                else
                {
                    res.send({message : `Already sent Join Request to ${joinSub.Name}`});
                }
                    

                // joinSub.Followers.push(user._id);

                
            }
            
        }
        else
            res.send({message : "User does not exist!"});

    }
    catch (err) {
        res.send({message : err});
    }
})


module.exports = router;