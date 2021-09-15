import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../actions";
import { temperamentsOptions } from "../utils";

export const CreateDogPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);

  const [newDog, setNewDog] = useState({
    name: "",
    weight: "",
    height: "",
    life_span: "",
    image: "Default Image", //TODO
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (event) => {
    setNewDog({ ...newDog, [event.target.name]: event.target.value });
  };

  const handleSelect = (event) => {
    const { name, value } = event.target;

    const foundTemp = temperaments.find((temp) => temp.name === value);

    if (!newDog.temperaments.includes(foundTemp)) {
      setNewDog({
        ...newDog,
        [name]: [...newDog[name], foundTemp],
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const temperamentsIDs = newDog.temperaments.map((temp) => temp.id);
    dispatch(postDog({ ...newDog, temperaments: temperamentsIDs }));
    alert("Dog created successfully");
    setNewDog({
      name: "",
      weight: "",
      height: "",
      life_span: "",
      image: "Default Image", //TODO
      temperaments: [],
    });
    history.push("/home");
  };

  const onClose = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    const newTemps = newDog.temperaments.filter((temp) => {
      return temp.id !== Number(value);
    });

    setNewDog({
      ...newDog,
      [name]: [...newTemps],
    });
  };

  return (
    <div>
      <Link to="/home">
        <button>HOME</button>{" "}
      </Link>
      <h1>Create your Dog</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(newDog)
          .filter((key) => key !== "temperaments")
          .map((key) => (
            <div key={key}>
              <label>
                {`${key
                  .replace(key[0], key[0].toUpperCase())
                  .replace("_", " ")}: `}{" "}
              </label>
              <input
                type="text"
                value={newDog[key]}
                name={key}
                onChange={handleChange}
              ></input>
            </div>
          ))}
        <div>
          <label htmlFor="temperamentsSelect">Temperaments:</label>
          <select
            name="temperaments"
            id="temperamentsSelect"
            onChange={handleSelect}
          >
            <option value="">Choose Temperaments</option>
            {temperamentsOptions(temperaments)}
          </select>
        </div>
        <div>
          {newDog.temperaments.map((temp) => {
            return (
              <button
                key={temp.id}
                name="temperaments"
                value={temp.id}
                onClick={onClose}
              >
                {temp.name}
              </button>
            );
          })}
        </div>
        <button type="submit">Create Dog</button>
      </form>
    </div>
  );
};
