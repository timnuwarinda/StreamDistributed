const {decode} = require('./jwt')

let saveMiddleware = function(request, response, next){

    if(!request.body.firstName || !request.body.lastName || !request.body.username || !request.body.password || !request.body.email){
    
        response.status(400).json({status : 400, message : 'Error, Missing Information'});
    }else{
        next();
    }
}

module.exports = {saveMiddleware};