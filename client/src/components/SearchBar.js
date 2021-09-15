import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQueryDogs } from "../actions";

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

  return (
    <div>
      <input
        id="searchInput"
        type="text"
        placeholder="Search Dog Breed"
        onChange={handleChange}
        value={inputValue}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};
