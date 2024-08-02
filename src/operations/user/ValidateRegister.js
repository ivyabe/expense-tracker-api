const User = require('../../model/UserModel');

const Validate = async (args) => {
    let {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPw
    } = args;
    let isValid = true;

    let payload = {
        firstName: [],
        lastName: [],
        email: [],
        username: [],
        password: [],
        confirmPw: []
    }

    if (!firstName) {
        payload.firstName.push("This field is required.");
    }

    if (!lastName) {
        payload.lastName.push("This field is required.");
    }

    if (!email) {
        payload.email.push("This field is required.");
    }

    if (!username) {
        payload.username.push("This field is required.");
    }

    if (!password) {
        payload.password.push("This field is required.");
    }

    if (!confirmPw) {
        payload.confirmPw.push("This field is required.");
    }

    if (password && confirmPw) {
        if (confirmPw != password) {
            payload.confirmPw.push("Password mismatch.");
        }
    }

    if (email) {
        user = await User.findOne({ where: { email: email } });
        if (user) {
            payload.email.push("Email Address is already registered.");
        }
    }

    if (username) {
        user = await User.findOne({ where: { username: username } });
        if (user) {
            payload.username.push("Username is already registered.");
        }
    }

    // Loop through each key checking if we have error messages
    Object.keys(payload).forEach((key) => {
        if (payload[key].length > 0) {
            isValid = false;
        }
    })

    return {
        isValid,
        payload
    }
}

module.exports = Validate;