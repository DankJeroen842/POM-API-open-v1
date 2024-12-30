const { Router } = require("express");
const { selectAIServiceProvider } = require("../controllers/AI-Integration.controller");
const { isAuthenticatedUser } = require("../middlewares/userAuth")
const { upload } = require("../middlewares/multer")
const router = Router()

router.post('/ai/services', isAuthenticatedUser, upload.array('image', 1), selectAIServiceProvider);

module.exports =  router