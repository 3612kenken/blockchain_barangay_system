const express = require('express');
const router = express.Router();
const { deployContract, interactWithContract, sendEther, addValidator, removeValidatorByIndex, removeAllValidators } = require('../blockchain/threeBISBlockChain');

// Route to deploy a smart contract
router.post('/deploy', async (req, res) => {
    try {
        const { abi, bytecode, args } = req.body; // Expect ABI, bytecode, and constructor arguments
        const contract = await deployContract(abi, bytecode, ...args);
        res.status(200).json({ message: 'Contract deployed successfully', address: contract.target });
    } catch (error) {
        res.status(500).json({ error: 'Failed to deploy contract', details: error.message });
    }
});

// Route to interact with a deployed contract
router.post('/interact', async (req, res) => {
    try {
        const { contractAddress, abi, methodName, args } = req.body; // Expect contract details and method info
        const result = await interactWithContract(contractAddress, abi, methodName, ...args);
        res.status(200).json({ message: 'Interaction successful', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to interact with contract', details: error.message });
    }
});

// Route to send Ether
router.post('/sendEther', async (req, res) => {
    try {
        const { to, amount } = req.body; // Expect recipient address and amount
        const txHash = await sendEther(to, amount);
        res.status(200).json({ message: 'Ether sent successfully', transactionHash: txHash });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send Ether', details: error.message });
    }
});

// Route to add a custom validator
router.post('/addValidator', (req, res) => {
    try {
        const { validatorCode } = req.body; // Expect a string containing the validator function code
        if (!validatorCode) {
            return res.status(400).json({ error: 'Validator code is required' });
        }

        // Dynamically create a validator function from the provided code
        const validatorFunction = new Function('transaction', validatorCode);

        // Add the validator to the blockchain
        addValidator(validatorFunction);
        res.status(200).json({ message: 'Validator added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add validator', details: error.message });
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
