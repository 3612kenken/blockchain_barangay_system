const express = require('express');
const router = express.Router();
const {
    addBarangayProfile,
    editBarangayProfile,
    deleteBarangayProfile,
    searchBarangayProfiles,
} = require('../queries/manageBarangayProfile');

// Route to add a new barangay profile
router.post('/add', async (req, res) => {
    try {
        const newProfile = await addBarangayProfile(req.body);
        res.status(201).json({ message: 'Barangay profile added successfully', profile: newProfile });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add barangay profile', details: error.message });
    }
});

// Route to edit an existing barangay profile
router.put('/edit', async (req, res) => {
    try {
        const updatedProfile = await editBarangayProfile(req.body.ids, req.body.data);
        res.status(200).json({ message: 'Barangay profile updated successfully', profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit barangay profile', details: error.message });
    }
});

// Route to delete a barangay profile
router.delete('/delete', async (req, res) => {
    try {
        const result = await deleteBarangayProfile(req.body.ids);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete barangay profile', details: error.message });
    }
});

// Route to search barangay profiles
router.post('/search', async (req, res) => {
    try {
        const profiles = await searchBarangayProfiles(req.body);
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search barangay profiles', details: error.message });
    }
});

module.exports = router;
