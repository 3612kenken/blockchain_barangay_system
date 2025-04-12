const connectToDatabase = require('./connection');
const User = require('../schema/usersSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

let SECRET_KEY = 'your_secret_key'; // Default secret key

// Function to generate a secure secret key
function generateSecretKey() {
    return crypto.randomBytes(32).toString('hex'); // Generates a 256-bit (32-byte) key in hexadecimal format
}

// Function to set the SECRET_KEY dynamically
function setSecretKey(newKey) {
    if (typeof newKey === 'string' && newKey.length > 0) {
        SECRET_KEY = newKey;
        console.log('SECRET_KEY updated successfully.');
    } else {
        throw new Error('Invalid secret key. It must be a non-empty string.');
    }
}

// Example usage to generate and log a secret key
if (require.main === module) {
    const secretKey = generateSecretKey();
    console.log('Generated Secret Key:', secretKey);
}

// Function to handle user login
async function loginUser(email, password) {
    try {
        await connectToDatabase();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, user_level: user.user_level },
            SECRET_KEY,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        return { token, user };
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

module.exports = {
    loginUser,
    generateSecretKey,
    setSecretKey,
};
