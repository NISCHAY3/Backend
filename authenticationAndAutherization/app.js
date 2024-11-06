// const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();
const bcrypt = require('bcrypt');

// app.use(cookieParser());

app.get("/", function (req, res) {

    // res.cookie("name", "harsh");
    // res.send("done");

    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash("hello", salt, (err, hash) => {
    //         console.log(hash);
    //     })
    // })

})

// app.get("/read", (req, res) => {
//     console.log(req.cookies);
//     res.send("read page");
// })


app.listen(3000);