const { Router } = require("express");
const router = Router();
const { Dog, Temperament } = require("../db");

router.post("/", async (req, res) => {
  const { name, height, weight, life_span, img, temperament } = req.body;

  try {
    const [dog, created] = await Dog.findOrCreate({
      where: {
        name: name,
        height: height,
        weight: weight,
        life_span: life_span ? life_span : "",
        img: img ? img : "",
      },
    });
    if (!created) {
      return res.status(200).json({ message: "Breed already exists" });
    }

    // Add temperaments to dog
    if (temperament) {
      const temperamentResult = await Promise.all(
        temperament.map((value) => Temperament.findByPk(value))
      );

      await dog.setTemperaments(temperamentResult);
    }

    res.status(201).json(dog);
    // console.log(created);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
