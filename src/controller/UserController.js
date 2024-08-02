const express = require('express');
const router = express.Router();
const User = require('../model/UserModel');
const Validate = require("../operations/user/ValidateRegister");
const { hashPassword } = require('../helpers/AppHelper');

// add user
router.post("/user", async (req, res) => {
    let result = await Validate(req.body);
    if (result.isValid) {
        let payload = { ...req.body }
        let user = await User.create({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            username: payload.username,
            password: await hashPassword(payload.password)
        });
        res.json(user);
    } else {
        res.status(422).json(result.payload);
    }
});

module.exports = router;