const connectToDatabase = require('./connection');
const DemographicInfo = require("../schema/demographicInfo");

// Add Demographic Info
async function addDemographicInfo(data) {
  try {
    const demographicInfo = new DemographicInfo(data);
    await demographicInfo.save();
    return { success: true, message: "Demographic Info added successfully", demographicInfo };
  } catch (error) {
    return { success: false, message: "Error adding Demographic Info", error };
  }
}

// Edit Demographic Info
async function editDemographicInfo(id, data) {
  try {
    const updatedDemographicInfo = await DemographicInfo.findByIdAndUpdate(id, data, { new: true });
    if (!updatedDemographicInfo) {
      return { success: false, message: "Demographic Info not found" };
    }
    return { success: true, message: "Demographic Info updated successfully", updatedDemographicInfo };
  } catch (error) {
    return { success: false, message: "Error updating Demographic Info", error };
  }
}

// Delete Demographic Info
async function deleteDemographicInfo(id) {
  try {
    const deletedDemographicInfo = await DemographicInfo.findByIdAndDelete(id);
    if (!deletedDemographicInfo) {
      return { success: false, message: "Demographic Info not found" };
    }
    return { success: true, message: "Demographic Info deleted successfully", deletedDemographicInfo };
  } catch (error) {
    return { success: false, message: "Error deleting Demographic Info", error };
  }
}

// Search Demographic Info
async function searchDemographicInfo(query) {
  try {
    const demographicInfos = await DemographicInfo.find(query);
    return { success: true, demographicInfos };
  } catch (error) {
    return { success: false, message: "Error searching Demographic Info", error };
  }
}

// Get all Demographic Info
async function getAllDemographicInfo() {
  try {
    const demographicInfos = await DemographicInfo.find({});
    return { success: true, demographicInfos };
  } catch (error) {
    return { success: false, message: "Error getting all Demographic Info", error };
  }
}

module.exports = {
  addDemographicInfo,
  editDemographicInfo,
  deleteDemographicInfo,
  searchDemographicInfo,
  getAllDemographicInfo,
};
