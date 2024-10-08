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
    note: {
        type: DataTypes.STRING
    },
    file: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: DataTypes.DATE
    }
}, { sequelize, modelName: 'transaction' })

module.exports = Transaction;