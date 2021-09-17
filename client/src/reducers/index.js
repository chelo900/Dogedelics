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
import { average } from "../utils";

const initialState = {
  dogs: [],
  allDogs: [],
  dogDetail: {},
  temperaments: [],
  filters: [{ temperament: "" }, { origin: "" }],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS_ACTION: {
      return { ...state, dogs: action.payload, allDogs: action.payload };
    }
    case GET_TEMPERAMENTS_ACTION: {
      return { ...state, temperaments: action.payload };
    }

    case GET_QUERY_DOGS_ACTION: {
      return { ...state, dogs: action.payload };
    }

    case GET_DOG_BY_ID_ACTION: {
      return { ...state, dogDetail: action.payload };
    }

    //TODO ACTUALIZAR STATE CON DOG NOT FOUND

    case POST_DOG_ACTION: {
      return { ...state };
    }

    case FILTER_BY_TEMP_ACTION: {
      let filteredDogs = [...state.allDogs];
      const newFilters = [...state.filters];
      const otherFilter = state.filters.filter(
        (filter) => !filter.hasOwnProperty(action.payload.field)
      );

      if (Object.values(otherFilter[0])[0] !== "") {
        filteredDogs = [...state.dogs];
      }

      const changedFilter = newFilters.find((filter) =>
        filter.hasOwnProperty(action.payload.field)
      );
      changedFilter[action.payload.field] = action.payload.value;

      filteredDogs = filteredDogs.filter((dog) =>
        dog.temperaments.find((temp) => temp.name === action.payload.value)
      );

      return {
        ...state,
        dogs: filteredDogs,
        filters: newFilters,
      };
    }
    case FILTER_BY_ORIGIN_ACTION: {
      let originFilter = [...state.allDogs];
      const otherFilter = state.filters.filter(
        (filter) => !filter.hasOwnProperty(action.payload.field)
      );

      if (Object.values(otherFilter[0])[0] !== "") {
        originFilter = [...state.dogs];
      }
      const newFilters = [...state.filters];
      const changedFilter = newFilters.find((filter) =>
        filter.hasOwnProperty(action.payload.field)
      );
      changedFilter[action.payload.field] = action.payload.value;

      if (action.payload.value === "existentDogs") {
        originFilter = originFilter.filter((dog) => typeof dog.id === "number");
      } else if (action.payload.value === "myDogs") {
        originFilter = originFilter.filter((dog) => typeof dog.id === "string");
      } else if (action.payload.value === "allDogs") {
        return {
          ...state,
          dogs: originFilter,
          filters: newFilters,
        };
      }

      return { ...state, dogs: originFilter };
    }
    case ORDER_ACTION: {
      const orderedDogs = [...state.dogs];
      if (action.payload === "nameDesc") {
        return {
          ...state,
          dogs: orderedDogs.sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          }),
        };
      } else if (action.payload === "nameAsc") {
        return {
          ...state,
          dogs: orderedDogs.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          }),
        };
      } else if (action.payload === "weightAsc") {
        return {
          ...state,
          dogs: orderedDogs.sort(
            (a, b) => average(a.weight) - average(b.weight)
          ),
        };
      } else if (action.payload === "weightDesc") {
        return {
          ...state,
          dogs: orderedDogs.sort(
            (a, b) => average(b.weight) - average(a.weight)
          ),
        };
      }
      return {
        ...state,
      };
    }
    case CLEAR_FILTERS_ACTION: {
      return {
        ...state,
        filters: [{ temperament: action.payload }, { origin: action.payload }],
      };
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
