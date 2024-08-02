const express = require('express');
const Category = require('../model/CategoryModel');
const Validate = require('../operations/category/Validate')
const router = express.Router();
const authenticateUser = require('../middleware/AuthenticateUser');
const { getUser } = require('../helpers/AppHelper');

router.use(authenticateUser);

// get category by id
router.get("/category/:id", async (req, res) => {
    let category = await Category.findByPk(req.params.id);
    if (category) {
        res.json(category);
    } else {
        res.status(404).json({ message: "Record not found." });
    }
});

// get category by transaction type
router.get("/categories/:transactionTypeId", async (req, res) => {
    let categories = await Category.findAll({ where: 
        {
            transactionTypeId: req.params.transactionTypeId,
            userId: getUser(req).userId
        } });
    if (categories) {
        res.json(categories);
    } else {
        res.status(404).json({ message: "Record not found." });
    }
});

// add
router.post("/category", async (req, res) => {
    let result = Validate(req.body);
    if (result.isValid) {
        let payload = { ...req.body }
        payload.userId = getUser(req).userId;
        let category = await Category.create(payload);
        res.json(category);
    } else {
        res.status(422).json(result.payload);
    }
});

// update
router.put("/category/:id", async (req, res) => {
    let category = await Category.findByPk(req.params.id);
    if (category) {
        await category.update(req.body);
        res.json(category);
    } else {
        res.status(404).json({ message: "Record not found." });
    }
});

// delete
router.delete("/category/:id", async (req, res) => {
    let category = await Category.findByPk(req.params.id);

    if (category) {
        await category.destroy();
        res.json({ message: "ok" });
    } else {
        res.status(404).json({ message: "Record not found." });
    }
});

module.exports = router;