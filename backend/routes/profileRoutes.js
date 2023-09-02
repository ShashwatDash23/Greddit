const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const findUser = require('../controllers/profileController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();


// loading details of user
router.get('/', requireAuth, async (req, res) => {
    try {
        // console.log("req.id ", req.id);
        const user = await User.findById(req.id);
        // console.log(user);
        res.send(user);
    }
    catch (err) {
        res.send("Error");
    }
});

// updating details
router.put('/', requireAuth, async (req, res) => {
    try {
        const {firstName, lastName, email, age, contactNumber, username, password, isPassChange} = req.body;
        const user = await User.findById(req.id);
        console.log(isPassChange);

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.age = age;
        user.contactNumber = contactNumber;
        user.username = username;
        if(isPassChange)
        {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            user.password = hash;
        }
        console.log(user);
        await user.save();
        res.send(true)

    }
    catch(err) {
        res.send(false);
    }
})

// add follower
router.put('/following',requireAuth, async (req, res) => {
    try {
        const {username} = req.body;
        console.log("Current user: ",req.id);

        const user = await User.findOne({username});
        const currUser = await User.findById(req.id);
        // console.log(user);
        if(user)
        {
            const list = currUser.following;
            const list2 = user.followers;
            if(!list.includes(user._id))
            {
                list.push(user._id);
                list2.push(currUser._id);
                // console.log(list);
                currUser.following = list;
                user.followers = list2;
                // console.log(user.following);
                currUser.save();
                user.save();
                // res.send(`Following ${user.username}`);
                res.send({message: `Following ${user.username}!`});
            }
            else
            {
                res.send({message: `Already following ${user.username}`})
            }   
            
        }
        else
            res.send({message: "User does not exist"});
    }
    catch (err) {

    }
})

// get following list
router.get('/following',requireAuth, async (req, res) => {
    try {
        const listOfFollowing = [];
        const currUser = await User.findById(req.id);
        if(currUser)
        {
            const list = currUser.following;

            for(let i=0; i<list.length; i++)
            {
                const userID = list[i].toString();
                // console.log(userID);
                const followingUser = await User.findById(userID);
                const fullname = followingUser.firstName + " " + followingUser.lastName;
                listOfFollowing.push(followingUser.username);
            }
            res.send({list: listOfFollowing});
        }
        else
            res.send("User does not exist!");

    }
    catch (err) {

    }
})

// get followers list
router.get('/followers',requireAuth, async (req, res) => {
    try {
        const listOfFollowers = [];
        const currUser = await User.findById(req.id);
        if(currUser)
        {
            const list = currUser.followers;

            for(let i=0; i<list.length; i++)
            {
                const userID = list[i].toString();
                // console.log(userID);
                const followerUser = await User.findById(userID);
                // const fullname = followerUser.firstName + " " + followerUser.lastName;
                listOfFollowers.push(followerUser.username);
            }
            res.send({list: listOfFollowers});
        }
        else
            res.send({list: "User does not exist!"});

    }
    catch (err) {

    }
})

// unfollow user
router.put('/following/unfollow', requireAuth, async (req, res) => {

    const currUser = await User.findById(req.id);
    const { username } = req.body;
    // console.log(user);
    const list = currUser.following;
    const delUser = await User.findOne({username});
    const list2 = delUser.followers;
    const delID = delUser._id.toString();
    let userID = "";

    const newList = list.filter((id) => {
        return (delID !== id.toString());
    })

    // console.log(list2);
    const newList2 = list2.filter((id) => {
        return (id.toString() !== req.id);
    })
    // console.log(newList2);

    currUser.following = newList;
    delUser.followers = newList2;
    currUser.save();
    delUser.save();
    
    res.send(delUser);
})

// remove user
router.put('/followers/remove', requireAuth, async (req, res) => {

    const currUser = await User.findById(req.id);
    const { username } = req.body;
    // console.log(user);
    const list = currUser.followers;
    const delUser = await User.findOne({username});
    const list2 = delUser.following;
    const delID = delUser._id.toString();
    let userID = "";

    const newList = list.filter((id) => {
        return (delID !== id.toString());
    })

    const newList2 = list2.filter((id) => {
        return (id.toString() !== req.id);
    })

    currUser.followers = newList;
    delUser.following = newList2;
    currUser.save();
    delUser.save();
    
    res.send(delUser);
})

module.exports = router;