//express ja ek NPM package hai
//framework-jo aapko btata hai kse kaam krna hai flow deta hai
//manages everything from receiving a request and giving the response

//ROUTING & MIDDLEWARE
const express = require('express')
const app = express()

app.use(function (req, res, next) {

    console.log("middleWare Chala");
    next();

});

app.get('/', function (req, res) {
    res.send('or bhai')
})

app.get("/profile", function (req, res) {
    res.send('kya haal hai ')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!');
})
app.listen(3000)






