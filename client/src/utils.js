import axios from "axios";

import { URL_API } from "./constants";

export const fetchDogs = async (url = "") => {
  const response = await axios.get(`${URL_API}/dogs${url}`);
  return response.data;
};

export const fetchTemperaments = async () => {
  const response = await axios.get(`${URL_API}/temperaments`);
  return response.data;
};

export const createDog = async (payload) => {
  const response = await axios.post(`${URL_API}/dog`, payload);
  console.log(response.data);
  return response.data;
};

export const temperamentsOptions = (temperaments) =>
  temperaments.map((temp) => (
    <option key={temp.id} value={temp.name}>
      {temp.name}
    </option>
  ));

export const setPlaceHolder = (key) => {
  if (key === "weight") {
    return "E.g. 2-5";
  }
  if (key === "height") {
    return "E.g. 20-45";
  }
  if (key === "life_span") {
    return "E.g. 5-15";
  }
  if (key === "image") {
    return "Enter valid URL";
  }
};

export const validMeasures = (value) => {
  const validFormat = /\d*[-]\d*/;
  if (validFormat.test(value)) return true;
  return false;
};

export const average = (arr) => {
  const sum = arr.reduce((acc, element) => acc + element, 0);
  const average = sum / arr.length;
  return average;
};
