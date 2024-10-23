const jwt = require('jsonwebtoken');


const GenerateJWT = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
    });
};

module.exports = GenerateJWT;