const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('./middleware/requireAuth');
const authRoutes = require('./routes/authRoutes');  
const profileRoutes = require('./routes/profileRoutes');
const subgredditRoutes = require('./routes/subgredditRoutes');
const allSubgredditsRoutes = require('./routes/allSubgredditsRoutes');
const personalSubgredditRoutes = require('./routes/personalSubgredditRoutes');
const cors = require('cors')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors())

// database connection
const dbURI = 'mongodb+srv://testuser:test123@Cluster0.unvipyu.mongodb.net/MyApp';
mongoose.set('strictQuery', true);
mongoose.connect(dbURI)
  .then((result) => {
    console.log("Connected to DB");
    app.listen(8000)
  })
  .catch((err) => console.log(err));

// routes   
app.use('/api/users', authRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/subgreddits', subgredditRoutes);
app.use('/api/allSubgreddits', allSubgredditsRoutes);
app.use('/api/personalSubgreddit', personalSubgredditRoutes);