const express = require("express");
const router = express.Router();
const GET_NEWS = require("../../controller/news.controller/Get.controller");
const POST_NEWS = require("../../controller/news.controller/Postnews.controller");
const UPDATE_NEWS = require("../../controller/news.controller/Update.controller");
const DELETE_NEWS = require("../../controller/news.controller/Delete.controller");
const upload = require("../../upload/upload");
// 
router.get("/news",GET_NEWS);
router.post("/post/news", upload.single("image"), POST_NEWS);
router.put("/update-news/:id", upload.single("image") ,UPDATE_NEWS);
router.delete("/delete-news/:id",DELETE_NEWS);

module.exports = router;