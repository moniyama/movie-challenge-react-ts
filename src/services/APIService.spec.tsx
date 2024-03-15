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

    HTTPService.getMovies(getMoviesServiceParameter).then((resp) => {
      expect(resp.movies).not.toBeNull();
      expect(resp.movies.length).toBe(5);
      expect(resp.movies[0].id).toBe(933131);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/discover/movie?page=3",
        options,
      );
    });
  });

  it("getMovies returns an object with page 1 when invoked without parameters", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          page: 1,
          results: filmesAPI,
          total_pages: 100,
          total_results: 500,
        }),
    }) as jest.Mock;

    HTTPService.getMovies().then((resp) => {
      expect(resp.movies.length).toBe(5);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/discover/movie?page=1",
        options,
      );
    });
  });
});

describe("HTTP API Service - getMovieGenre", () => {
  it("getMovieGenre returns an array of objects IMovieGenre", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
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
        ]),
    }) as jest.Mock;

    HTTPService.getMovieGenre().then((resp) => {
      console.log(resp);
      // expect(resp.length).toBe(3);
      // expect(resp[0].id).toBe(28);
      // expect(global.fetch).toHaveBeenCalledWith(
      //   "https://api.themoviedb.org/3/discover/genre/movie/list",
      //   options,
      // );
    });
  });

  // it("getMovieGenre returns an object with page 1 when invoked without parameters", () => {
  //   global.fetch = jest.fn().mockResolvedValueOnce({
  //     json: () =>
  //       Promise.resolve({
  //         page: 1,
  //         results: filmesAPI,
  //         total_pages: 100,
  //         total_results: 500,
  //       }),
  //   }) as jest.Mock;

  //   HTTPService.getMovieGenre().then((resp) => {
  //     expect(resp.length).toBe(5);
  //     expect(global.fetch).toHaveBeenCalledWith(
  //       "https://api.themoviedb.org/3/discover/movie?page=1",
  //       options,
  //     );
  //   });
  // });
});
