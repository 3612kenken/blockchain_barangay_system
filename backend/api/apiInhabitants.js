const express = require('express');
const router = express.Router();
const {
    getAllInhabitants,
    createInhabitant,
    updateInhabitant,
    deleteInhabitant,
    searchInhabitants,
} = require('../queries/manageInhabitants');

// Route to get all inhabitants
router.get('/', async (req, res) => {
    try {
        const inhabitants = await getAllInhabitants();
        res.status(200).json(inhabitants);
    } catch (error) {
        console.error('Error fetching inhabitants:', error);
        res.status(500).json({ error: 'Failed to fetch inhabitants', details: error.message });
    }
});

// Route to create a new inhabitant
router.post('/', async (req, res) => {
    try {
        const newInhabitant = await createInhabitant(req.body);
        res.status(201).json(newInhabitant);
    } catch (error) {
        console.error('Error creating inhabitant:', error);
        res.status(500).json({ error: 'Failed to create inhabitant', details: error.message });
    }
});

// Route to update an existing inhabitant
router.put('/:id', async (req, res) => {
    try {
        const updatedInhabitant = await updateInhabitant(req.params.id, req.body);
        res.status(200).json(updatedInhabitant);
    } catch (error) {
        console.error('Error updating inhabitant:', error);
        res.status(500).json({ error: 'Failed to update inhabitant', details: error.message });
    }
});

// Route to delete an inhabitant
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteInhabitant(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting inhabitant:', error);
        res.status(500).json({ error: 'Failed to delete inhabitant', details: error.message });
    }
});

// Route to search inhabitants
router.post('/search', async (req, res) => {
    try {
        const inhabitants = await searchInhabitants(req.body);
        res.status(200).json(inhabitants);
    } catch (error) {
        console.error('Error searching inhabitants:', error);
        res.status(500).json({ error: 'Failed to search inhabitants', details: error.message });
    }
});

module.exports = router;
