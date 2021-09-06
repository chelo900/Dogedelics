const { Router } = require("express");
const router = Router();
const {
  URL_API,
  parseDogs,
  fetchData,
  searchDbDogs,
  mergeDogs,
} = require("../utils/utils");

router.get("/", async (req, res) => {
  const { page } = req.body;

  try {
    const response = await fetchData(URL_API);

    const dogs = await parseDogs(response.data);

    // buscar razas en la BD
    const dbDogs = await searchDbDogs();

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

    //Paginacion
    const paginatedDogs = mergedDogs.slice(
      parseInt(page) - 1,
      parseInt(page) + 7
    );
    console.log(paginatedDogs.length);

    // devolver las razas
    res.json(paginatedDogs);
  } catch (error) {
    console.error(error);
  }
});

// imagen, nombre ,temperamento, altura, peso, años de vida

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
      const filteredDogs = mergedDogs.filter((dog) => dog.id === parseInt(id)); // TODO, problemas con los ID de los perros creados por mi

      res.json(filteredDogs);
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = router;
