import { filmesAPI, getMoviesServiceParameter } from "../__mocks__/mocks";
import HTTPService from "./APIService";

jest.mock("../utils/constants", () => "token API");

// NOT WORKING
// const fetchMock = jest.spyOn(global, "fetch")
//   .mockImplementation(() =>
//     Promise.resolve(new Response(`{ json: () => Promise.resolve([]) }`)),
//   );

beforeEach(() => {
  global.fetch = jest.fn().mockClear();
});

const options = {
  headers: {
    Authorization: "Bearer token API",
    "User-Agent": "insomnia/8.6.1",
  },
  method: "GET",
};

const map = new Map();
map.set(28, "acao");
map.set(35, "comedia");
map.set(18, "drama");

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
        "https://api.themoviedb.org/3/discover/movie?page=3?sort_by=sort&with_genres=28",
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
        "https://api.themoviedb.org/3/discover/movie?page=3?sort_by=sort&with_genres=28",
        options,
      );
    });
  });
});
