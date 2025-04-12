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
        res.status(500).json({ error: 'Failed to fetch inhabitants' });
    }
});

// Route to create a new inhabitant
router.post('/', async (req, res) => {
    try {
        const newInhabitant = await createInhabitant(req.body);
        res.status(201).json(newInhabitant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create inhabitant' });
    }
});

// Route to update an existing inhabitant
router.put('/:id', async (req, res) => {
    try {
        const updatedInhabitant = await updateInhabitant(req.params.id, req.body);
        res.status(200).json(updatedInhabitant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update inhabitant' });
    }
});

// Route to delete an inhabitant
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteInhabitant(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete inhabitant' });
    }
});

// Route to search inhabitants
router.post('/search', async (req, res) => {
    try {
        const inhabitants = await searchInhabitants(req.body);
        res.status(200).json(inhabitants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search inhabitants' });
    }
});

module.exports = router;
