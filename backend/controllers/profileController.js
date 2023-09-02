const User = require('../models/userModel');
const jwt =  require('jsonwebtoken'); 
const env = require('dotenv');

env.config();

const findUser = async (req, res) => {
    try {
        console.log("req.id ", req.id);
        const user = await User.findById(req.id);
        res.send(user);
    }
    catch (err) {
        res.send("Error");
    }
};