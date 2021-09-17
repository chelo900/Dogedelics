const { Router } = require("express");
const router = Router();
const {
  URL_API,
  parseDogs,
  parseDbDogs,
  fetchData,
  searchDbDogs,
  mergeDogs,
} = require("../utils/utils");

router.get("/", async (req, res) => {
  try {
    //fetch api dogs and parse
    const response = await fetchData(URL_API);
    const dogs = await parseDogs(response.data);

    //fetch db dogs and parse
    const dbDogs = parseDbDogs(await searchDbDogs());

    // merge dogs
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

    res.json(mergedDogs);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id, typeof id, "get route");

  if (id) {
    try {
      const response = await fetchData(URL_API);
      const dogs = await parseDogs(response.data);

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
