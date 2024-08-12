const express = require('express');
const Transaction = require('../model/TransactionModel');
const Validate = require('../operations/transaction/Validate')
const router = express.Router();
const authenticateUser = require('../middleware/AuthenticateUser');
const { getUser } = require('../helpers/AppHelper');

router.use(authenticateUser);

// get transaction by id
router.get("/transaction/:id", async (req, res) => {
    let transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).json({ message: "Record not found." });
    }
});

// get transaction by transaction type
router.get("/transactions/:transactionTypeId", async (req, res) => {
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
    let result = Validate(req.body);
    if (result.isValid) {
        let payload = { ...req.body }
        payload.userId = getUser(req).userId;
        payload.isDeleted = 0;
        let transaction = await Transaction.create(payload);
        res.json(transaction);
    } else {
        res.status(422).json(result.payload);
    }
});

// update
router.put("/transaction/:id", async (req, res) => {
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
    let idParam = req.params.id;
    let transaction = await Transaction.findByPk(idParam);
    if (transaction) {
        await transaction.update(
            { isDeleted: 1, deletedAt: new Date()},
            { where: { id: idParam} }
          )
        res.json(transaction);
    } else {
        res.status(404).json({ message: "Record not found." });
    }
});

module.exports = router;