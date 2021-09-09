import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import DogCard from "../components/DogCard";

export const HomePage = () => {
  const dispatch = useDispatch();

  const allDogs = useSelector(
    (state) =>
      // console.log(state);
      state.dogs
  );

  useEffect(() => {
    dispatch(getDogs()); // Same as MapDispatchToProps
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/createdog">Create Breed</Link>
      <h1>DOGEDELICS</h1>
      <button onClick={(e) => handleClick(e)}>Show dogs</button>
      <div>
        <select>
          <option value="temp">Temperament</option>
          <option value="api">Breed Api</option>
          <option value="created">Breed Created</option>
        </select>
        <select>
          <option value="weightAsc">WeightAsc</option>
          <option value="weightDesc">WeightDesc</option>
        </select>
        <select>
          <option value="nameAsc">By name Asc</option>
          <option value="nameDessc">By name Desc</option>
        </select>
        {allDogs &&
          allDogs.map((dog) => (
            <DogCard
              key={dog.id}
              name={dog.name}
              img={dog.img}
              weight={dog.weight}
              temperaments={dog.temperaments}
            />
          ))}
      </div>
    </div>
  );
};
