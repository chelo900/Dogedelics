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

//Map dogs for keeping the useful props
const parseDogs = (dogs) => {
  return dogs.map((dog) => {
    return (newDog = {
      id: dog.id,
      img: dog.image.url,
      name: dog.name,
      temperaments: dog.temperament ? dog.temperament : "",
      weight: dog.weight,
      height: dog.height,
      life_span: dog.life_span,
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
  parseTemperaments,
  loadTemperaments,
  fetchData,
  searchDbDogs,
  mergeDogs,
};
