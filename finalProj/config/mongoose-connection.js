const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:db");



mongoose.connect(`${config.get("MONGODB_URI")}/bigProj1`)
    .then(() => {
        dbgr("DB connected successfully");
    })
    .catch(() => {
        dbgr("Connection error: ", err.message);
    })





module.exports = mongoose.connection;
