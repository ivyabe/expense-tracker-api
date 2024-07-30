const express = require('express');
const Transaction = require('../model/TransactionModel');
const Validation = require('../operations/transaction/Validate')
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/AuthenticateUser');
const { getUser } = require('../helpers/AppHelper');

router.use(authenticateUser);

// get all
// router.get("/transactions", async (req, res) => {
//     let transactions = await Transaction.findAll();
//     res.json(transactions);
// });

// get transaction by id
router.get("/transaction/:id", async (req, res) => {
    let transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).json({ message: "not found" });
    }
});

// get transaction by transaction type
router.get("/transactions/:transactionTypeId", async (req, res) => {
    let transactions = await Transaction.findAll({ where: { transactionTypeId: req.params.transactionTypeId } });
    res.json(transactions);
});

// add
router.post("/transaction", async (req, res) => {
    let result = Validation(req.body);
    if (result.isValid) {
        let payload = { ...req.body }
        payload.userId = getUser(req).userId;
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