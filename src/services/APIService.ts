import { IMovieAPI, IPagination, IPaginationResponse } from "../models/Movie";
import tokenAPI from "../utils/constants";
import { formatMovie } from "../utils/transformers";

const options = {
  method: "GET",
  headers: {
    "User-Agent": "insomnia/8.6.1",
    Authorization: `Bearer ${tokenAPI}`,
  },
};

const HTTPService = {
  getMovies: (
    props: IPagination,
    map: Map<number, string>,
  ): Promise<IPaginationResponse> => {
    const { filters } = props;

    const query = `?page=${filters.page}`;
    const url = `https://api.themoviedb.org/3/discover/movie${query}`;

    return fetch(url, options)
      .then((response) => response.json())
      .then(async (response) => {
        if (
          Object.prototype.hasOwnProperty.call(response, "success") &&
          !response.success
        )
          return Promise.reject(response);

        const movies = await Promise.all(
          response.results.map(async (movie: IMovieAPI) =>
            formatMovie(movie, map),
          ),
        );

        return {
          metaData: {
            pagination: {
              currentPage: response.page,
              totalPages: response.total_pages,
            },
          },
          movies,
        };
      });
  },
};

export default HTTPService;
