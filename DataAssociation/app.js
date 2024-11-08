const express = require('express');

const userModel = require("./models/user");
const postModel = require("./models/post");
const post = require('./models/post');




const app = express();

app.get("/", (req, res) => {
    res.send("hello");
})

app.get("/create", async (req, res) => {
    let user = await userModel.create({
        username: "nischay",
        age: 21,
        email: "nischay@gmail.com"
    });

    res.send(user);
})

app.get("/post/create", async (req, res) => {
    let post = await postModel.create({
        postdata: "hello everyone",
        user: "672da1dbffc02eb7b2a38d7b"
    })

    let user = await userModel.findOne({ _id: "672da1dbffc02eb7b2a38d7b" })
    user.posts.push(post._id);
    await user.save();
    res.send({ post, user });
})

app.listen(3000, () => {
    console.log("server connected");
})
