const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');   

const userSchema = new Schema({

    employee_id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'Invalid email address'],
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    user_level: {
        type: String,
        required: true,
    },
}, { collection: 'tbl_users' });

const User = mongoose.model('User', userSchema);
module.exports = User;

