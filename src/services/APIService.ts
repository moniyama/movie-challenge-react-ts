import { IMovieAPI, IPagination, IPaginationResponse } from "../models/Movie";
import tokenAPI from "../utils/constants";
import { formatMovie } from "../utils/transformers";

const HTTPService = {
  getMovies: (
    props: IPagination = { filters: { page: 1 } },
    map,
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
          return Promise.reject(response);
        return {
          metaData: {
            pagination: {
              currentPage: response.page,
              totalPages: response.total_pages,
            },
          },
          movies: response.results.map((movie: IMovieAPI) =>
            formatMovie(movie, map),
          ),
        };
      });
  },
  getMovieGenres: () => {
    return Promise.resolve(
      [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 12,
          "name": "Abenteuer"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Komödie"
        },
        {
          "id": 80,
          "name": "Krimi"
        },
        {
          "id": 99,
          "name": "Dokumentarfilm"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Familie"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "Historie"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Musik"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10749,
          "name": "Liebesfilm"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        },
        {
          "id": 10770,
          "name": "TV-Film"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "Kriegsfilm"
        },
        {
          "id": 37,
          "name": "Western"
        }
      ]
    )
  },
};

export default HTTPService;
