const express = require('express');
const router = express.Router();

router.get("/transaction-types", (req, res) => {
    res.json([]);
});

module.exports = router;