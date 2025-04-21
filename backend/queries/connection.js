const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/db_brgyprofile';

async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // Added options for compatibility
        console.log({
            message: 'Connected to MongoDB',
            status: 'success',
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process on connection failure
    }
}

module.exports = connectToDatabase;
