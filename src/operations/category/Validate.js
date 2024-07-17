const Validate = (args) => {
    let {
        name
    } = args;

    let isValid = true;

    let payload = {
        name: []
    }

    if (!name) {
        payload.name.push("This field is required.");
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
    };
}

module.exports = Validate;