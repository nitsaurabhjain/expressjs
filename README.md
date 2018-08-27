# EXPRESS JS
https://www.wisdomjobs.com/e-university/expressjs-interview-questions.html
### Installing
```
$ mkdir myapp
$ cd myapp 
$ npm init 
$ npm install express --save 
$ npm app.js
```
### Express application generator
```sh
$ npm install express-generator -g
$ express --view=pug myapp
```
### Serving static files in Express
To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middle-ware function
```
app.use(express.static('public'))
```
Now, you can load the files that are in the public directory:
```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/index.html
```
To use multiple static assets directories, call the express.static middleware function multiple times:
```
app.use(express.static('public'))
app.use(express.static('files'))
```
### Basic routing

Routing refers to how an application’s endpoints (URIs) respond to client requests
```js
app.METHOD(PATH, HANDLER)
```
### Route paths
Route paths can be strings, string patterns, or regular expressions.
The characters ?, +, *, and () are subsets of their regular expression counterparts

* Below route path will match acd and abcd.
```
app.get('/ab?cd', function (req, res) {
res.send('ab?cd')
})
```

* Below route path will match abcd, abbcd, abbbcd, and so on.
```
app.get('/ab+cd', function (req, res) {
res.send('ab+cd')
})
```
* Below route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
```
app.get('/ab*cd', function (req, res) {
res.send('ab*cd')
})
```
* Below route path will match /abe and /abcde.
```
app.get('/ab(cd)?e', function (req, res) {
res.send('ab(cd)?e')
})
```
* Below route path will match anything with an “a” in it.
```
app.get(/a/, function (req, res) {
res.send('/a/')
})
```
* Below route path will anything ends with fly
```
app.get(/.*fly$/, function (req, res) {
res.send('/.*fly$/')
})
```
### Route parameters
```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```
## express.Router

Router can be used to give modular look. I prefer to divide app in flow basis.
Use the express.Router class to create modular route handlers
* Create a router file named birds.js in the app directory, with the following content:
```
var express = require('express')
var router = express.Router()
router.use(somemiddlewarefunction);
router.get('/', function (req, res) {
res.send('Birds home page')
})
router.get('/about', function (req, res) {
res.send('About birds')
})
module.exports = router
```
Then, load the router module in the app:

```
var birds = require('./birds')
app.use(birds) //or
app.use('/birds', birds)
```
### Writing middle-ware for use in Express apps
middle-ware functions are interceptor functions that have access to the request object, the response object and the next function
**Example**
* To load the middle-ware function, call app.use(), specifying the middle-ware function
```
var express = require('express')
var app = express()
var myLogger = function (req, res, next) {
console.log('LOGGED')
next()
}
app.use(myLogger)
app.get('/', function (req, res) {
res.send('Hello World!')
})
app.listen(3000)
```


### Using template engines with Express
Some popular template engines that work with Express are Pug, Mustache
### Error handling
**Express default error handling feature**
* if app is run in dev mode and an error is thrown like throw Error ("some msg") then whole stack trace is printed on client machine
* if app is run in production mode and an error is thrown like throw Error ("message") then only error message like internal server error is printed
* When an error is thrown from any  function and if it's handled by nodejs and your app gets terminated
**To avoid app termination of app, use try catch and use next(error) in catch**
* use Promise to handle asyn calls
* We can also define our own (custom ) error handler as below
Define error-handling middle-ware functions in the same way as other middle-ware functions, except error-handling functions have four arguments instead of three: (err, req, res, next). For example:
```
// error handler
function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err.message);
});
app.use(errorHandler)
```

**Calls to next() and next(err) indicate that the current handler is complete and in what state. next(err) will skip all remaining handlers in the chain except for those that are set up to handle errors**

### Debug express js

* To see all the internal logs used in Express
```
set DEBUG=express:* & node index.js
```
* or see the logs only from the router set the value of DEBUG to express:router
```
set DEBUG=express:router & node index.js
```
* application generated log
```
$ DEBUG=sample-app node index.js
```

* You can specify more than one debug namespace by assigning a comma-separated list of names
```
$ DEBUG=http,mail,express:* node index.js
```
#### debug plugin
```
npm install express-debug --save-dev //not much useful
```
### Middleware
* middle-ware are the interceptor function
**ex express.static, body-parser are the builtin middle-ware**
```js
const  logger = function(req, res, next){
console.log("Incoming req" + ${req.rul});
next(); //or next(err);
}
app.use(logger);
```
#### __dirname vs process.cwd()
* $ node ../app.js
* __dirname (the directory of the script file): /tmp/myapp
* process.cwd() (the directory from which the script file was called): /tmp/myapp/subdir


### API in express or nodejs

**Modules are singleton** ie when we load a module in multiple files, the files gets only ref of only one instance of the module
### Authentication
* Secure Restful API by JSON Web Token
* Secure session based API by passport **https://github.com/auth0/node-jsonwebtoken**