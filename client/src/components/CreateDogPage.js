import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../actions";
import { temperamentsOptions, setPlaceHolder, validMeasures } from "../utils";
import styles from "./styles/CreateDogPage.module.css";

const validate = (newDog) => {
  const errors = {};
  if (!newDog.name) {
    errors.name = "Name is required";
  } else {
    if (errors.name) {
      delete errors.name;
    }
  }
  if (!newDog.weight || !validMeasures(newDog.weight)) {
    errors.weight = "Weight is required";
  } else {
    if (errors.weight) {
      delete errors.weight;
    }
  }
  if (!newDog.height || !validMeasures(newDog.height)) {
    errors.height = "Height is required";
  } else {
    if (errors.height) {
      delete errors.height;
    }
  }
  return errors;
};

export const CreateDogPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  const [newDog, setNewDog] = useState({
    name: "",
    weight: "",
    height: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewDog({ ...newDog, [name]: value });
    setErrors(validate({ ...newDog, [name]: value }));
    console.log(errors, "change");
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
    console.log(Object.keys(errors).length, "submit");
    if (Object.entries(errors).length === 0) {
      const temperamentsIDs = newDog.temperaments.map((temp) => temp.id);

      dispatch(postDog({ ...newDog, temperaments: temperamentsIDs }));

      alert("Dog created successfully");

      setNewDog({
        name: "",
        weight: "",
        height: "",
        life_span: "",
        image: "",
        temperaments: [],
      });

      history.push("/home");
    } else {
      alert("Please complete the required fields");
    }
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
    <div className={styles.container}>
      {/* <div className={styles.title}> */}
      <h1 className={styles.title}>Create your Dog</h1>
      {/* </div> */}
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          {Object.keys(newDog)
            .filter((key) => key !== "temperaments")
            .map((key) => (
              <div key={key}>
                <label className={styles.label}>
                  {`${key
                    .replace(key[0], key[0].toUpperCase())
                    .replace("_", " ")}: `}{" "}
                </label>
                <input
                  // className={styles.input}
                  type="text"
                  placeholder={setPlaceHolder(key)}
                  value={newDog[key]}
                  name={key}
                  onChange={handleChange}
                ></input>
                {errors[key] && (
                  <div className={"styles.error"}>{errors[key]}</div>
                )}
              </div>
            ))}
          <div>
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
                  className={styles.temp_button}
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
          <button className={styles.button_create} type="submit">
            Create Dog
          </button>
        </form>
      </div>
      <div>
        <Link to="/home">
          <button className={styles.button_home}>HOME</button>{" "}
        </Link>
      </div>
    </div>
  );
};
