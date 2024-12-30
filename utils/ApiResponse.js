class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.success = true 
        this.message = message
        this.data = data
    }
}

module.exports = { ApiResponse }