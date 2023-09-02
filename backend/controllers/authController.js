const User = require('../models/userModel');
const jwt =  require('jsonwebtoken'); 
const env = require('dotenv');

env.config();

const createToken = (_id) => {
    return jwt.sign({ _id}, process.env.SECRET, { expiresIn : '3d'});
}

// login user
const loginUser = async (req, res) => {
    const { email, password} = req.body;

    try {
      const user = await User.login(email, password);

      //creating a token
      const token = createToken(user._id);

      res.status(200).json({token});
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

// signup user
const signupUser = async (req, res) => {
    const {firstName, lastName, email, age, contactNumber, username, password} = req.body;

    try {
      const user = await User.signup(firstName, lastName, email, age, contactNumber, username, password);

      //creating a token
      const token = createToken(user._id);

      res.status(200).json({token});
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports = { loginUser, signupUser};