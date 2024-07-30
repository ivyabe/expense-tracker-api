const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// DATABASE CONFIGURATION
// Create sequelize instance
const sequelize = require('./config/expense-tracker-database');

// Define schema
const Transaction = require('./src/model/TransactionModel');
const User = require('./src/model/UserModel');
const Category = require('./src/model/CategoryModel');

// Define associations
Category.hasMany(Transaction, { foreignKey: 'categoryId' });
Transaction.belongsTo(Category, { foreignKey: 'categoryId' });
// User.hasMany(Category, {foreignKey: 'userId'});

// Sync sequelize with the database.
// If sequelize.storage (/expense-tracker.sqlite3) file does not exist, it will create the file
// "alter:true" enables syncing of db changes (ex. additional columns, updated columns, etc)
sequelize.sync({alter: true});

// ##############################################

// SERVER CONFIGURATION
// port = 3000 : where the server app will run
const port = 3000;
const app = express();

// MIDDLEWARE
const AuthController = require('./src/controller/AuthController');
const UserController = require('./src/controller/UserController');
const CategoryController = require('./src/controller/CategoryController');
const TransactionController = require('./src/controller/TransactionController');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(AuthController);
app.use(UserController);
app.use(CategoryController);
app.use(TransactionController);

// Services
app.get("/", (req, res) => {

    let payload = { message: "Welcome to student portal!" };
    res.json(payload);
})

// Run the server
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})