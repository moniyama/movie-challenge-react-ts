import { filmesAPI } from "../__mocks__/mocks";
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

describe("HTTP API Service", () => {
  it("getMovies returns an array of movies", () => {
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
      expect(resp.length).toBe(5);
    });
  });

  it("getMovies returns an error", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: false,
          status_code: 34,
          status_message: "The resource you requested could not be found.",
        }),
    }) as jest.Mock;

    const spyLogError = jest.spyOn(console, "error");

    await HTTPService.getMovies();
    expect(spyLogError).toHaveBeenCalled();
  });
});
