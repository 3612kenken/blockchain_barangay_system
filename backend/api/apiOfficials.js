const express = require('express');
const router = express.Router();
const { 
    getAllOfficials, 
    addOfficial, 
    updateOfficial, 
    deleteOfficial, 
    searchOfficials 
} = require('../queries/manageOfficials');

// GET all officials
router.get('/', async (req, res) => {
    try {
        const officials = await getAllOfficials();
        res.status(200).json(officials);
    } catch (error) {
        console.error('Error fetching officials:', error);
        res.status(500).json({ error: 'Failed to fetch officials' });
    }
});

// POST a new official
router.post('/', async (req, res) => {
    try {
        const newOfficial = await addOfficial(req.body);
        res.status(201).json(newOfficial);
    } catch (error) {
        console.error('Error adding official:', error);
        res.status(500).json({ error: 'Failed to add official' });
    }
});

// PUT (update) an official by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedOfficial = await updateOfficial(req.params.id, req.body);
        if (!updatedOfficial) {
            return res.status(404).json({ error: 'Official not found' });
        }
        res.status(200).json(updatedOfficial);
    } catch (error) {
        console.error('Error updating official:', error);
        res.status(500).json({ error: 'Failed to update official' });
    }
});

// PATCH (partial update) an official by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedOfficial = await updateOfficial(req.params.id, req.body);
        if (!updatedOfficial) {
            return res.status(404).json({ error: 'Official not found' });
        }
        res.status(200).json(updatedOfficial);
    } catch (error) {
        console.error('Error partially updating official:', error);
        res.status(500).json({ error: 'Failed to partially update official' });
    }
});

// DELETE an official by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedOfficial = await deleteOfficial(req.params.id);
        if (!deletedOfficial) {
            return res.status(404).json({ error: 'Official not found' });
        }
        res.status(200).json(deletedOfficial);
    } catch (error) {
        console.error('Error deleting official:', error);
        res.status(500).json({ error: 'Failed to delete official' });
    }
});

module.exports = router;
