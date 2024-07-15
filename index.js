// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

//--------------
// Database configuration
// Create sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './expense-tracker.sqlite3'
})

// 2. Define our schema
class TransactionType extends Model {}
TransactionType.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'transaction_type' })

class Users extends Model {}
Users.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'user' })

// Sync sequelize with the database.
// If sequelize.storage (/expense-tracker.sqlite3) file does not exist, it will create the file
// "alter:true" enables sync to update existing data in sequelize (ex. additional columns, updated columns, etc)
sequelize.sync({alter: true});

//--------------
// Server Configuration

// PORT: Where the server app will run (default: 3000)
const port = 3000;
const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Services
app.get("/", (req, res) => {

    let payload = { message: "Welcome to student portal!" };
    res.json(payload);
})

// Run the server
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})