const jwt = require('jsonwebtoken');

const jwtKey = 'streamingApplicationV1';
const jwtExpirationTime = 6400000;

let generateToken = function (userInfo){
    const token = jwt.sign(userInfo,jwtKey,{algorithm :'HS256', expiresIn : jwtExpirationTime});
    return token;
}

let decode = function(token){
    let length = token.length;
    token  = token.substring(7,length);
    return jwt.verify(token,jwtKey);
}

module.exports = {generateToken, decode};