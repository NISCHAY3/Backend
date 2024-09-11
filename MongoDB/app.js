const express = require('express');
const app = express();

const userModel = require('./usermodel');
const usermodel = require('./usermodel');

app.get('/', (req, res) => {
    res.send("hey");
});

app.get('/create', async (req, res) => {
    let user = await userModel.create({

        name: "Nischay",
        email: "nischay@gmail.com",
        username: "nischay"
    })

    res.send(user);

});
app.get('/create', async (req, res) => {
    let user = await userModel.create({

        name: "hello",
        email: "nischay@gmail.com",
        username: "hello"
    })

    res.send(user);

});

app.get('/update', async (req, res) => {
    let updates = await userModel.findOneAndUpdate({ username: "nischay" }, { name: "Nischay bareja" }, { new: true })
    res.send(updates);

});


app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.send(users);
})

app.get('/delete', async (req, res) => {
    let users = await userModel.findOneAndDelete({ username: "hello" });
    res.send(users);
})


app.listen(3000);