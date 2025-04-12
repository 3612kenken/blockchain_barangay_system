const mongoose = require('mongoose');
const { Schema } = mongoose;

const demographicInfoSchema = new Schema({
    barangayCode: {
        type: String,
        required: true,
    },
    registeredVoters: {
        type: Number,
        required: true,
    },
    rbiDetails: {
        RBIs: {
            type: Boolean,
            required: true,
        },
        numberOfInhabitants: {
            type: Number,
            required: function () {
                return this.rbiDetails.RBIs;
            },
        },
        firstSem: {
            type: Number,
            required: function () {
                return this.rbiDetails.RBIs;
            },
        },
        secondSem: {
            type: Number,
            required: function () {
                return this.rbiDetails.RBIs;
            },
        },
    },
    numberOfHouseholds: {
        type: Number,
        required: true,
    },
    numberOfFamilies: {
        type: Number,
        required: true,
    },
    populationByAgeBracket: [
        {
            ageBracket: {
                type: String,
                required: true,
            },
            male: {
                type: Number,
                required: true,
            },
            female: {
                type: Number,
                required: true,
            },
            total: {
                type: Number,
                required: true,
            },
        },
    ],
    populationBySector: [
        {
            sector: {
                type: String,
                required: true,
            },
            male: {
                type: Number,
                required: true,
            },
            female: {
                type: Number,
                required: true,
            },
            total: {
                type: Number,
                required: true,
            },
        },
    ],
}, { collection: 'tbl_demographic_info' });

module.exports = mongoose.model('DemographicInfo', demographicInfoSchema);
