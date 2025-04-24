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
        this.pendingBlocks = []; // Store pending blocks
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

    // Add a block to the pending list with approval status
    addPendingBlock(block) {
        const approvalStatus = this.validators.map(() => false); // Initialize approval status for all validators
        this.pendingBlocks.push({ block, approvalStatus });
    }

    // Get all pending blocks with approval status
    getPendingBlocks() {
        return this.pendingBlocks.map(({ block, approvalStatus }) => ({
            block,
            approvalStatus,
        }));
    }

    // Approve a pending block by a specific validator
    approvePendingBlock(index, validatorIndex) {
        const pendingBlock = this.pendingBlocks[index];
        if (!pendingBlock) {
            throw new Error('Invalid pending block index');
        }

        pendingBlock.approvalStatus[validatorIndex] = true; // Mark the validator as approved

        // Check if all validators have approved the block
        const allApproved = pendingBlock.approvalStatus.every((status) => status);
        if (allApproved) {
            this.addBlock(pendingBlock.block); // Move the block to the chain
            this.pendingBlocks.splice(index, 1); // Remove the block from pending
        }
    }
}

// Initialize the blockchain
const myBlockchain = new Blockchain();

// Example functions to interact with the blockchain
function addDataToBlockchain(data) {
    const newBlock = new Block(myBlockchain.chain.length, Date.now(), data);
    myBlockchain.addPendingBlock(newBlock); // Add to pending immediately
    return newBlock;
}

// Approve a pending block by a specific validator
function approvePendingBlock(index, validatorIndex) {
    myBlockchain.approvePendingBlock(index, validatorIndex);
}

function getBlockchain() {
    return myBlockchain.chain;
}

function validateBlockchain() {
    return myBlockchain.isChainValid();
}

// Function to add a validator
function addValidator(validator) {
    if (typeof validator === 'function') {
        myBlockchain.addValidator(validator);
    } else {
        throw new Error('Validator must be a function');
    }
}

// Function to remove a validator by index
function removeValidatorByIndex(index) {
    if (index >= 0 && index < myBlockchain.validators.length) {
        myBlockchain.validators.splice(index, 1); // Remove validator at the specified index
        return true;
    } else {
        throw new Error('Invalid index. No validator removed.');
    }
}

// Function to remove all validators
function removeAllValidators() {
    myBlockchain.validators.length = 0; // Clear the validators array
}

// Function to retrieve the list of validators
function getValidators() {
    return myBlockchain.validators.map((validator, index) => ({
        index,
        code: validator.toString(),
    }));
}

// Function to retrieve pending blocks
function getPendingBlocks() {
    return myBlockchain.getPendingBlocks();
}

// Example custom validator: Ensure block data is not empty
myBlockchain.addValidator((block) => {
    return block.data && Object.keys(block.data).length > 0;
});

// Example custom validator: Ensure block timestamp is valid
myBlockchain.addValidator((block) => {
    return typeof block.timestamp === 'number' && block.timestamp <= Date.now();
});

// Export the myBlockchain instance
module.exports = {
    myBlockchain,
    addDataToBlockchain,
    getBlockchain,
    validateBlockchain,
    addValidator,
    removeValidatorByIndex,
    removeAllValidators,
    getValidators,
    getPendingBlocks,
    approvePendingBlock, // Export the function to approve pending blocks
};
