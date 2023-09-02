const mongoose = require('mongoose');
const validator = require('validator');

const MySubgredditSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true,
        unique: true
    },
    Description : {
        type: String,
        required: true
    },
    Tags : {
        type: Array
    },
    Banned : {
        type: Array
    },
    Moderator : {
        type: String,
        required: true
    },
    Followers : {
        type: Array,
        required: true
    },
    Posts : {
        type: Array
    },
    Blocked : {
        type: Array
    },
    LeftFollowers : {
        type: Array
    },
    JoinRequests : {
        type: Array
    },
    creationDate : {
        type: Date,
        default: Date.now
    },
    reports : {
        type: Array,
    }

})

const Subgreddits = mongoose.model('subgreddit', MySubgredditSchema);

module.exports = Subgreddits;