const express = require('express');
const router = express.Router();
const Validate = require('../operations/user/Validate');
const { generateToken } = require('../helpers/AppHelper');

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let result = await Validate(username, password);

    if (result.isValid) {
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