const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');

const authenticateUser = async (req, res, next) => {
    if ('authorization' in req.headers) {
        let authHeader = req.headers.authorization.split(' ');
        if (authHeader.length == 2) {
            let token = authHeader[1];
            let userObject = jwt.decode(token, 'secret');
            let user = await User.findOne({ where: { username: userObject.username } });
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).json({ message: "User not found." })
            }
        } else {
            res.status(401).json({ message: 'User must be logged in.' })
        }
    } else {
        res.status(401).json({ message: 'User must be logged in.' })
    }
}

module.exports = authenticateUser;