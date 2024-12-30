const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse.js");
const userService = require("../services/user.service.js")

const userRegistration = asyncHandler(async (req, res) => {
    const userToken = await userService.userRegistration(req)
    res.status(200).json(new ApiResponse(200, userToken, "User Registered Successfully, Collect the Token and start playing!"))
})


module.exports = {
    userRegistration
};