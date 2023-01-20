const express = require("express");
const router = express.Router();
const POST_TEAM = require("../../controller/team.controller/Postteam.controller");
const GET_TEAM = require("../../controller/team.controller/Getteam.controller");
const UPDATE_TEAM = require("../../controller/team.controller/Updateteam.controller");
const DELETE_TEAM = require("../../controller/team.controller/Delete.controller");
const upload = require("../../upload/upload")
const auth = require("../../middleware/auth")
// routes
router.post("/post-team", auth.VerifyJWT, upload.single('image'), POST_TEAM)
router.get("/get-team", GET_TEAM)
router.delete("/delete-team/:id", auth.VerifyJWT, DELETE_TEAM)
router.put("/update-team/:id", auth.VerifyJWT, upload.single('image'), UPDATE_TEAM)

module.exports = router;