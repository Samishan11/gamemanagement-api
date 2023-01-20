const express = require("express");
const router = express.Router();
const LOGIN = require('../../controller/user.controller/signin.controller')
const REGISTER = require('../../controller/user.controller/signup.contorller')
const UPDATE_USER = require('../../controller/user.controller/Update.controller')
const DELETE_USER = require('../../controller/user.controller/Delete.controller')
const GET_USER = require("../../controller/user.controller/Get.controller")
const Google_Login = require("../../controller/user.controller/Googlelogin.controller")
const {Forgotpassword , Resetpassowrd, Verifyemailsend , verifyemail} = require("../../controller/user.controller/Password.controller");
const auth = require("../../middleware/auth")

router.post('/register',REGISTER)
router.post('/google-signin', Google_Login)
router.post('/forgot-password', Forgotpassword)
router.put('/reset-password/:token', Resetpassowrd)
router.post('/verify-link', Verifyemailsend)
router.put('/verify-email/:token', verifyemail)
router.post('/login',LOGIN)
router.put('/update-user/:id', auth.VerifyJWT, UPDATE_USER)
router.delete('/delete-user/:id' , auth.VerifyJWT ,DELETE_USER)
router.get('/get-user' ,auth.VerifyJWT, GET_USER)

module.exports = router;