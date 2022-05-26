var bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'});
var express = require('express');
var app = express();
app.use('/public', express.static(__dirname + '/public')); //this is using middleware 


console.log("Hello World");

//creating custom middleware at root level
app.use(function (req, res, next){
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get("/",function(req, res){
    // res.send('Hello Express');
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res){
    var response = {
      "message": "Hello json"
    };
    
    if(process.env.MESSAGE_STYLE==='uppercase'){
      response.message = response.message.toUpperCase();  
    }
    return res.json(response);
    });

app.get('/now', function(req, res, next){
  req.time = new Date().toString();
  next();
},function(req,res){
  return res.json({time: req.time});
});

//route parameter inputs.
app.get("/:word/echo", function (req, res) {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

//route parameter with key value
app.get("/name", function (req, res){
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

//post handler at the path
app.post("/name",function(req,res){
  var nameString = req.body.first+" "+req.body.last;
  res.json({ name: nameString });
});









 module.exports = app;
