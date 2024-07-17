const express = require('express');
const Transaction = require('../model/TransactionModel');
const Validation = require('../operations/category/Validate')
const router = express.Router();

// get all
router.get("/transactions", async (req, res) => {
    let transactions = await Transaction.findAll();
    res.json(transactions);
});

// get transaction by id
router.get("/transaction/:id", async (req, res) => {
    let transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).json({ message: "not found" });
    }
});

// add
router.post("/transaction", async (req, res) => {
    let result = Validation(req.body);
    if (result.isValid) {
        let transaction = await Transaction.create(req.body);
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
        res.status(404).json({ message: "not found" });
    }
});

// delete
router.delete("/transaction/:id", async (req, res) => {
    let transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
        await transaction.destroy();
        res.json({ message: "ok" });
    } else {
        res.status(404).json({ message: "not found" });
    }
});

module.exports = router;