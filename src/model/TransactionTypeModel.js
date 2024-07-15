const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/expense-tracker-database');

class TransactionType extends Model {}
TransactionType.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'transaction_type' })