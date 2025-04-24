const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./schema/usersSchema'); // Ensure this matches your user schema path
const connectToDatabase = require('./queries/connection'); // Ensure this matches your connection file path

async function createDummyUsers() {
    try {
        await connectToDatabase(); // Connect to the database

        const users = [
            {
                username: 'john_doe',
                password: await bcrypt.hash('password123', 10), // Hash the password
                email: 'john.doe@example.com',
                role: 'admin',
                user_level: 'Level 1', // Add user_level
                employee_id: 'EMP001', // Add employee_id
            },
            {
                username: 'jane_smith',
                password: await bcrypt.hash('password456', 10),
                email: 'jane.smith@example.com',
                role: 'user',
                user_level: 'Level 2',
                employee_id: 'EMP002',
            },
            {
                username: 'alice_johnson',
                password: await bcrypt.hash('password789', 10),
                email: 'alice.johnson@example.com',
                role: 'user',
                user_level: 'Level 3',
                employee_id: 'EMP003',
            },
        ];

        // Insert users into the database
        await User.insertMany(users);
        console.log('Dummy users created successfully!');
        mongoose.connection.close(); // Close the database connection
    } catch (error) {
        console.error('Error creating dummy users:', error);
        mongoose.connection.close(); // Ensure the connection is closed on error
    }
}

// Run the script
createDummyUsers();
