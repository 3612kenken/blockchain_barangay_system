const express = require('express');
const app = express();
const apiBlockchainBasic = require('./api/apiBlockchainBasic');

// Middleware to parse JSON
app.use(express.json());

// Mount the blockchain API
app.use('/api/blockchain', apiBlockchainBasic);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});