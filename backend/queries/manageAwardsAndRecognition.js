const AwardsAndRecognition = require("../schema/awardsAndRecognition");

// Add Awards and Recognition
async function addAwardsAndRecognition(data) {
  try {
    const awardsAndRecognition = new AwardsAndRecognition(data);
    await awardsAndRecognition.save();
    return { success: true, message: "Awards and Recognition added successfully", awardsAndRecognition };
  } catch (error) {
    return { success: false, message: "Error adding Awards and Recognition", error };
  }
}

// Edit Awards and Recognition
async function editAwardsAndRecognition(id, data) {
  try {
    const updatedAwardsAndRecognition = await AwardsAndRecognition.findByIdAndUpdate(id, data, { new: true });
    if (!updatedAwardsAndRecognition) {
      return { success: false, message: "Awards and Recognition not found" };
    }
    return { success: true, message: "Awards and Recognition updated successfully", updatedAwardsAndRecognition };
  } catch (error) {
    return { success: false, message: "Error updating Awards and Recognition", error };
  }
}

// Delete Awards and Recognition
async function deleteAwardsAndRecognition(id) {
  try {
    const deletedAwardsAndRecognition = await AwardsAndRecognition.findByIdAndDelete(id);
    if (!deletedAwardsAndRecognition) {
      return { success: false, message: "Awards and Recognition not found" };
    }
    return { success: true, message: "Awards and Recognition deleted successfully", deletedAwardsAndRecognition };
  } catch (error) {
    return { success: false, message: "Error deleting Awards and Recognition", error };
  }
}

// Search Awards and Recognition
async function searchAwardsAndRecognition(query) {
  try {
    const awardsAndRecognitions = await AwardsAndRecognition.find(query);
    return { success: true, awardsAndRecognitions };
  } catch (error) {
    return { success: false, message: "Error searching Awards and Recognition", error };
  }
}

module.exports = {
  addAwardsAndRecognition,
  editAwardsAndRecognition,
  deleteAwardsAndRecognition,
  searchAwardsAndRecognition,
};
