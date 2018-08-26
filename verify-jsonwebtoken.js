var jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  var bearerToken = req.headers['authorization'];
  var token = bearerToken.split(" ")[1];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    var cert = "secret"; //read it from file
    jwt.verify(token, cert, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.userId;
    next();
  });
}
module.exports = verifyToken;