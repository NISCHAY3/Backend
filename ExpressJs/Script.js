//express ja ek NPM package hai
//framework-jo aapko btata hai kse kaam krna hai flow deta hai
//manages everything from receiving a request and giving the response

//ROUTING & MIDDLEWARE
const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.send('or bhai')
})

app.get("/profile", function (req, res) {
    res.send('kya haal hai ')
})

app.get("/about", function (req, res) {
    res.send("about page hai yh");

})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!');
})
app.listen(3000)






