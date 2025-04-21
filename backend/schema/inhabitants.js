const mongoose = require('mongoose');

const inhabitantSchema = new mongoose.Schema({
    headID: {
        type: String,
    },
    hPhilSysNo: {
        type: String,
    },
    barangayID: {
        type: String,
    },
    householdId: {
        type: String,
    },
    headOfHousehold: {
        type: String,
        required: true,
    },
    householdAddress: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: false,
    },
    members: [
        {
            headID: {
                type: String,
            },
            philSysNo: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: true,
            },
            ext: {
                type: String,
                required: true,
            },
            placeBirth: {
                type: String,
                required: true,
            },
            dateBirth: {
                type: Date,
            },
            sex: {
                type: String,
                enum: ['Male', 'Female', 'Other'],
                required: true,
            },
            civilStatus: {
                type: String,
                enum: ['Single', 'Married', 'Widowed', 'Divorced', 'Separated'],
                required: true,
            },
            citizenship: {
                type: String,
                enum: ['Filipino', 'Dual', 'Other'],
                required: true,
            },
            religion: {
                type: String,
                required: true,
            },
            
            education: {
                type: String,
                enum: ['No Formal Education', 'Elementary', 'High School', 'College', 'Postgraduate', 'Vocational'],
                required: true,
            },
            educationStatus: {
                type: String,
                enum: ['Graduated', 'Undergraduate', 'Completed'],
                required: true,
            },
            voter: {
                type: String,
                enum: ['Yes', 'No'],
                required: true,
            },
            citizenStatus: {
                type: String,
                enum: ['Labor/Employed', 'Unemployed','PWD','OFW','Senior Citizen','Solo Parent', 'Out of School Youth', 'Out of School Children', 'Student', 'Housewife', 'Retired', 'Other'],
                required: true,
            },
            occupation: {
                type: String,
            },
            relationshipToHead: {
                type: String,
                required: true,
            },
        },
    ],

   
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'tbl_inhabitants' });

module.exports = mongoose.model('Inhabitant', inhabitantSchema);
