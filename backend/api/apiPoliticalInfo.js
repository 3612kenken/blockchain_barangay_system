const express = require('express');
const router = express.Router();
const {
    addPoliticalInfo,
    editPoliticalInfo,
    deletePoliticalInfo,
    searchPoliticalInfo,
} = require('../queries/managePoliticalInfo');

// Route to add a new political info
router.post('/add', async (req, res) => {
    try {
        const newPoliticalInfo = await addPoliticalInfo(req.body);
        res.status(201).json({ message: 'Political info added successfully', data: newPoliticalInfo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add political info', details: error.message });
    }
});

// Route to edit an existing political info
router.put('/edit/:id', async (req, res) => {
    try {
        const updatedPoliticalInfo = await editPoliticalInfo(req.params.id, req.body);
        if (!updatedPoliticalInfo) {
            return res.status(404).json({ error: 'Political info not found' });
        }
        res.status(200).json({ message: 'Political info updated successfully', data: updatedPoliticalInfo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit political info', details: error.message });
    }
});

// Route to delete a political info
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await deletePoliticalInfo(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete political info', details: error.message });
    }
});

// Route to search political info
router.post('/search', async (req, res) => {
    try {
        const politicalInfos = await searchPoliticalInfo(req.body);
        res.status(200).json(politicalInfos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search political info', details: error.message });
    }
});

module.exports = router;
