const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/authestapp')
    .then(() => {
        console.log('DB connected successfully');
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number
})

module.exports = mongoose.model("user", userSchema);