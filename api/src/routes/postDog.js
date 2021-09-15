const { Router } = require("express");
const router = Router();
const { Dog, Temperament } = require("../db");

router.post("/", async (req, res) => {
  const { name, height, weight, life_span, image, temperaments } = req.body;

  try {
    const [dog, created] = await Dog.findOrCreate({
      where: {
        name: name,
        height: height,
        weight: weight,
        life_span: life_span ? life_span : "",
        image: image ? image : "",
      },
    });
    if (!created) {
      return res.status(200).json({ message: "Breed already exists" });
    }

    // Add temperaments to dog
    if (temperaments) {
      const temperamentsResult = await Promise.all(
        temperaments.map((value) => Temperament.findByPk(value))
      );
      await dog.setTemperaments(temperamentsResult);
    }

    res.status(201).json(dog);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
