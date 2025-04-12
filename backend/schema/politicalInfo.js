const mongoose = require('mongoose');
const { Schema } = mongoose;

const politicalInfoSchema = new Schema({
    barangayCode: {
        type: String,
        required: true,
    },
    legalBasisOfCreation: {
        type: String,
        required: true,
    },
    dateOfPlebiscite: {
        type: Date,
        required: true,
    },
    numberOfPrecincts: {
        type: Number,
        required: true,
    },
    luponMember: {
        type: Number,
        required: true,
    },
    barangayTanod: {
        type: Number,
        required: true,
    },
    barangayHealthWorker: {
        type: Number,
        required: true,
    },
    barangayNutritionScholar: {
        type: Number,
        required: true,
    },
    dayCareWorker: {
        type: Number,
        required: true,
    },
    vawDeskOfficer: {
        type: Number,
        required: true,
    },
    badacClusterLeaders: {
        type: Number,
        required: true,
    },
    functionalityLevels: [
        {
            barangayBasedInst: {
                type: String,
                required: true,
            },
            ideal: {
                type: String,
                required: true,
            },
            highFunctional: {
                type: String,
                required: true,
            },
            moderateFunctional: {
                type: String,
                required: true,
            },
            lowFunctional: {
                type: String,
                required: true,
            },
            nonFunctional: {
                type: String,
                required: true,
            },
        },
    ],
}, { collection: 'tbl_political_info' });

module.exports = mongoose.model('PoliticalInfo', politicalInfoSchema);
