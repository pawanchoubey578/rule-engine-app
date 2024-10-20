
const express = require('express');
const Rule = require('../models/Rule');
const router = express.Router();

// Create a new rule
router.post('/create_rule', async (req, res) => {
    const { ruleString, astRepresentation } = req.body;
    try {
        const newRule = new Rule({ ruleString, astRepresentation });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all rules
router.get('/', async (req, res) => {
    try {
        const rules = await Rule.find();
        res.status(200).json(rules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
