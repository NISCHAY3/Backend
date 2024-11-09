const express = require('express');
const app = express();
const userModel = require("./models/user");
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

app.get('/profile', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render("login");
})
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
        if (!user) return res.status(400).send("Something Went Wrong");

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                res.status(200).send("you can login");
                const token = jwt.sign({ email: email, userid: user._id }, "nis");

                res.cookie("token", token);

            }
            else res.redirect('/login');
        })




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
    if (req.cookies.token === "") res.send("You must be loggedin");
    else {
        let data = jwt.verify(req.cookies.token, "nis");
        req.user = data;
        next();
    }
}


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});