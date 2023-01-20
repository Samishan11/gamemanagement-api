const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI
mongoose.set("strictQuery", false);
const connectDB = async = () => {
    try {
        mongoose.connect(DB_URI).then(()=> {
            console.log('\x1b[32mDatabase connected')
        })
    } catch (error) {
        console.log('\x1b[31m Database Connection failed')
    }
}

module.exports = connectDB;