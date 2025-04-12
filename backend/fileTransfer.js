const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    dest: path.join(__dirname, 'uploads'), // Directory to store uploaded files
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Route to upload a file
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        res.status(200).json({ message: 'File uploaded successfully', file });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed', details: error.message });
    }
});

// Route to download a file
router.get('/download/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'uploads', filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.download(filePath, filename, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).json({ error: 'File download failed' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error processing file download', details: error.message });
    }
});

module.exports = router;
