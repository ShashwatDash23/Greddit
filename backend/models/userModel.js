const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    age : {
        type: String,
        required: true
    },
    contactNumber : {
        type: String,
        required: true,
        minLength : 10,
        maxLength : 10
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String, 
        required: true,
        minLength: 6
    },
    followers : {
        type: Array
    },
    following : {
        type: Array
    },
    subgredditsFollowing : {
        type: Array
    },
    savedPosts : {
        type: Array
    }

});

// static signup method
userSchema.statics.signup = async function (firstName, lastName, email, age, contactNumber, username, password) {

    
    // validation
    if (!email || !password || !firstName || !lastName || !age || !contactNumber || !username){
        throw Error("All fields must be filled!");
    }
    if(!validator.isEmail(email)){
        throw Error("Invalid email entered");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Weak password entered");
    }

    const ifEmailExists = await this.findOne({ email }); 
    if(ifEmailExists){
        throw Error("Email already in use");
    }
    const ifUsernameExists = await this.findOne({ email }); 
    if(ifUsernameExists){
        throw Error("Username already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({firstName, lastName, email, age, contactNumber, username, password: hash});

    return user; 
}

// static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password){
        throw Error("All fields must be filled!");
    }

    const user = await this.findOne( {email} );

    if(!user)
    {
        throw Error("Invalid credentials entered");
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match)
    {
        throw Error("invalid credentials entered");
    }

    return user;
}

const User = mongoose.model('user', userSchema);


module.exports = User;