import {
  GET_VIDEOGAMES,
  GET_BY_NAME,
  GET_VIDEOGAMES_BY_ID,
  GET_GENRES,
  FILTER_BY_GENRES,
//  CREATE_VIDEOGAME,
  FILTER_ORIGIN,
  ORDER_CARDS,
  ORDER_BY_RATING,
} from "./actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  tempGames: [],
  videogamesById: {},
  genres: [],

  // searchGames: [],
  // gameselect: "",
  // platforms: "",

  // pagination: {
  //     actual:1,
  //     total:9,
  //     cardinit:0,
  //     cardend: 12,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: [...action.payload],
        allVideogames: [...action.payload],
        tempGames: [...action.payload],
      };

    case GET_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_VIDEOGAMES_BY_ID:
      return {
        ...state,
        videogamesById: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: [...action.payload],
      };

    case FILTER_BY_GENRES:
      if (!action.payload) {
        return { ...state };
      }
      const filtrosGeneros = state.videogames.filter((videogame) =>
        videogame.genres.includes(action.payload)
      );
      return {
        ...state,
        videogames: [...filtrosGeneros],
      };

    case ORDER_BY_RATING:
      if (action.payload === "Ascendente") {
        return {
          ...state,
          videogames: [...state.videogames.sort((a, b) => a.rating - b.rating)],
        };
      } else {
        return {
          ...state,
          videogames: [...state.videogames.sort((a, b) => b.rating - a.rating)],
        };
      }

    case ORDER_CARDS:
      if (action.payload === "Ascendente") {
        return {
          ...state,
          videogames: [
            ...state.videogames.sort((a, b) => a.name.localeCompare(b.name)),
          ],
        };
      } else {
        return {
          ...state,
          videogames: [
            ...state.videogames.sort((a, b) => b.name.localeCompare(a.name)),
          ],
        };
      }

    case FILTER_ORIGIN:
      let filterXorigin;

      if (action.payload === "Select Option") {
        filterXorigin = state.allVideogames;
      }

      if (action.payload === "Local") {
        filterXorigin = state.allVideogames.filter(
          (videogame) => typeof videogame.id === "string"
        );
      }
      if (action.payload === "Api") {
        filterXorigin = state.allVideogames.filter(
          (videogame) => typeof videogame.id === "number"
        );
      }

      return {
        ...state,
        videogames: filterXorigin,
        tempGames: [...filterXorigin],
      };

    
    default:
      return state;
  }
};

export default rootReducer;
