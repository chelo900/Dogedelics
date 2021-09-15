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

export const average = (arr) => {
  const sum = arr.reduce((acc, element) => acc + element, 0);
  const average = sum / arr.length;
  return average;
};
