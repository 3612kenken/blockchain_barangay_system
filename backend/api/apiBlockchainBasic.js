const express = require('express');
const router = express.Router();
const {
    addDataToBlockchain,
    getBlockchain,
    validateBlockchain,
    removeValidatorByIndex,
    removeAllValidators,
} = require('../blockchain/blockchain');

// Route to add data to the blockchain
router.post('/add', (req, res) => {
    try {
        const { data } = req.body; // Expect data to be added to the blockchain
        const newBlock = addDataToBlockchain(data);
        res.status(200).json({ message: 'Block added successfully', block: newBlock });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add block', details: error.message });
    }
});

// Route to get the entire blockchain
router.get('/', (req, res) => {
    try {
        const chain = getBlockchain();
        res.status(200).json({ blockchain: chain });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blockchain', details: error.message });
    }
});

// Route to validate the blockchain
router.get('/validate', (req, res) => {
    try {
        const isValid = validateBlockchain();
        res.status(200).json({ message: 'Blockchain validation result', isValid });
    } catch (error) {
        res.status(500).json({ error: 'Failed to validate blockchain', details: error.message });
    }
});

// Route to remove a validator by index
router.delete('/removeValidator/:index', (req, res) => {
    try {
        const index = parseInt(req.params.index, 10);
        removeValidatorByIndex(index);
        res.status(200).json({ message: `Validator at index ${index} removed successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove validator', details: error.message });
    }
});

// Route to remove all validators
router.delete('/removeAllValidators', (req, res) => {
    try {
        removeAllValidators();
        res.status(200).json({ message: 'All validators removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove all validators', details: error.message });
    }
});

module.exports = router;
