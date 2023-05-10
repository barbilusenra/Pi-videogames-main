import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_VIDEOGAMES_BY_ID = "GET_VIDEOGAMES_BY_ID";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const GET_GENRES = "GET_GENRES";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAMES";
export const ORDER_CARDS = "ORDER_CARDS";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const ORDER_BY_RATING = "ORDER_BY_RATING";

export const getVideogames = () => {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: response.data,
    });
  };
};

export const getVideogamesByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      return {
        error: "No games found with that name.",
        originalError: error,
      };
    }
  };
};

export const createVideogame = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      const response = await axios.post(
        `http://localhost:3001/videogames`,
        payload
      );
      return response.data;
    } catch (error) {}
  };
};

export const getDetailVideogames = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );

      return dispatch({
        type: GET_VIDEOGAMES_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      return {
        error: "No details to show",
        originalError: error,
      };
    }
  };
};
export const getGenres = () => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/genres`);
    dispatch({
      type: GET_GENRES,
      payload: response.data,
    });
  };
};

// export function getGenresVideogames () {
//   return async function(dispatch) {
//     try {
//       const response = await axios.get(`http://localhost:3001/genres`)
//       return dispatch ({
//         type: FILTER_BY_GENRES,
//         payload: response.data,
//       })
//     } catch (error) {
//        return error
//     }
//   }

// }

export const filterGenres = (status) => {
  return {
    type: FILTER_BY_GENRES,
    payload: status,
  };
};

//Action para ordenar alfabeticamente
export const orderCards = (value) => {
  return { type: ORDER_CARDS, payload: value };
};

export const getGamesOrderRating = (value) => {
  return {
    type: ORDER_BY_RATING,
    payload: value,
  };
};

export const filterOrigin = (status) => {
  return {
    type: FILTER_ORIGIN,
    payload: status,
  };
};
