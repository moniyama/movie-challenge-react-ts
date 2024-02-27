import { filmesAPI } from "../__mocks__/mocks";
import HTTPService from "./APIService";

jest.mock("../utils/constants", () => "token API");

// NOT WORKING
// const fetchMock = jest.spyOn(global, "fetch")
//   .mockImplementation(() =>
//     Promise.resolve(new Response(`{ json: () => Promise.resolve([]) }`)),
//   );

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        page: 1,
        results: filmesAPI,
        total_pages: 100,
        total_results: 500,
      }),
  }),
) as jest.Mock;

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         success: false,
//         status_code: 34,
//         status_message: "The resource you requested could not be found.",
//       }),
//   }),
// ) as jest.Mock;

describe("HTTP API Service", () => {
  it("getMovies returns an array of movies", () => {
    HTTPService.getMovies().then((resp) => {
      expect(resp.length).toBe(5);
    });
  });

  it("getMovies returns an error", async () => {
    const spyLogError = jest.spyOn(console, "error");

    await HTTPService.getMovies();
    expect(spyLogError).toHaveBeenCalled();
  });
});
