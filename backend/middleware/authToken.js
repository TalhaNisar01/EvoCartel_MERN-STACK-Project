const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({
                message: 'No token provided || user is not logged in',
                success: false,
                error: true
            });
        }

        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err);
                return res.status(401).json({
                    message: 'Invalid token.',
                    success: false,
                    error: true
                });
            }

            console.log("Decoded Token:", decoded); // Log the decoded token
            req.user = decoded; // Ensure this is setting the correct user info
            next();
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({
            message: err.message || 'Internal Server Error',
            success: false,
            error: true
        });
    }
}

module.exports = { authToken };
