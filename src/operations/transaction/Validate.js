const Validate = (args) => {
    let {
        expenseDate,
        amount
    } = args;

    let isValid = true;

    let payload = {
        expenseDate: [],
        amount: []
    }

    console.log("Expense Date: " + expenseDate);
    console.log("Amount: " + amount);

    if (!expenseDate) {
        payload.expenseDate.push("This field is required.");
    }

    if (!amount) {
        payload.amount.push("This field is required.");
    }

    console.log("Payload");
    console.log(payload)

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