const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './expense-tracker.sqlite3'
})

// Allows us to export anything that we have in an external file.
module.exports = sequelize;

// -----------

// import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './expense-tracker.sqlite3'
// })
