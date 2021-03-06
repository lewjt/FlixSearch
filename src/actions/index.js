export const GET_MOVIE = "GET_MOVIE";
export const RECEIVED_MOVIE = "RECEIVED_MOVIE";
export const GET_SEARCH = "GET_SEARCH";
export const RECEIVED_SEARCH = "RECEIVED_SEARCH";
export const UPDATE_MOVIE_INDEX = "UPDATE_MOVIE_INDEX";

const ROOT_URL = "https://api.themoviedb.org/3/";
const API_KEY = "?api_key=84106750d8a60bce5c3b42e20e3b6f46";

export function getSearch(certificate, genres) {

  var URL = ROOT_URL + "discover/movie" + API_KEY + "&language=en-US&certification_country=GB";
  URL = URL + "&certification=" + certificate + "&include_adult=false&include_video=false&page=1";
  URL = URL + "&with_genres=" + genres;

  return dispatch => {
    dispatch({type: GET_SEARCH});

    return fetch(URL).then((response) => response.json()).then((payload) => {
      var newPayload = {totalPages: null, currentPage: null, results: []}
      newPayload.totalPages = payload.total_pages;
      newPayload.currentPage = payload.page;

      payload.results.map((item) => {
        newPayload.results.push(item.id);
      })

      dispatch({
        type: RECEIVED_SEARCH,
        payload: newPayload
      });
    });
  }
}

export function updateMovieIndex(index) {
  return {
    type: UPDATE_MOVIE_INDEX,
    payload: index
  }
}

export function getMovie(movieID) {
  return dispatch => {
    dispatch({type: GET_MOVIE});

    return fetch(ROOT_URL + "movie/" + movieID + API_KEY).then((response) => response.json().then((payload) => {
      dispatch({
        type: RECEIVED_MOVIE,
        payload: payload
      });
    }))
  }
}
