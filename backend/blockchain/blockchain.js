const crypto = require('crypto');

// Simple Block structure
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
            .digest('hex');
    }
}

// Simple Blockchain structure
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.validators = []; // Custom validators
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    // Add a custom validator
    addValidator(validator) {
        if (typeof validator === 'function') {
            this.validators.push(validator);
        } else {
            throw new Error('Validator must be a function');
        }
    }

    // Validate a block using custom validators
    validateBlock(block) {
        for (const validator of this.validators) {
            if (!validator(block)) {
                return false;
            }
        }
        return true;
    }
}

// Initialize the blockchain
const myBlockchain = new Blockchain();

// Example functions to interact with the blockchain
function addDataToBlockchain(data) {
    const newBlock = new Block(myBlockchain.chain.length, Date.now(), data);
    if (myBlockchain.validateBlock(newBlock)) {
        myBlockchain.addBlock(newBlock);
        console.log('Block added:', newBlock);
        return newBlock;
    } else {
        throw new Error('Block validation failed');
    }
}

function getBlockchain() {
    return myBlockchain.chain;
}

function validateBlockchain() {
    return myBlockchain.isChainValid();
}

// Function to remove a validator by index
function removeValidatorByIndex(index) {
    if (index >= 0 && index < myBlockchain.validators.length) {
        myBlockchain.validators.splice(index, 1);
        console.log(`Validator at index ${index} removed successfully.`);
        return true;
    } else {
        throw new Error('Invalid index. No validator removed.');
    }
}

// Function to remove all validators
function removeAllValidators() {
    myBlockchain.validators.length = 0; // Clear the validators array
    console.log('All validators removed successfully.');
}

// Example custom validator: Ensure block data is not empty
myBlockchain.addValidator((block) => {
    return block.data && Object.keys(block.data).length > 0;
});

// Example custom validator: Ensure block timestamp is valid
myBlockchain.addValidator((block) => {
    return block.timestamp <= Date.now();
});

module.exports = {
    addDataToBlockchain,
    getBlockchain,
    validateBlockchain,
    removeValidatorByIndex,
    removeAllValidators,
};
