const { ethers } = require('ethers');
const fs = require('fs');

// Connect to Ethereum network
const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/XYKZXCBDBPwlIM-e7TONgQL_53Q7qkRl'); // Replace with your Ethereum node URL

// Load wallet from keystore file
const keystorePath = './blockchain/UTC2025-04-08T14-53-31.json'; // Corrected path to the keystore file
const keystorePassword = '3612nov6'; // Replace with your keystore password

let wallet;
async function loadWallet() {
    try {
        const keystore = fs.readFileSync(keystorePath, 'utf8');
        wallet = await ethers.Wallet.fromEncryptedJson(keystore, keystorePassword);
        wallet = wallet.connect(provider);
        console.log('Wallet loaded successfully');
    } catch (error) {
        console.error('Error loading wallet from keystore:', error);
        throw error;
    }
}

// Custom validators
const validators = [];

// Function to add a custom validator
function addValidator(validator) {
    if (typeof validator === 'function') {
        validators.push(validator);
    } else {
        throw new Error('Validator must be a function');
    }
}

// Function to remove a validator by index
function removeValidatorByIndex(index) {
    if (index >= 0 && index < validators.length) {
        validators.splice(index, 1);
        console.log(`Validator at index ${index} removed successfully.`);
        return true;
    } else {
        throw new Error('Invalid index. No validator removed.');
    }
}

// Function to remove all validators
function removeAllValidators() {
    validators.length = 0; // Clear the validators array
    console.log('All validators removed successfully.');
}

// Function to validate a transaction using custom validators
function validateTransaction(transaction) {
    for (const validator of validators) {
        if (!validator(transaction)) {
            return false;
        }
    }
    return true;
}

// Function to deploy a smart contract
async function deployContract(abi, bytecode, ...args) {
    try {
        const factory = new ethers.ContractFactory(abi, bytecode, wallet);
        const contract = await factory.deploy(...args);
        await contract.deploymentTransaction().wait();
        console.log('Contract deployed at:', contract.target);
        return contract;
    } catch (error) {
        console.error('Error deploying contract:', error);
        throw error;
    }
}

// Function to interact with a deployed contract
async function interactWithContract(contractAddress, abi, methodName, ...args) {
    try {
        const contract = new ethers.Contract(contractAddress, abi, wallet);
        const result = await contract[methodName](...args);
        console.log(`Result from ${methodName}:`, result);
        return result;
    } catch (error) {
        console.error(`Error interacting with contract method ${methodName}:`, error);
        throw error;
    }
}

// Function to send Ether
async function sendEther(to, amount) {
    try {
        const transaction = {
            to,
            value: ethers.parseEther(amount.toString()),
        };

        // Validate the transaction using custom validators
        if (!validateTransaction(transaction)) {
            throw new Error('Transaction validation failed');
        }

        const tx = await wallet.sendTransaction(transaction);
        await tx.wait();
        console.log('Transaction successful:', tx.hash);
        return tx.hash;
    } catch (error) {
        console.error('Error sending Ether:', error);
        throw error;
    }
}

// Ensure wallet is loaded before exporting functions
(async () => {
    await loadWallet();
})();

// Example custom validator: Ensure the recipient address is valid
addValidator((transaction) => {
    return ethers.utils.isAddress(transaction.to); // Updated to use ethers.utils.isAddress
});

// Example custom validator: Ensure the transaction value is greater than 0
addValidator((transaction) => {
    return transaction.value.gt(0);
});

module.exports = {
    deployContract,
    interactWithContract,
    sendEther,
    addValidator,
    removeValidatorByIndex,
    removeAllValidators,
};
