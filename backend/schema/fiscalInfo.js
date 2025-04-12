const mongoose = require('mongoose');
const { Schema } = mongoose;

const fiscalInfoSchema = new Schema({
    externalSources: {
        internalRevenueAllotment: {
            type: Number,
            required: true,
        },
        donationGrant: {
            type: Number,
            required: true,
        },
        shareFromNationalWealth: {
            type: Number,
            required: true,
        },
        othersExternalSubsidy: {
            type: Number,
            required: true,
        },
    },
    localSources: {
        rptShare: {
            type: Number,
            required: true,
        },
        feesAndCharges: {
            type: Number,
            required: true,
        },
        othersLocal: {
            type: Number,
            required: true,
        },
    },
}, { collection: 'tbl_fiscal_info' });

module.exports = mongoose.model('FiscalInfo', fiscalInfoSchema);
