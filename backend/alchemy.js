// filepath: d:\web-sample\three_bis\backend\alchemy.js
const { Network, Alchemy } = require('alchemy-sdk');
const ethers = require('ethers');
const fs = require('fs');

const settings = {
    apiKey: "XYKZXCBDBPwlIM-e7TONgQL_53Q7qkRl",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// Function to get transaction details
async function getTransactionDetails(txHash) {
    try {
        const txDetails = await alchemy.core.getTransaction(txHash);
        console.log('Transaction Details:', txDetails);
        return txDetails;
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        throw error;
    }
}

// Function to get transaction receipt
async function getTransactionReceipt(txHash) {
    try {
        const txReceipt = await alchemy.core.getTransactionReceipt(txHash);
        console.log('Transaction Receipt:', txReceipt);
        return txReceipt;
    } catch (error) {
        console.error('Error fetching transaction receipt:', error);
        throw error;
    }
}

// Function to send a transaction
async function sendTransaction(transaction) {
    try {
        const txResponse = await alchemy.core.sendTransaction(transaction);
        console.log('Transaction Sent:', txResponse);
        return txResponse;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw error;
    }
}

// Function to generate a signed transaction for testing using keystore
async function generateSignedTransaction() {
    try {
        const keystorePath = './blockchain/UTC2025-04-08T14-53-31.json'; // Path to your keystore file
        const keystorePassword = '3612nov6'; // Password for your keystore file

        // Load wallet from keystore
        const keystore = fs.readFileSync(keystorePath, 'utf8');
        const wallet = await ethers.Wallet.fromEncryptedJson(keystore, keystorePassword);
        const connectedWallet = wallet.connect(alchemy.core);

        const transaction = {
            to: "0x1075ae0fc96e8e26372338abd16fcc847a2fd41c", // Replace with a valid recipient address
            value: ethers.parseEther("0.01"), // Sending 0.01 Ether
            gasLimit: 21000, // Standard gas limit for Ether transfers
            gasPrice: ethers.parseUnits("10", "gwei"), // Gas price of 10 Gwei
            nonce: await connectedWallet.getTransactionCount(), // Get the nonce for the wallet
            chainId: 1, // Mainnet chain ID
        };

        const signedTransaction = await connectedWallet.signTransaction(transaction);
        console.log("Signed Transaction:", signedTransaction);
        return signedTransaction;
    } catch (error) {
        console.error("Error generating signed transaction:", error);
        throw error;
    }
}

// Example usage
async function main() {
    const txHash = "0x9e63085271890a141297039b3b711913699f1ee4db1acb667ad7ce304772036b";
    await getTransactionDetails(txHash);
    await getTransactionReceipt(txHash);

    // Generate and send a signed transaction
    const signedTransaction = await generateSignedTransaction();
    await sendTransaction(signedTransaction);
}

main();

module.exports = {
    getTransactionDetails,
    getTransactionReceipt,
    sendTransaction,
    generateSignedTransaction,
};