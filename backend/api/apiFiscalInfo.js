const express = require("express");
const router = express.Router();
const {
  addFiscalInfo,
  editFiscalInfo,
  deleteFiscalInfo,
  searchFiscalInfo,
} = require("../queries/manageFiscalInfo");

// Add Manage Fiscal Info
router.post("/add", async (req, res) => {
  try {
    const result = await addFiscalInfo(req.body);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Edit Manage Fiscal Info
router.put("/edit/:id", async (req, res) => {
  try {
    const result = await editFiscalInfo(req.params.id, req.body);
    if (result.success) {
      res.status(200).json(result);
    } else if (result.message === "Fiscal Info not found") {
      res.status(404).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Delete Manage Fiscal Info
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await deleteFiscalInfo(req.params.id);
    if (result.success) {
      res.status(200).json(result);
    } else if (result.message === "Fiscal Info not found") {
      res.status(404).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Search Manage Fiscal Info
router.get("/search", async (req, res) => {
  try {
    const result = await searchFiscalInfo(req.query);
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
