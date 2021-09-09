import axios from "axios";
//Get dogs
export const GET_DOGS = "GET_DOGS";
//Get query dogs
export const GET_QUERY_DOGS = "GET_QUERY_DOGS";
//Get dog by ID // Detail dog
//Filter Dogs by created or exist
//Filter Dogs by temperament
//Sort Dogs by name
//Sort Dogs by weight

const URL_API = "http://localhost:3001";

export const getDogs = () => async (dispatch) => {
  const response = await axios.get(`${URL_API}/dogs`);
  const dogs = response.data;
  // console.log(dogs);
  return dispatch({ type: GET_DOGS, payload: dogs });
};

export const getQueryDogs = () => async (dispatch) => {
  const data = await axios.get(`${URL_API}/dogs:id`);
  const dogs = data.data;
  // console.log(dogs);
  return dispatch({ type: GET_DOGS, payload: dogs });
};
