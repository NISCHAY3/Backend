const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
    res.render("index");
});

// Display all users
app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render("read", { users });
});

// Edit user by ID
app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit", { user });
});

// Delete user by ID
app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});

// Create new user
app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.create({
        name,
        email,
        image
    });
    res.redirect('/read');
});

// Update existing user
app.post('/update/:id', async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.findOneAndUpdate({ _id: req.params.id }, {
        name,
        email,
        image
    });
    res.redirect('/read');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
