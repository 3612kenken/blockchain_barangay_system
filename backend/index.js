const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiOfficials = require('./api/apiOfficials'); // Import the API routes
const apiInhabitants = require('./api/apiInhabitants'); // Import the inhabitants API
const fileTransferRoutes = require('./fileTransfer'); // Import file transfer routes
const apiBlockchainBasic = require('./api/apiBlockchainBasic'); // Import blockchain API
const apiBlockchainEther = require('./api/apiBlockchainEther'); // Import Ethereum blockchain API
const apiUsers = require('./api/apiUsers'); // Import users API

app.use('/api/officials', apiOfficials); // Use the officials API routes
app.use('/api/inhabitants', apiInhabitants); // Use the inhabitants API routes
app.use('/api/files', fileTransferRoutes); // Use file transfer routes
app.use('/api/blockchain', apiBlockchainBasic); // Use the blockchain API routes
app.use('/api/blockchain/ether', apiBlockchainEther); // Use the Ethereum blockchain API routes
app.use('/api/users', apiUsers); // Use the users API routes

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


