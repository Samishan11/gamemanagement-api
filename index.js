require('dotenv').config();
const express = require('express');
const cors = require("cors")
const server = express();
const route = require("./src/routes/index.route")
require("./src/db/connection")();

// 
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors())
server.use(express.static(__dirname))
server.use("/api",route)
server.listen(5000, ()=>{
    console.log(`\x1b[31mServer is running on port ${5000}`)
})