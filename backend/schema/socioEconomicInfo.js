const mongoose = require('mongoose');
const { Schema } = mongoose;

const socioEconomicInfoSchema = new Schema({
    barangayCode: {
        type: String,
        required: true,
    },
    basicUtilities: {
        inventoryOfFacilities: [
            {
                facility: {
                    type: String,
                    required: true,
                },
                status: {
                    type: String,
                    enum: ['YES', 'With Access Only', 'NONE'],
                    required: true,
                },
            },
        ],
        inventoryOfProperties: [
            {
                particular: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                remarks: {
                    type: String,
                },
            },
        ],
        accessToPotableWater: [
            {
                typeOrLevel: {
                    type: String,
                    required: true,
                },
                numberOfHouseholds: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    others: {
        largestPowerSupplyDistributor: {
            type: String,
            required: true,
        },
        majorWaterSupplyLevel: {
            type: String,
            required: true,
        },
        existingMeansOfTransportation: [
            {
                type: String,
                required: true,
            },
        ],
        existingMeansOfCommunication: [
            {
                type: String,
                required: true,
            },
        ],
    },
}, { collection: 'tbl_socio_economic_info' });

module.exports = mongoose.model('SocioEconomicInfo', socioEconomicInfoSchema);
