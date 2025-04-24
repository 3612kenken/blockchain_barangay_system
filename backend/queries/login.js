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

// Function to hash a password
async function hashPassword(password) {
    try {
        const saltRounds = 10; // Number of salt rounds for bcrypt
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

// Function to verify a password
async function verifyPassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}

// Function to handle user login
async function loginUser(username, password) {
    try {
        await connectToDatabase(); // Ensure database connection
        const user = await User.findOne({ username }); // Find user by username

        if (!user) {
            throw new Error('User not found');
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            SECRET_KEY,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        return { token, user };
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

// Function to validate a JWT token
function validateToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('Error validating token:', error);
        throw error;
    }
}

module.exports = {
    loginUser,
    generateSecretKey,
    setSecretKey,
    hashPassword,
    verifyPassword,
    validateToken,
};
