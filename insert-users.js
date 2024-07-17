const { faker } = require('@faker-js/faker');
const User = require('./src/model/UserModel');
const { hashPassword } = require('./src/helpers/AppHelper');

// Load users
const loadUsers = async () => {
    await User.destroy({ truncate: true });

    await User.create({
        firstName: "Barbie",
        lastName: "Roberts",
        email: "barbier@yahoo.com",
        username: "user123",
        password: await hashPassword("user123")
    })
}

loadUsers().then(() => {
    console.log("Done loading users");
})
