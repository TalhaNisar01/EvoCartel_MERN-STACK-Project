const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    // Access the token from cookies or headers
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

    console.log("Token:  ", token);

    if (!token) {
      return res.status(403).json({
        message: 'No token provided || user is not logined',
        success: false,
        error: true
      });
    }

    // Verify the token
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err); // Log verification error
        return res.status(401).json({
          message: 'Invalid token.',
          success: false,
          error: true
        });
      }

      // Log the decoded token to see the user information
      console.log("Decoded Token:", decoded);

      // Attach the decoded user information to the request object
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error("Internal server error:", err); // Log server errors
    res.status(500).json({
      message: err.message || 'Internal Server Error',
      success: false,
      error: true
    });
  }
}

module.exports = { authToken };
