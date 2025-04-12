const connectToDatabase = require('./connection');
const PhysicalInfo = require('../schema/physicalInfo');

// Function to add a new physical info
async function addPhysicalInfo(data) {
    try {
        await connectToDatabase();
        const newPhysicalInfo = new PhysicalInfo(data);
        await newPhysicalInfo.save();
        return newPhysicalInfo;
    } catch (error) {
        console.error('Error adding physical info:', error);
        throw error;
    }
}

// Function to edit an existing physical info
async function editPhysicalInfo(id, data) {
    try {
        await connectToDatabase();
        const updatedPhysicalInfo = await PhysicalInfo.findByIdAndUpdate(id, data, { new: true });
        return updatedPhysicalInfo;
    } catch (error) {
        console.error('Error editing physical info:', error);
        throw error;
    }
}

// Function to delete a physical info
async function deletePhysicalInfo(id) {
    try {
        await connectToDatabase();
        await PhysicalInfo.findByIdAndDelete(id);
        return { message: 'Physical info deleted successfully' };
    } catch (error) {
        console.error('Error deleting physical info:', error);
        throw error;
    }
}

// Function to search physical info
async function searchPhysicalInfo(query) {
    try {
        await connectToDatabase();
        const physicalInfos = await PhysicalInfo.find(query);
        return physicalInfos;
    } catch (error) {
        console.error('Error searching physical info:', error);
        throw error;
    }
}

module.exports = {
    addPhysicalInfo,
    editPhysicalInfo,
    deletePhysicalInfo,
    searchPhysicalInfo,
};
