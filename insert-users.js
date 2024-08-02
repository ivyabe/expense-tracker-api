const { faker } = require('@faker-js/faker');
const User = require('./src/model/UserModel');
const { hashPassword } = require('./src/helpers/AppHelper');

// Load users
const loadUsers = async () => {
    await User.destroy({ truncate: true });

    await User.create({
        firstName: "Luna",
        lastName: "Lovegood",
        email: "luna@yahoo.com",
        username: "luna",
        password: await hashPassword("user123")
    })

    await User.create({
        firstName: "Hermione",
        lastName: "Granger",
        email: "hermione@yahoo.com",
        username: "hermione",
        password: await hashPassword("user123")
    })
}

loadUsers().then(() => {
    console.log("Done loading users");
})
