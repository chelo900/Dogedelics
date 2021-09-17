const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const axios = require("axios");

const URL_API = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// API Search Dogs
const fetchData = async (url) => await axios.get(url);

//DB Search Dogs
const searchDbDogs = async () => await Dog.findAll({ include: Temperament });

//Merge DB and API dogs
const mergeDogs = (dogs, dbDogs) => [...dbDogs, ...dogs];

//Parse api dogs
const parseDogs = async (dogs) => {
  return await Promise.all(
    dogs.map(async (dog) => {
      return (newDog = {
        id: dog.id,
        image: dog.image.url,
        name: dog.name,
        temperaments: await parseApiTemp(
          dog.temperament
            ? dog.temperament.split(",").map((temp) => temp.replace(" ", ""))
            : []
        ),
        weight: dog.weight.imperial
          .replace("–", "-")
          .split(" - ")
          .map((weight) => Math.round(Number(weight) * 0.453592)),

        height: dog.height.metric.split(" - ").map((weight) => Number(weight)),
        life_span: dog.life_span,
      });
    })
  );
};

//Parse db dogs
const parseDbDogs = (dogs) => {
  return dogs.map((dog) => {
    return (newDog = {
      id: dog.id,
      image: dog.image
        ? dog.image
        : "https://phraseit.net/image/rendered/vimjvd.jpg",
      name: dog.name,
      temperaments: dog.temperaments,
      weight: dog.weight.split("-").map((weight) => Number(weight)),
      height: dog.height.split("-").map((weight) => Number(weight)),
      life_span: dog.life_span ? dog.life_span : "",
    });
  });
};

//Flat, delete repeated and sort temperaments
const parseTemperaments = (temps) => {
  const tempString = temps.data
    .map((dog) => dog.temperament)
    .filter((temps) => temps && temps !== "" && temps !== " ")
    .join(",");

  const tempList = tempString.split(",").map((temp) => temp.replace(" ", ""));

  const temperaments = new Array(...new Set(tempList)).sort();

  return temperaments;
};

//Parse temperaments for matching db instances of temperaments table
const parseApiTemp = async (temps) => {
  const dbTemps = await Temperament.findAll();
  const temperaments = temps.map((temp) => {
    const foundTemp = dbTemps.find((dbTemp) => dbTemp.name === temp);
    if (foundTemp) return foundTemp;
    return undefined;
  });
  const cleanTemperaments = temperaments.filter((temp) => temp !== undefined);
  return cleanTemperaments;
};

// Save/load temperaments from database
const loadTemperaments = async () => {
  let temps = await Temperament.findAll();
  if (temps.length) {
    return console.log("Temperaments already loaded");
  }
  try {
    const response = await axios.get(URL_API);
    const temperaments = parseTemperaments(response);
    temperaments.forEach(
      async (temperament) => await Temperament.create({ name: temperament })
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  URL_API,
  parseDogs,
  parseDbDogs,
  parseTemperaments,
  parseApiTemp,
  loadTemperaments,
  fetchData,
  searchDbDogs,
  mergeDogs,
};
