const express = require('express');
const router = express.Router();
const {
    addDataToBlockchain,
    getBlockchain,
    validateBlockchain,
    removeValidatorByIndex,
    removeAllValidators,
    addValidator,
    getValidators,
} = require('../blockchain/blockchain');

// Route to add data to the blockchain
router.post('/add', (req, res) => {
    try {
        const { data, validator } = req.body; // Expect data and optional validator
        if (validator) {
            const validatorFunction = new Function('block', `return (${validator})(block);`);
            addValidator(validatorFunction); // Temporarily add the validator
        }
        const newBlock = addDataToBlockchain(data);
        res.status(200).json({ message: 'Block added successfully', block: newBlock });
    } catch (error) {
        console.error('Error adding block:', error.message);
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
        removeValidatorByIndex(index); // Ensure this function is correctly implemented
        res.status(200).json({ message: `Validator at index ${index} removed successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove validator', details: error.message });
    }
});

// Route to remove all validators
router.delete('/removeAllValidators', (req, res) => {
    try {
        removeAllValidators(); // Ensure this function is correctly implemented
        res.status(200).json({ message: 'All validators removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove all validators', details: error.message });
    }
});

// Route to add a validator
router.post('/addValidator', (req, res) => {
    try {
        const { validator } = req.body; // Expect a validator function as a string
        const validatorFunction = new Function('block', `return (${validator})(block);`); // Convert string to function
        addValidator(validatorFunction);
        res.status(200).json({ message: 'Validator added successfully' });
    } catch (error) {
        console.error('Error adding validator:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add validator', details: error.message });
    }
});

// Route to get the list of validators
router.get('/validators', (req, res) => {
    try {
        const validators = getValidators();
        res.status(200).json({ validators });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch validators', details: error.message });
    }
});

module.exports = router;
