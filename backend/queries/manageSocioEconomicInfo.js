const connectToDatabase = require('./connection');
const SocioEconomicInfo = require("../schema/socioEconomicInfo");

// Add Socio-Economic Info
async function addSocioEconomicInfo(data) {
  try {
    const socioEconomicInfo = new SocioEconomicInfo(data);
    await socioEconomicInfo.save();
    return { success: true, message: "Socio-Economic Info added successfully", socioEconomicInfo };
  } catch (error) {
    return { success: false, message: "Error adding Socio-Economic Info", error };
  }
}

// Edit Socio-Economic Info
async function editSocioEconomicInfo(id, data) {
  try {
    const updatedSocioEconomicInfo = await SocioEconomicInfo.findByIdAndUpdate(id, data, { new: true });
    if (!updatedSocioEconomicInfo) {
      return { success: false, message: "Socio-Economic Info not found" };
    }
    return { success: true, message: "Socio-Economic Info updated successfully", updatedSocioEconomicInfo };
  } catch (error) {
    return { success: false, message: "Error updating Socio-Economic Info", error };
  }
}

// Delete Socio-Economic Info
async function deleteSocioEconomicInfo(id) {
  try {
    const deletedSocioEconomicInfo = await SocioEconomicInfo.findByIdAndDelete(id);
    if (!deletedSocioEconomicInfo) {
      return { success: false, message: "Socio-Economic Info not found" };
    }
    return { success: true, message: "Socio-Economic Info deleted successfully", deletedSocioEconomicInfo };
  } catch (error) {
    return { success: false, message: "Error deleting Socio-Economic Info", error };
  }
}

// Search Socio-Economic Info
async function searchSocioEconomicInfo(query) {
  try {
    const socioEconomicInfos = await SocioEconomicInfo.find(query);
    return { success: true, socioEconomicInfos };
  } catch (error) {
    return { success: false, message: "Error searching Socio-Economic Info", error };
  }
}

// Get all Socio-Economic Info
async function getAllSocioEconomicInfo() {
  try {
    const socioEconomicInfos = await SocioEconomicInfo.find({});
    return { success: true, socioEconomicInfos };
  } catch (error) {
    return { success: false, message: "Error getting all Socio-Economic Info", error };
  }
}

module.exports = {
  addSocioEconomicInfo,
  editSocioEconomicInfo,
  deleteSocioEconomicInfo,
  searchSocioEconomicInfo,
  getAllSocioEconomicInfo,
};
