const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/expense-tracker-database');

class Transaction extends Model {}
Transaction.init({
    transactionTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expenseDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN
    },
}, { sequelize, modelName: 'transaction' })

module.exports = Transaction;