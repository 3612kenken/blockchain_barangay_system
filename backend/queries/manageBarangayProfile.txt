const connectToDatabase = require('./connection');
const {
    PhysicalInfo,
    PoliticalInfo,
    FiscalInfo,
    DemographicInfo,
    SocioEconomicInfo,
    AwardsAndRecognition,
} = require('../schema/barangayProfile');

// Function to add a new barangay profile
async function addBarangayProfile(data) {
    try {
        await connectToDatabase();
        const { physicalInfo, politicalInfo, fiscalInfo, demographicInfo, socioEconomicInfo, awards } = data;

        const newPhysicalInfo = new PhysicalInfo(physicalInfo);
        await newPhysicalInfo.save();

        const newPoliticalInfo = new PoliticalInfo(politicalInfo);
        await newPoliticalInfo.save();

        const newFiscalInfo = new FiscalInfo(fiscalInfo);
        await newFiscalInfo.save();

        const newDemographicInfo = new DemographicInfo(demographicInfo);
        await newDemographicInfo.save();

        const newSocioEconomicInfo = new SocioEconomicInfo(socioEconomicInfo);
        await newSocioEconomicInfo.save();

        const newAwards = new AwardsAndRecognition(awards);
        await newAwards.save();

        return {
            physicalInfo: newPhysicalInfo,
            politicalInfo: newPoliticalInfo,
            fiscalInfo: newFiscalInfo,
            demographicInfo: newDemographicInfo,
            socioEconomicInfo: newSocioEconomicInfo,
            awards: newAwards,
        };
    } catch (error) {
        console.error('Error adding barangay profile:', error);
        throw error;
    }
}

// Function to edit an existing barangay profile
async function editBarangayProfile(id, data) {
    try {
        await connectToDatabase();
        const { physicalInfo, politicalInfo, fiscalInfo, demographicInfo, socioEconomicInfo, awards } = data;

        const updatedPhysicalInfo = await PhysicalInfo.findByIdAndUpdate(id.physicalInfoId, physicalInfo, { new: true });
        const updatedPoliticalInfo = await PoliticalInfo.findByIdAndUpdate(id.politicalInfoId, politicalInfo, { new: true });
        const updatedFiscalInfo = await FiscalInfo.findByIdAndUpdate(id.fiscalInfoId, fiscalInfo, { new: true });
        const updatedDemographicInfo = await DemographicInfo.findByIdAndUpdate(id.demographicInfoId, demographicInfo, { new: true });
        const updatedSocioEconomicInfo = await SocioEconomicInfo.findByIdAndUpdate(id.socioEconomicInfoId, socioEconomicInfo, { new: true });
        const updatedAwards = await AwardsAndRecognition.findByIdAndUpdate(id.awardsId, awards, { new: true });

        return {
            physicalInfo: updatedPhysicalInfo,
            politicalInfo: updatedPoliticalInfo,
            fiscalInfo: updatedFiscalInfo,
            demographicInfo: updatedDemographicInfo,
            socioEconomicInfo: updatedSocioEconomicInfo,
            awards: updatedAwards,
        };
    } catch (error) {
        console.error('Error editing barangay profile:', error);
        throw error;
    }
}

// Function to delete a barangay profile
async function deleteBarangayProfile(ids) {
    try {
        await connectToDatabase();
        await PhysicalInfo.findByIdAndDelete(ids.physicalInfoId);
        await PoliticalInfo.findByIdAndDelete(ids.politicalInfoId);
        await FiscalInfo.findByIdAndDelete(ids.fiscalInfoId);
        await DemographicInfo.findByIdAndDelete(ids.demographicInfoId);
        await SocioEconomicInfo.findByIdAndDelete(ids.socioEconomicInfoId);
        await AwardsAndRecognition.findByIdAndDelete(ids.awardsId);

        return { message: 'Barangay profile deleted successfully' };
    } catch (error) {
        console.error('Error deleting barangay profile:', error);
        throw error;
    }
}

// Function to search barangay profiles
async function searchBarangayProfiles(query) {
    try {
        await connectToDatabase();
        const physicalInfo = await PhysicalInfo.find(query.physicalInfo || {});
        const politicalInfo = await PoliticalInfo.find(query.politicalInfo || {});
        const fiscalInfo = await FiscalInfo.find(query.fiscalInfo || {});
        const demographicInfo = await DemographicInfo.find(query.demographicInfo || {});
        const socioEconomicInfo = await SocioEconomicInfo.find(query.socioEconomicInfo || {});
        const awards = await AwardsAndRecognition.find(query.awards || {});

        return {
            physicalInfo,
            politicalInfo,
            fiscalInfo,
            demographicInfo,
            socioEconomicInfo,
            awards,
        };
    } catch (error) {
        console.error('Error searching barangay profiles:', error);
        throw error;
    }
}

module.exports = {
    addBarangayProfile,
    editBarangayProfile,
    deleteBarangayProfile,
    searchBarangayProfiles,
};
