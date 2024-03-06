import { IMovieAPI, IPagination, IPaginationResponse } from "../models/Movie";
import tokenAPI from "../utils/constants";
import { formatMovie } from "../utils/transformers";

const HTTPService = {
  getMovies: (
    props: IPagination = { filters: { page: 1 } },
  ): Promise<IPaginationResponse> => {
    const { filters } = props;

    const options = {
      method: "GET",
      headers: {
        "User-Agent": "insomnia/8.6.1",
        Authorization: `Bearer ${tokenAPI}`,
      },
    };

    const query = `?page=${filters.page}`;
    const url = `https://api.themoviedb.org/3/discover/movie${query}`;

    return fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        if (
          Object.prototype.hasOwnProperty.call(response, "success") &&
          !response.success
        )
          throw Error(response.status_message);

        return {
          metaData: {
            pagination: {
              currentPage: response.page,
              totalPages: response.total_pages,
            },
          },
          movies: response.results.map((movie: IMovieAPI) =>
            formatMovie(movie),
          ),
        };
      });
  },
};

export default HTTPService;
