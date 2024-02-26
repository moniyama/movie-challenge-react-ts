import { IMovie, IMovieAPI } from "../models/Movie";
import tokenAPI from "../utils/constants";
import { formatMovie } from "../utils/transformers";

const HTTPService = {
  getMovies: (): Promise<IMovie[]> => {
    const options = {
      method: "GET",
      headers: {
        "User-Agent": "insomnia/8.6.1",
        Authorization: `Bearer ${tokenAPI}`,
      },
    };

    return fetch("https://api.themoviedb.org/3/discover/movie", options)
      .then((response) => response.json())
      .then((response) => {
        return response.results.map((movie: IMovieAPI) => formatMovie(movie));
      })
      .catch((err) => console.error(err));
  },
};

export default HTTPService;
