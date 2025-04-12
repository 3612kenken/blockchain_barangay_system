const express = require('express');
const router = express.Router();
const {
    addPhysicalInfo,
    editPhysicalInfo,
    deletePhysicalInfo,
    searchPhysicalInfo,
} = require('../queries/managePhysicalInfo');

// Route to add a new physical info
router.post('/add', async (req, res) => {
    try {
        const newPhysicalInfo = await addPhysicalInfo(req.body);
        res.status(201).json({ message: 'Physical info added successfully', data: newPhysicalInfo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add physical info', details: error.message });
    }
});

// Route to edit an existing physical info
router.put('/edit/:id', async (req, res) => {
    try {
        const updatedPhysicalInfo = await editPhysicalInfo(req.params.id, req.body);
        if (!updatedPhysicalInfo) {
            return res.status(404).json({ error: 'Physical info not found' });
        }
        res.status(200).json({ message: 'Physical info updated successfully', data: updatedPhysicalInfo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit physical info', details: error.message });
    }
});

// Route to delete a physical info
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await deletePhysicalInfo(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete physical info', details: error.message });
    }
});

// Route to search physical info
router.post('/search', async (req, res) => {
    try {
        const physicalInfos = await searchPhysicalInfo(req.body);
        res.status(200).json(physicalInfos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search physical info', details: error.message });
    }
});

module.exports = router;
