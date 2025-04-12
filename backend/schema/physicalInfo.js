const mongoose = require('mongoose');
const { Schema } = mongoose;

const physicalInfoSchema = new Schema({
    physicalID: {
        type: String,
        required: true,
        unique: true,
    },
    barangayCode: {
        type: String,
        required: true,
    },
    totalLandArea: {
        type: Number,
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
        enum: ['Tabing-ilog', 'Tabing-dagat', 'Tabing-bundok', 'Poblacion'],
        required: true,
    },
    economicSource: {
        type: String,
        enum: ['Agricultural', 'Fishing', 'Commercial', 'Industrial'],
        required: true,
    },
}, { collection: 'tbl_physical_info' });

module.exports = mongoose.model('PhysicalInfo', physicalInfoSchema);
