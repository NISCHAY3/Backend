const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/profile", isLoggedIn, async (req, res) => {

    let user = await userModel.findOne({ email: req.user.email }).populate("posts");

    res.render("profile", { user });
});


app.get("/like/:id", isLoggedIn, async (req, res) => {

    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    if (post.likes.indexOf(req.user.userid) === -1) {

        post.likes.push(req.user.userid);
    }
    else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save();
    res.redirect("/profile");

});

app.get("/edit/:id", isLoggedIn, async (req, res) => {

    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    res.render("edit", { post });

});


app.post("/update/:id", isLoggedIn, async (req, res) => {

    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });

    res.redirect("/profile");

});
app.post("/post", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let content = req.body.content;
    let post = await postModel.create({

        user: user._id,
        content

    });

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");

});
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/register", async (req, res) => {
    const { email, username, name, password, age } = req.body;

    try {

        let user = await userModel.findOne({ email });
        if (user) return res.status(400).send("User already registered");


        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        user = await userModel.create({
            username,
            email,
            age,
            name,
            password: hash
        });


        const token = jwt.sign({ email: email, userid: user._id }, "nis");

        res.cookie("token", token);

        res.send("Registered successfully");

    } catch (error) {

        console.error(error);
        res.status(500).send("An error occurred");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });
        if (!user) return res.status(400).send("User not found");

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ email: email, userid: user._id }, "nis");

                // Set the cookie and send the response in one step
                res.cookie("token", token, { httpOnly: true, secure: true });
                return res.status(200).redirect("/profile");
            } else {
                res.redirect("/login");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});



app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect('/login');
})


function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/login");
    }

    try {
        const data = jwt.verify(token, "nis");
        req.user = data;
        next();
    } catch (err) {
        return res.redirect('/login');
    }
}


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
