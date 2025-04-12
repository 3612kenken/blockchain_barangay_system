const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, searchUsers } = require('../queries/manageUsers');
const { loginUser } = require('../queries/login');

// Route to create a new user
router.post('/create', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
});

// Route to update an existing user
router.put('/update/:id', async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
});

// Route to delete a user
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
});

// Route to search users
router.post('/search', async (req, res) => {
    try {
        const users = await searchUsers(req.body);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search users', details: error.message });
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body; // Expect email and password in the request body
        const { token, user } = await loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(401).json({ error: 'Login failed', details: error.message });
    }
});

module.exports = router;
