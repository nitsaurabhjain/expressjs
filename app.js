var express = require("express");
var dotenv = require('dotenv');
var app = express();
app.use(express.static('public'));
app.get('/api', function(req, res){
    const config = dotenv.config();
     console.log(config);
     res.send(".env = "+ JSON.stringify(config));
});
app.listen(3000, function(){
    console.log('express is listening on port 3000 ...');
});
