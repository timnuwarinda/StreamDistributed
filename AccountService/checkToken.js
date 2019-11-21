const { decode } = require('./jwt')

let checkToken = function(request, response, next){
     
    let token = request.headers.authorization;
    try {

        if (!token) {
            response.status(400).json({ status: 400, message: 'Error, Missing Token' });
        } else if (!decode(token)) {
            response.status(400).json({ status: 400, message: 'Error, Invalid Token' });
        } else {
            let decodedToken = decode(token);
            request.username = decodedToken.username;
            next();
        }
    } catch (error) { 
        console.log(error);
        response.status(500).json({ status: 500, message: 'Error,' + error });
    }
}
module.exports = { checkToken };