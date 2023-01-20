const express = require("express");
const router = express.Router();
const CONTACT = require("../../controller/contact.controller/contact.controller");
const CONTACT_GET = require("../../controller/contact.controller/contact.Getcontroller");
const ContactDelete = require("../../controller/contact.controller/Delete.controller");

// 
router.post("/post-contact", CONTACT);
router.get("/contact", CONTACT_GET);
router.delete("/delete-contact/:id", ContactDelete);

module.exports = router;