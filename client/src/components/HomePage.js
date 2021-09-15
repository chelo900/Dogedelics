import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperaments,
  orderDogs,
  filterDogsByOrigin,
  filterDogsByTemp,
  clearFilters,
} from "../actions";
import { temperamentsOptions } from "../utils";
import DogCard from "./Card";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

export const HomePage = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs); //Get dogs from state
  const temperaments = useSelector((state) => state.temperaments); //Get temperaments from state

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const lastDog = currentPage * dogsPerPage;
  const firstDog = lastDog - dogsPerPage;
  const currentDogs = dogs.slice(firstDog, lastDog);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleOnClick = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(clearFilters());
    dispatch(getDogs());
  };

  const handlePage = (event) => {
    event.preventDefault();
    if (event.target.name === "next") {
      if (currentPage >= Math.ceil(dogs.length / dogsPerPage))
        return alert("This is the last page");
      setCurrentPage(currentPage + 1);
    }

    if (event.target.name === "prev") {
      if (currentPage === 1) {
        return alert("This is the first page");
      }
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterTemps = (event) => {
    if (event.target.value !== "") {
      setCurrentPage(1);
      dispatch(filterDogsByTemp(event.target.name, event.target.value));
    }
  };
  const handleFilterOrigin = (event) => {
    setCurrentPage(1);
    dispatch(filterDogsByOrigin(event.target.name, event.target.value));
  };

  const handleOrder = (event) => {
    setCurrentPage(1);
    console.log(event.target.value);
    dispatch(orderDogs(event.target.value));
  };

  const dogsElements = currentDogs.map((dog) => {
    return (
      <DogCard
        key={dog.id}
        name={dog.name}
        image={dog.image}
        weight={dog.weight}
        temperaments={dog.temperaments.map((temp) => temp.name)}
      />
    );
  });

  return (
    <div>
      <h1>DOG-EDELICS</h1>
      <Link to="/createdog">Create Breed</Link>
      <button onClick={handleOnClick}>RESET FILTERS</button>
      <div>
        <label htmlFor="temperamentSelect">Temperaments:</label>
        <select
          name="temperament"
          id="temperamentSelect"
          onChange={handleFilterTemps}
        >
          <option value="">Choose Temperaments</option>

          {temperamentsOptions(temperaments)}
        </select>

        <label htmlFor="originSelect">Origin</label>
        <select name="origin" id="originSelect" onChange={handleFilterOrigin}>
          <option value="allDogs">All Dogs</option>
          <option value="existentDogs">Existent Dogs</option>
          <option value="myDogs">My Dogs</option>
        </select>
        <label htmlFor="orderBySelect">Order By: </label>
        <select name="orderBy" id="orderBySelect" onChange={handleOrder}>
          <option value="nameAsc">A-Z</option>
          <option value="nameDesc">Z-A</option>
          <option value="weightAsc">Weight Asc</option>
          <option value="weightDesc">Weight Desc</option>
        </select>
        <div>
          <Pagination
            currentPage={currentPage}
            dogsPerPage={dogsPerPage}
            dogs={dogs}
            pagination={pagination}
            handlePage={handlePage}
          />
        </div>
        <SearchBar />
        {dogsElements}
      </div>
    </div>
  );
};

export default HomePage;
