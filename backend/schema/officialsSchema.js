const mongoose = require('mongoose');
const { Schema } = mongoose;
const officialsSchema = new Schema({
    employee_id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middle: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
    },
    email: {
        type: String,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String, // URL or file path of the uploaded image
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
}, { collection: 'tbl_officials' });

const Official = mongoose.model('Official', officialsSchema);
module.exports = Official;

