const { Router } = require("express");
const router = Router();
const { Temperament } = require("../db");

router.get("/", async (req, res) => {
  try {
    const temperaments = await Temperament.findAll();
    temperaments.length
      ? res.json(temperaments)
      : res
          .status(404)
          .json({ error: "There are no temperaments in the database" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
