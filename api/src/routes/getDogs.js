const { Router } = require("express");
const router = Router();
const {
  URL_API,
  parseDogs,
  parseDbDogs,
  parseApiTemp,
  fetchData,
  searchDbDogs,
  mergeDogs,
} = require("../utils/utils");

router.get("/", async (req, res) => {
  try {
    const response = await fetchData(URL_API);

    const dogs = await parseDogs(response.data);

    // buscar razas en la BD
    const dbDogs = parseDbDogs(await searchDbDogs());

    // unir las razas
    const mergedDogs = mergeDogs(dogs, dbDogs);

    if (req.query.name) {
      const { name } = req.query;
      const queryDogs = mergedDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      return queryDogs.length
        ? res.json(queryDogs)
        : res.status(404).json({ error: "There is no such breed" });
    }

    // devolver las razas
    res.json(mergedDogs);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const response = await fetchData(URL_API);
      const dogs = parseDogs(response.data);

      // Search Breeds in DB
      const dbDogs = await searchDbDogs();

      // Merge breeds
      const mergedDogs = mergeDogs(dogs, dbDogs);

      //Filter breeds by name
      const filteredDog = mergedDogs.find((dog) => String(dog.id) === id);

      res.json(filteredDog);
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = router;
