const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/expense-tracker-database');

class Category extends Model {}
Category.init({
    transactionTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING
    }
}, { sequelize, modelName: 'category' })

module.exports = Category;