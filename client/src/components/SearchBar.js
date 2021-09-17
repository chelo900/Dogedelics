import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQueryDogs } from "../actions";
import styles from "./styles/SearchBar.module.css";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setInputValue("");
    dispatch(getQueryDogs(inputValue));
  };
  //TODO NOT FOUND ACTION
  return (
    <div className={styles.container}>
      <input
        className={styles.search_input}
        id="searchInput"
        type="text"
        placeholder="Search Dog"
        onChange={handleChange}
        value={inputValue}
      />
      <button className={styles.search_button} onClick={handleClick}>
        Search
      </button>
    </div>
  );
};
