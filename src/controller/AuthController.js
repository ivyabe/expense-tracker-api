const express = require('express');
const router = express.Router();
const Validate = require('../operations/user/Validate');
const { generateToken } = require('../helpers/AppHelper');

router.post("/login", async (req, res) => {
    console.log("POST /login");

    const username = req.body.username;
    const password = req.body.password;

    console.log("username: " + username);
    console.log("password: " + password);
    let result = await Validate(username, password);

    if (result.isValid) {
        // return the token and user object
        let user = {
            username: result.user.username,
            userId: result.user.id
        }

        let token = generateToken(user);

        res.json({
            token,
            user
        })
    } else {
        res.status(422).json(result.payload)
    }
})

module.exports = router;