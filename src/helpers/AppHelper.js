const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const isValidLogin = async (inputPassword, passwordHash) => {
    return await bcrypt.compare(inputPassword, passwordHash);
}

const generateToken = (user) => {
    return jwt.sign(user, 'secret');
}

module.exports = {
    hashPassword,
    isValidLogin,
    generateToken
}