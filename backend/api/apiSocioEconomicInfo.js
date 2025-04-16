const express = require("express");
const router = express.Router();
const {
  addSocioEconomicInfo,
  editSocioEconomicInfo,
  deleteSocioEconomicInfo,
  searchSocioEconomicInfo,
} = require("../queries/manageSocioEconomicInfo");

// Add Socio-Economic Info
router.post("/add", async (req, res) => {
  try {
    const result = await addSocioEconomicInfo(req.body);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Edit Socio-Economic Info
router.put("/edit/:id", async (req, res) => {
  try {
    const result = await editSocioEconomicInfo(req.params.id, req.body);
    if (result.success) {
      res.status(200).json(result);
    } else if (result.message === "Socio-Economic Info not found") {
      res.status(404).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Delete Socio-Economic Info
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await deleteSocioEconomicInfo(req.params.id);
    if (result.success) {
      res.status(200).json(result);
    } else if (result.message === "Socio-Economic Info not found") {
      res.status(404).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred", error });
  }
});

// Search Socio-Economic Info
router.get("/search", async (req, res) => {
  try {
    const result = await searchSocioEconomicInfo(req.query);
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
