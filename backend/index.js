const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import API routes
const apiOfficials = require('./api/apiOfficials');
const apiInhabitants = require('./api/apiInhabitants');
const fileTransferRoutes = require('./fileTransfer');
const apiBlockchainBasic = require('./api/apiBlockchainBasic');
const apiBlockchainEther = require('./api/apiBlockchainEther');
const apiUsers = require('./api/apiUsers');
const apiBarangayProfile = require('./api/apiBarangayProfile');
const apiPoliticalInfo = require('./api/apiPoliticalInfo');
const apiPhysicalInfo = require('./api/apiPhysicalInfo');
const apiFiscalInfo = require('./api/apiFiscalInfo');
const apiDemographicInfo = require('./api/apiDemographicInfo');
const apiSocioEconomicInfo = require('./api/apiSocioEconomicInfo');
const apiAwardsAndRecognition = require('./api/apiAwardsAndRecognition');

// Use API routes
app.use('/api/officials', apiOfficials);
app.use('/api/inhabitants', apiInhabitants);
app.use('/api/files', fileTransferRoutes);
app.use('/api/blockchain', apiBlockchainBasic);
app.use('/api/blockchain/ether', apiBlockchainEther);
app.use('/api/users', apiUsers);
app.use('/api/barangay-profile', apiBarangayProfile);
app.use('/api/political-info', apiPoliticalInfo);
app.use('/api/physical-info', apiPhysicalInfo);
app.use('/api/fiscal-info', apiFiscalInfo);
app.use('/api/demographic-info', apiDemographicInfo);
app.use('/api/socio-economic-info', apiSocioEconomicInfo);
app.use('/api/awards-recognition', apiAwardsAndRecognition);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});




