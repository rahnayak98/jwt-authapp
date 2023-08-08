const express = require('express');
const mongoose = require('mongoose');
const authroutes=require('./Routes/authroutes')
const cookieparser=require('cookie-parser');
const authmiddleware=require('./Middleware/authmiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieparser())
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = '';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', authmiddleware,(req,res) => res.render('smoothies'));
app.use(authroutes);

 
