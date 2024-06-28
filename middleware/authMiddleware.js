// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming Authorization: Bearer <token>
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                // console.log("USER >>>>>>>>>>>>>>>>>>>>>>>>>",decoded);
                req.user = decoded.user;
                next();
            }
        });
    } else {
        return res.status(403).json({ message: 'No token provided, authorization denied' });
    }
};

module.exports = authenticate;
