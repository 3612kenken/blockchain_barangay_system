const mongoose = require('mongoose');
const { Schema } = mongoose;

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

module.exports = mongoose.model('AwardsAndRecognition', awardsAndRecognitionSchema);
