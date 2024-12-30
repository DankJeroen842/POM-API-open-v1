const asyncHandler = require('express-async-handler');
const { ApiResponse } = require("../utils/ApiResponse.js");
const AIServices = require("../services/AI-Integration.service.js")

const selectAIServiceProvider = asyncHandler(async (req, res) => {
    const response = await AIServices.selectAIServiceProvider(req, res)
    res.status(200).json(new ApiResponse(200, response, "Query Executed Successfully!"))
})


module.exports = {
    selectAIServiceProvider
};