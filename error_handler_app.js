var express = require("express");
var dotenv = require('dotenv');
var app = express();

app.get('/', function(req, res){
    res.send('app is working ...');
});

app.get('/err', function(req, res, next){
   var err = new Error("Error occured");
   //next(err); or
   throw new Error("throw new error");
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  //  if  we need to use render func we need to configure view engine
  //res.render(err.message);
  //Avod setting view  engine just use json like below
  res.json(err.message);
});

app.listen(3000, function(){
    console.log('express is listening on port 3000 ...');
});

