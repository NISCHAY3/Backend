const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/bigProj1").
    then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    })


module.exports = mongoose.connection;