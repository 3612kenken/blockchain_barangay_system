const express = require("express");
const router = express.Router();
const {
  addAwardsAndRecognition,
  editAwardsAndRecognition,
  deleteAwardsAndRecognition,
  searchAwardsAndRecognition,
} = require("../queries/manageAwardsAndRecognition");

// Add Awards and Recognition
router.post("/add", async (req, res) => {
  try {
    const result = await addAwardsAndRecognition(req.body);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Edit Awards and Recognition
router.put("/edit/:id", async (req, res) => {
  try {
    const result = await editAwardsAndRecognition(req.params.id, req.body);
    if (result.success) {
      res.status(200).json(result);
    } else if (result.message === "Awards and Recognition not found") {
      res.status(404).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Delete Awards and Recognition
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await deleteAwardsAndRecognition(req.params.id);
    if (result.success) {
      res.status(200).json(result);
    } else if (result.message === "Awards and Recognition not found") {
      res.status(404).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Search Awards and Recognition
router.get("/search", async (req, res) => {
  try {
    const result = await searchAwardsAndRecognition(req.query);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

module.exports = router;
