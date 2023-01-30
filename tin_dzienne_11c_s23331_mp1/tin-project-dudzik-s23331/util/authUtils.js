
const bcrypt = require('bcryptjs');
const {log} = require("debug");

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, salt);
}

exports.comparePasswords = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

exports.permitAuthenticatedUser = (req, res, next) =>{
    const loggedUser = req.session.loggedUser;
    if (loggedUser) {
        next();
    } else {
        throw new Error('unauthorized access')
    }
}