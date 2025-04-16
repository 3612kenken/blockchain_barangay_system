const express = require("express");
const router = express.Router();
const {
  addDemographicInfo,
  editDemographicInfo,
  deleteDemographicInfo,
  searchDemographicInfo,
} = require("../queries/manageDemographicInfo");

// Add Manage Demographic Info
router.post("/add", async (req, res) => {
  try {
    const result = await addDemographicInfo(req.body);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Edit Manage Demographic Info
router.put("/edit/:id", async (req, res) => {
  try {
    const result = await editDemographicInfo(req.params.id, req.body);
    if (result.success) {
      res.status(200).json(result);
    } else if (result.message === "Demographic Info not found") {
      res.status(404).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Delete Manage Demographic Info
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await deleteDemographicInfo(req.params.id);
    if (result.success) {
      res.status(200).json(result);
    } else if (result.message === "Demographic Info not found") {
      res.status(404).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Search Manage Demographic Info
router.get("/search", async (req, res) => {
  try {
    const result = await searchDemographicInfo(req.query);
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
