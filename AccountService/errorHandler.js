let general = function(error, request, response, next) {
    let responseObj = {
        status: 400,
        data: error.message
    }
    response.status(400).json(responseObj)
}
module.exports = {general};