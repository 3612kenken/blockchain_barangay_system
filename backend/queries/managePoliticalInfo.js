const connectToDatabase = require('./connection');
const PoliticalInfo = require('../schema/politicalInfo');

// Function to add a new political info
async function addPoliticalInfo(data) {
    try {
        await connectToDatabase();
        const newPoliticalInfo = new PoliticalInfo(data);
        await newPoliticalInfo.save();
        return newPoliticalInfo;
    } catch (error) {
        console.error('Error adding political info:', error);
        throw error;
    }
}

// Function to edit an existing political info
async function editPoliticalInfo(id, data) {
    try {
        await connectToDatabase();
        const updatedPoliticalInfo = await PoliticalInfo.findByIdAndUpdate(id, data, { new: true });
        return updatedPoliticalInfo;
    } catch (error) {
        console.error('Error editing political info:', error);
        throw error;
    }
}

// Function to delete a political info
async function deletePoliticalInfo(id) {
    try {
        await connectToDatabase();
        await PoliticalInfo.findByIdAndDelete(id);
        return { message: 'Political info deleted successfully' };
    } catch (error) {
        console.error('Error deleting political info:', error);
        throw error;
    }
}

// Function to search political info
async function searchPoliticalInfo(query) {
    try {
        await connectToDatabase();
        const politicalInfos = await PoliticalInfo.find(query);
        return politicalInfos;
    } catch (error) {
        console.error('Error searching political info:', error);
        throw error;
    }
}

module.exports = {
    addPoliticalInfo,
    editPoliticalInfo,
    deletePoliticalInfo,
    searchPoliticalInfo,
};
