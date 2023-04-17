const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, 'secret');
    // Set the user ID on the request object for future use
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};
