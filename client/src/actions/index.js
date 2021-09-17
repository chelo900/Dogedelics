import { fetchDogs, fetchTemperaments, createDog } from "../utils";
import {
  GET_DOGS_ACTION,
  GET_QUERY_DOGS_ACTION,
  GET_DOG_BY_ID_ACTION,
  GET_TEMPERAMENTS_ACTION,
  POST_DOG_ACTION,
  FILTER_BY_TEMP_ACTION,
  FILTER_BY_ORIGIN_ACTION,
  CLEAR_FILTERS_ACTION,
  ORDER_ACTION,
} from "../constants";

export const getDogs = () => async (dispatch) => {
  //TODO ERROR HANDLER
  const dogs = await fetchDogs();
  dispatch({
    type: GET_DOGS_ACTION,
    payload: dogs,
  });
};

export const getQueryDogs = (name) => async (dispatch) => {
  //TODO ERROR HANDLER
  try {
    const dogs = await fetchDogs(`?name=${name}`);

    dispatch({ type: GET_QUERY_DOGS_ACTION, payload: dogs });
  } catch (error) {
    console.error(error); //TODO DISPATCH ERROR AL REDUCER
  }
};

export const getIdDog = (id) => async (dispatch) => {
  try {
    const dog = await fetchDogs(`/${id}`);
    dispatch({ type: GET_DOG_BY_ID_ACTION, payload: dog });
  } catch (error) {
    console.error(error);
  }
};

export const getTemperaments = () => async (dispatch) => {
  //TODO ERROR HANDLER
  try {
    const temperaments = await fetchTemperaments();
    dispatch({ type: GET_TEMPERAMENTS_ACTION, payload: temperaments });
  } catch (error) {
    dispatch({ type: "FETCH_ERROR", payload: error });
  }
};

export const postDog = (payload) => async (dispatch) => {
  //TODO ERROR HANDLER
  try {
    const dog = createDog(payload);
    dispatch({ type: POST_DOG_ACTION, payload: dog });
  } catch (error) {
    console.error(error);
  }
};

export const filterDogsByTemp = (field, value) => {
  return {
    type: FILTER_BY_TEMP_ACTION,
    payload: { field, value },
  };
};

export const filterDogsByOrigin = (field, value) => {
  return { type: FILTER_BY_ORIGIN_ACTION, payload: { field, value } };
};

export const clearFilters = () => {
  return { type: CLEAR_FILTERS_ACTION, payload: "" };
};

export const orderDogs = (value) => {
  return {
    type: ORDER_ACTION,
    payload: value,
  };
};
