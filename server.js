const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const bodyparser=require("body-parser");
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/helpspotify',{useNewUrlParser:true});  //mongoconnectionestavblist
app.use(express.static('public'))
app.use(express.static('views'))
app.set('view engine', 'pug');

var helpSchema=new mongoose.Schema({   //create schema of our database
  name:String,
  email:String,
  helptxt:String
});

var helps=mongoose.model('help',helpSchema);  //implement final model of schema

//app.engine('html', require('ejs').renderFile);
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/index',(req,res)=>{
  res.render('index')
})
app.get('/about', (req, res) => {
  res.status(200).render('about.pug');
})

app.get('/help',(req,res)=>{
  res.status(200).render('help.pug');
})

app.post('/help',(req,res)=>{
  var mydata=new helps(req.body);
  mydata.save().then(()=>{
    res.send("this item is saved to database");
  }).catch(()=>{
    res.status(400).send("item was not saved");
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})