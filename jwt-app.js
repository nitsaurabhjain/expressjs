var express = require("express");
var jwt = require("jsonwebtoken");
var VerifyToken = require('./verify-jsonwebtoken'); 
var app = express();
app.get('/api', VerifyToken, function (req, res) {
        res.json({
            "userid": req.userId
        });
    });
app.post('/login', (req, res) => {
    var cert = "secret"; //read it from file
    jwt.sign({ userId: 'saurabh' }, cert, { expiresIn: '60s' }, function (err, token) {
        console.log(token);
        if (err) { res.json({ "message": "Opps! something went wrong", error: err }); }
        console.log(token);
        res.json({ "token": token });
    });
});

app.listen(3000, function () {
    console.log('express is listening on port 3000 ...');
});
