const { Router } = require("express");
const { userRegistration } = require("../controllers/user.controller.js");
const router = Router()

router.post('/user/register-user', userRegistration);

module.exports =  router