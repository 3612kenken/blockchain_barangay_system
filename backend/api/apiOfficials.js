const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
    getAllOfficials, 
    addOfficial, 
    updateOfficial, 
    deleteOfficial, 
    searchOfficials 
} = require('../queries/manageOfficials');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/officials'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

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
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const officialData = req.body;
        if (req.file) {
            officialData.image = `/uploads/officials/${req.file.filename}`;
        }
        const newOfficial = await addOfficial(officialData);
        res.status(201).json(newOfficial);
    } catch (error) {
        console.error('Error adding official:', error);
        res.status(500).json({ error: 'Failed to add official' });
    }
});

// PUT (update) an official by ID
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updatedData = req.body;
        if (req.file) {
            updatedData.image = `/uploads/officials/${req.file.filename}`;
        }
        const updatedOfficial = await updateOfficial(req.params.id, updatedData);
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
