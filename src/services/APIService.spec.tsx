import {
  filmesAPI,
  getMoviesServiceParameter,
  map,
  movieDetailsAPI,
} from "../__mocks__/mocks";
import HTTPService from "./APIService";

jest.mock("../utils/constants", () => "token API");

beforeEach(() => {
  global.fetch = jest.fn().mockClear();
});

const options = {
  method: "GET",
  headers: {
    "User-Agent": "insomnia/8.6.1",
    Authorization: "Bearer token API",
  },
};

describe("HTTP API Service - getMovies", () => {
  it("getMovies returns an object with array of movies", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          page: 1,
          results: filmesAPI,
          total_pages: 100,
          total_results: 500,
        }),
    }) as jest.Mock;

    HTTPService.getMovies(getMoviesServiceParameter, map).then((resp) => {
      expect(resp.movies).not.toBeNull();
      expect(resp.movies.length).toBe(5);
      expect(resp.movies[0].id).toBe(933131);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&page=3&sort_by=null&with_genres=28",
        options,
      );
    });
  });

  it("getMovies returns an object with array of movies without filter", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          page: 1,
          results: filmesAPI,
          total_pages: 100,
          total_results: 500,
        }),
    }) as jest.Mock;

    HTTPService.getMovies(
      {
        filters: {
          page: 3,
          genreId: null,
          sortBy: null,
        },
      },
      map,
    ).then((resp) => {
      expect(resp.movies).not.toBeNull();
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&page=3&sort_by=null",
        options,
      );
    });
  });

  it("getMovies error case", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    }) as jest.Mock;

    HTTPService.getMovies(getMoviesServiceParameter, map).catch((resp) => {
      expect(resp).toEqual({
        success: false,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&page=3&sort_by=null&with_genres=28",
        options,
      );
    });
  });
});

describe("HTTP API Service - getMovieGenre", () => {
  it("getMovieGenre returns an array of objects IMovieGenre", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          genres: [
            {
              id: 28,
              name: "Action",
            },
            {
              id: 12,
              name: "Adventure",
            },
            {
              id: 16,
              name: "Animation",
            },
          ],
        }),
    }) as jest.Mock;

    HTTPService.getMovieGenre().then((resp) => {
      expect(resp.length).toBe(3);
      expect(resp[0].id).toBe(28);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/genre/movie/list",
        options,
      );
    });
  });

  it("getMovieGenre returns an object with page 1 when invoked without parameters", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    }) as jest.Mock;

    HTTPService.getMovieGenre().catch((resp) => {
      expect(resp).toEqual({
        success: false,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/genre/movie/list",
        options,
      );
    });
  });
});

describe("HTTP API Service - getMovieDetails", () => {
  it("getMovieDetails returns an object IMovieGenre", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(movieDetailsAPI),
    }) as jest.Mock;

    HTTPService.getMovieDetail(933131, map).then((resp) => {
      expect(resp.id).toBe(933131);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/933131",
        options,
      );
    });
  });

  it("getMovieDetails returns an object with page 1 when invoked without parameters", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: false,
        }),
    }) as jest.Mock;

    HTTPService.getMovieDetail(933131, map).catch((resp) => {
      expect(resp).toEqual({
        success: false,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/933131",
        options,
      );
    });
  });
});
