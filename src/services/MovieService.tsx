import {
  IMovieGenre,
} from "../models/Movie";
import tokenAPI from "../utils/constants";

const options = {
  method: "GET",
  headers: {
    "User-Agent": "insomnia/8.6.1",
    Authorization: `Bearer ${tokenAPI}`,
  },
};

const MovieService = {
  getMovieGenre: (): Promise<IMovieGenre[]> => {
    const url = `https://api.themoviedb.org/3/genre/movie/list`;
    return fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        if (
          Object.prototype.hasOwnProperty.call(response, "success") &&
          !response.success
        )
          return Promise.reject(response);
        return response.genres
      });
  },
};

export default MovieService;
