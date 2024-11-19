const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']; // Get the token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }
console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user info to req.user
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
};

module.exports = ensureAuthenticated;
