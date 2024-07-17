const User = require('../../model/UserModel');
const { isValidLogin } = require('../../helpers/AppHelper');

const Validate = async (username, password) => {
    console.log("validate")
    let isValid = true;
    let user = null;

    let payload = {
        username: [],
        password: []
    }

    if (!username) {
        payload.username.push("This field is required.");
    }

    if (!password) {
        payload.password.push("This field is required.");
    }

    if (username && password) {
        user = await User.findOne({ where: { username: username } })

        if (user) {
            let isValid = await isValidLogin(password, user.password);

            if (!isValid) {
                payload.password.push("Invalid password.");
            }
        } else {
            payload.username.push("User not found.");
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
        payload,
        user
    }
}

module.exports = Validate;