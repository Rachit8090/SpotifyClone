const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
 
//serve static files using express
app.use(express.static('public'))
app.use(express.static('views'))
app.set('view engine', 'pug');


//mongodb connection establishment
mongoose.connect('mongodb://localhost:27017/helpSpot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => {
  console.log("Database Connection SuccessFull");
}).catch((e) => {
  console.log("connection failed");
})

app.use(express.urlencoded({ extended: true }));

const helpSchema = new mongoose.Schema({   //create schema of our database
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

const Help = mongoose.model('Help', helpSchema);  //implement final model of schema

//serve all files using express
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/index', (req, res) => {
  res.render('index')
})
app.get('/about', (req, res) => {
  res.status(200).render('about.pug');
})

app.get('/help', (req, res) => {
  res.status(200).render('help.pug');
})

//after submit press post request and get data from database
app.post('/help', (req, res) => {

  var mydata = new Help(req.body);
  mydata.save().then(() => {
    res.status(200).render('index.pug');
  }).catch(() => {
    res.status(400).send("item was not saved");
  })
})

//server starts
app.listen(port, () => {
  console.log(`Server listening on port ... ${port}`)
})