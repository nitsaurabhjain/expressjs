var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users', usersRouter);
module.exports = app;
app.listen(3000, function(){
    console.log('express is listening on port 3000 ...');
});
