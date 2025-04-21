const connectToDatabase = require('./connection');
const Inhabitant = require('../schema/inhabitants');

// Function to get all inhabitants
async function getAllInhabitants() {
    try {
        await connectToDatabase(); // Establish database connection
        const inhabitants = await Inhabitant.find({}).populate('members'); // Populate members if needed
        return inhabitants;
    } catch (error) {
        console.error('Error fetching inhabitants:', error);
        throw error;
    }
}

// Function to create a new inhabitant
async function createInhabitant(data) {
    try {
        await connectToDatabase();
        const newInhabitant = new Inhabitant(data);
        await newInhabitant.save();
        return newInhabitant.populate('members'); // Populate members after saving
    } catch (error) {
        console.error('Error creating inhabitant:', error);
        throw error;
    }
}

// Function to update an existing inhabitant
async function updateInhabitant(id, data) {
    try {
        await connectToDatabase();
        const updatedInhabitant = await Inhabitant.findByIdAndUpdate(id, data, { new: true }).populate('members'); // Populate members after update
        return updatedInhabitant;
    } catch (error) {
        console.error('Error updating inhabitant:', error);
        throw error;
    }
}

// Function to delete an inhabitant
async function deleteInhabitant(id) {
    try {
        await connectToDatabase();
        await Inhabitant.findByIdAndDelete(id);
        return { message: 'Inhabitant deleted successfully' };
    } catch (error) {
        console.error('Error deleting inhabitant:', error);
        throw error;
    }
}

// Function to search inhabitants
async function searchInhabitants(query) {
    try {
        await connectToDatabase();
        const inhabitants = await Inhabitant.find(query).populate('members'); // Populate members in search results
        return inhabitants;
    } catch (error) {
        console.error('Error searching inhabitants:', error);
        throw error;
    }
}

module.exports = {
    getAllInhabitants,
    createInhabitant,
    updateInhabitant,
    deleteInhabitant,
    searchInhabitants,
};
