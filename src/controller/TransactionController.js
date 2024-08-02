const express = require('express');
const Transaction = require('../model/TransactionModel');
const Validate = require('../operations/transaction/Validate')
const router = express.Router();
const authenticateUser = require('../middleware/AuthenticateUser');
const { getUser } = require('../helpers/AppHelper');

router.use(authenticateUser);

// get transaction by id
router.get("/transaction/:id", async (req, res) => {
    console.log("Get Transaction by id");
    let transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).json({ message: "Record not found." });
    }
});

// get transaction by transaction type
router.get("/transactions/:transactionTypeId", async (req, res) => {
    console.log("Get Transaction by transactionTypeId");
    let transactions = await Transaction.findAll({ where: 
        { 
            transactionTypeId: req.params.transactionTypeId,
            userId: getUser(req).userId,
            isDeleted: 0
        } });
    res.json(transactions);
});

// add
router.post("/transaction", async (req, res) => {
    console.log("Add transaction");
    let result = Validate(req.body);
    if (result.isValid) {
        let payload = { ...req.body }
        payload.userId = getUser(req).userId;
        let transaction = await Transaction.create({
            transactionTypeId: payload.transactionTypeId,
            expenseDate: payload.expenseDate,
            amount: payload.amount,
            note: payload.note,
            file: payload.file,
            userId: payload.userId,
            isDeleted: 0
        });
        res.json(transaction);
    } else {
        res.status(422).json(result.payload);
    }
});

// update
router.put("/transaction/:id", async (req, res) => {
    console.log("Update transaction");
    let transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
        await transaction.update(req.body);
        res.json(transaction);
    } else {
        res.status(404).json({ message: "Record not found." });
    }
});

// soft delete
router.delete("/transaction/delete/:id", async (req, res) => {
    console.log("Soft delete transaction");
    let idParam = req.params.id;
    let transaction = await Transaction.findByPk(idParam);
    if (transaction) {
        await transaction.update(
            { isDeleted: 1 },
            { where: { id: idParam} }
          )
        res.json(transaction);
    } else {
        res.status(404).json({ message: "Record not found." });
    }
});

module.exports = router;