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
    getPendingBlocks,
    approvePendingBlock,
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

// Route to get pending blocks
router.get('/pending', (req, res) => {
    try {
        const pendingBlocks = getPendingBlocks(); // Ensure this function returns the correct structure
        res.status(200).json({ pendingBlocks });
    } catch (error) {
        console.error('Error fetching pending blocks:', error.message);
        res.status(500).json({ error: 'Failed to fetch pending blocks', details: error.message });
    }
});

// Route to approve a pending block
router.post('/approve/:index', (req, res) => {
    try {
        const index = parseInt(req.params.index, 10);
        const approvedBlock = approvePendingBlock(index); // Approve the block
        res.status(200).json({ message: 'Block approved and added to the blockchain', block: approvedBlock });
    } catch (error) {
        console.error('Error approving block:', error.message);
        res.status(500).json({ error: 'Failed to approve block', details: error.message });
    }
});

// Route to approve a pending block by a specific validator
router.post('/approve/:index/:validatorIndex', (req, res) => {
    try {
        const index = parseInt(req.params.index, 10);
        const validatorIndex = parseInt(req.params.validatorIndex, 10);
        approvePendingBlock(index, validatorIndex); // Approve the block for the specific validator
        res.status(200).json({ message: `Block approved by validator ${validatorIndex}` });
    } catch (error) {
        console.error('Error approving block:', error.message);
        res.status(500).json({ error: 'Failed to approve block', details: error.message });
    }
});

module.exports = router;
