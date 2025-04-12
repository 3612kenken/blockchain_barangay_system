const connectToDatabase = require('./connection');
const User = require('../schema/usersSchema');

// Function to create a new user
async function createUser(data) {
    try {
        await connectToDatabase();
        const newUser = new User(data);
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Function to update an existing user
async function updateUser(id, data) {
    try {
        await connectToDatabase();
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// Function to delete a user
async function deleteUser(id) {
    try {
        await connectToDatabase();
        await User.findByIdAndDelete(id);
        return { message: 'User deleted successfully' };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

// Function to search users
async function searchUsers(query) {
    try {
        await connectToDatabase();
        const users = await User.find(query);
        return users;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
};
