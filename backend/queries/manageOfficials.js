const Official = require('../schema/officialsSchema'); // Import the correct schema
const connectToDatabase = require('./connection'); // Import the connection function

async function getAllOfficials() {
    try {
        await connectToDatabase(); // Ensure the database connection is established
        const officials = await Official.find(); // Fetch all officials
        return officials;
    } catch (error) {
        console.error('Error fetching officials:', error);
        throw error;
    }
}

async function addOfficial(officialData) {
    try {
        await connectToDatabase(); // Ensure the database connection is established
        const newOfficial = new Official(officialData); // Create a new official
        await newOfficial.save(); // Save the official to the database
        return newOfficial;
    } catch (error) {
        console.error('Error adding official:', error);
        throw error;
    }
}

async function updateOfficial(id, updatedData) {
    try {
        await connectToDatabase(); // Ensure the database connection is established
        const updatedOfficial = await Official.findByIdAndUpdate(id, updatedData, { new: true }); // Update the official
        return updatedOfficial;
    } catch (error) {
        console.error('Error updating official:', error);
        throw error;
    }
}

async function deleteOfficial(id) {
    try {
        await connectToDatabase(); // Ensure the database connection is established
        const deletedOfficial = await Official.findByIdAndDelete(id); // Delete the official
        return deletedOfficial;
    } catch (error) {
        console.error('Error deleting official:', error);
        throw error;
    }
}

async function searchOfficials(query) {
    try {
        await connectToDatabase(); // Ensure the database connection is established
        const officials = await Official.find(query); // Search officials based on the query
        return officials;
    } catch (error) {
        console.error('Error searching officials:', error);
        throw error;
    }
}

module.exports = { 
    getAllOfficials, 
    addOfficial, 
    updateOfficial, 
    deleteOfficial, 
    searchOfficials 
};