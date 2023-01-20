const express = require("express");
const router = express.Router();
const PostSport = require('../../controller/sport.controller/Postsport.controller');
const UpdateSport = require('../../controller/sport.controller/Updatesport.controller');
const DeleteSport = require('../../controller/sport.controller/Deletesport.controller');
const GETSport = require("../../controller/sport.controller/Getsport.controller");
const auth = require("../../middleware/auth")
router.post('/post-sport' , auth.VerifyJWT ,PostSport)
router.put('/update-sport/:id', auth.VerifyJWT, UpdateSport)
router.delete('/deletesport/:id' , auth.VerifyJWT, DeleteSport)
router.get('/get-sport' ,GETSport)

module.exports = router;