const connectToDatabase = require('./connection');
const FiscalInfo = require("../schema/fiscalInfo");

// Add Fiscal Info
async function addFiscalInfo(data) {
  try {
    const fiscalInfo = new FiscalInfo(data);
    await fiscalInfo.save();
    return { success: true, message: "Fiscal Info added successfully", fiscalInfo };
  } catch (error) {
    return { success: false, message: "Error adding Fiscal Info", error };
  }
}

// Edit Fiscal Info
async function editFiscalInfo(id, data) {
  try {
    const updatedFiscalInfo = await FiscalInfo.findByIdAndUpdate(id, data, { new: true });
    if (!updatedFiscalInfo) {
      return { success: false, message: "Fiscal Info not found" };
    }
    return { success: true, message: "Fiscal Info updated successfully", updatedFiscalInfo };
  } catch (error) {
    return { success: false, message: "Error updating Fiscal Info", error };
  }
}

// Delete Fiscal Info
async function deleteFiscalInfo(id) {
  try {
    const deletedFiscalInfo = await FiscalInfo.findByIdAndDelete(id);
    if (!deletedFiscalInfo) {
      return { success: false, message: "Fiscal Info not found" };
    }
    return { success: true, message: "Fiscal Info deleted successfully", deletedFiscalInfo };
  } catch (error) {
    return { success: false, message: "Error deleting Fiscal Info", error };
  }
}

// Search Fiscal Info
async function searchFiscalInfo(query) {
  try {
    const fiscalInfos = await FiscalInfo.find(query);
    return { success: true, fiscalInfos };
  } catch (error) {
    return { success: false, message: "Error searching Fiscal Info", error };
  }
}

// Get all Fiscal Info
async function getAllFiscalInfo() {
  try {
    const fiscalInfos = await FiscalInfo.find({});
    return { success: true, fiscalInfos };
  } catch (error) {
    return { success: false, message: "Error getting all Fiscal Info", error };
  }
}

module.exports = {
  addFiscalInfo,
  editFiscalInfo,
  deleteFiscalInfo,
  searchFiscalInfo,
  getAllFiscalInfo, // Added new function to exports
};
