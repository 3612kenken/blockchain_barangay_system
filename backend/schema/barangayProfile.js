const mongoose = require('mongoose');
const { Schema } = mongoose;

const physicalInfoSchema =  new Schema({
    barangayCode: {
        type: String,
        required: true,
    },
    physicalID: {
        type: String,
        required: true,
        unique: true,
    },
    totalLandArea: {
        type: Number, // Changed from Double to Number
        required: true,
    },
    barangayCategory: {
        type: String,
        enum: ['Urban', 'Rural'],
        required: true,
    },
    landClassification: {
        type: String,
        enum: ['Upland', 'Lowland', 'Coastal', 'Landlocked'],
        required: true,
    },
    barangayLocation: {
        type: String,
        enum: ['Tabing-ilog', 'Tabing-dagat', 'Tabing-bundok','Poblacion'],
        required: true,
    },
    economicSource: {
        type: String,
        enum: ['Agricultural', 'Fishing', 'Commercial','Industrial'],
        required: true,
    },

}, { collection: 'tbl_physical_info' });

const PoliticalInfoSchema = new Schema({
    barangayCode: {
        type: String,
        required: true,
    },
    legalBasisOfCreation: { 
        type: String, 
        required: true 
    },
    dateOfPlebiscite: { 
        type: Date, 
        required: true 
    },
    numberOfPrecincts: { 
        type: Number,
        required: true 
    },
    luponMember: { 
        type: Number, 
        required: true 
    },
    barangayTanod: { 
        type: Number, 
        required: true 
    },
    barangayHealthWorker: { 
        type: Number, 
        required: true 
    },
    barangayNutritionScholar: {
        type: Number, 
        required: true 
    },
    dayCareWorker: { 
        type: Number,
        required: true 
    },
    vawDeskOfficer: { 
        type: Number,
        required: true 
    },
    badacClusterLeaders: { 
        type: Number, 
        required: true 
    },
    functionalityLevels: [
        {
            barangayBasedInst: { 
                type: String, 
                required: true 
            },
            ideal: { 
                type: String, 
                required: true 
            },
            highFunctional: { 
                type: String, 
                required: true 
            },
            moderateFunctional: { 
                type: String, 
                required: true 
            },
            lowFunctional: { 
                type: String, 
                required: true 
            },
            nonFunctional: { 
                type: String, 
                required: true 
            }
        },
    ],
}, { collection: 'tbl_political_info' });

const FiscalInfoSchema = new Schema({
    externalSources: {
        internalRevenueAllotment: { 
            type: Number, 
            required: true 
        },
        donationGrant: { 
            type: Number, 
            required: true 
        },
        shareFromNationalWealth: { 
            type: Number, 
            required: true 
        },
        othersExternalSubsidy: { 
            type: Number, 
            required: true 
        },
    },
    localSources: {
        rptShare: { 
            type: Number, 
            required: true 
        },
        feesAndCharges: { 
            type: Number, 
            required: true 
        },
        othersLocal: { 
            type: Number, 
            required: true 
        }
    },
}, { collection: 'tbl_fiscal_info' });

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

const awardsAndRecognitionSchema = new Schema({
    barangayCode: {
        type: String,
        required: true,
    },
    awards: {
        nationalLevel: {
            type: String,
            required: false,
        },
        regionalLevel: {
            type: String,
            required: false,
        },
        localLevel: {
            type: String,
            required: false,
        },
    },
}, { collection: 'tbl_awards_recognition' });

const SocioEconomicInfo = mongoose.model('SocioEconomicInfo', socioEconomicInfoSchema);
const DemographicInfo = mongoose.model('DemographicInfo', demographicInfoSchema);
const FiscalInfo = mongoose.model('FiscalInfo', FiscalInfoSchema);
const PoliticalInfo = mongoose.model('PoliticalInfo', PoliticalInfoSchema);
const PhysicalInfo = mongoose.model('PhysicalInfo', physicalInfoSchema);
const AwardsAndRecognition = mongoose.model('AwardsAndRecognition', awardsAndRecognitionSchema);

module.exports = {
    FiscalInfo,
    PhysicalInfo,
    PoliticalInfo,
    DemographicInfo,
    SocioEconomicInfo,
    AwardsAndRecognition,
};
