const express = require('express');
const app = express();
const fs = require('fs');

app.set("view engine", "ejs");
const path = require('path');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {

    fs.readdir(`./files`, function (err, files) {
        res.render("index", { files: files })
    })


})

app.post('/create', function (req, res) {

    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
        res.redirect("/")

    });

})


app.listen(3000);