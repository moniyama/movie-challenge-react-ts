import { filmesAPI } from "../__mocks__/mocks";
import HTTPService from "./APIService";

jest.mock("../utils/constants", () => "token API");

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

describe.only("HTTP API Service", () => {
  it("getMovies returns an array of movies", () => {
    HTTPService.getMovies().then((resp) => {
      expect(resp.length).toBe(5);
    });
  });
});
