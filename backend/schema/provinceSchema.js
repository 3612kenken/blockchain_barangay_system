const mongoose = require('mongoose');
const { Schema } = mongoose;

const provinceSchema = new mongoose.Schema({
    provinceCode: {
        type: String,
        required: true,
        unique: true,
    },
    regionName: {
        type: String,
        required: true,
    },
    provinceName: {
        type: String,
        required: true,
    },
    municipality: [{
        municipal_id: {
            type: String,
        },
        municipal: {
            type: String,
            required: true,
        },
    }]
}, { collection: 'tbl_provinces' });

const barangaySchema = new Schema({
    barangayCode: {
        type: String,
        required: true,
    },
    barangay: {
        type: String,
        required: true,
    },
    municipal_id: {
        type: String,
    },
}, { collection: 'tbl_barangay'});

const Barangay = mongoose.model('Barangay', barangaySchema);
const Province = mongoose.model('Province', provinceSchema);

module.exports = { Barangay,  Province };
