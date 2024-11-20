const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');


router.get("/", (req, res) => {
    res.send("hello");
})

// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {

    router.post("/create", async (req, res) => {

        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(503)
                .send("you don't have permissions to create a new owner");
        }

        let { fullname, email, password } = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        res.status(201).send(createdOwner);


    })
}


module.exports = router;