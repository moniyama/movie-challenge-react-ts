import { render } from "@testing-library/react";
import Home from "../components/pages/Home";
import HTTPService from "../services/APIService";
import { filmesAPI } from "../__mocks__/mocks";

jest.mock("../utils/constants", () => "token API");

jest.spyOn(HTTPService, "getMovies");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Home Page view", () => {
  test("Renders the main page", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          page: 1,
          results: filmesAPI,
          total_pages: 100,
          total_results: 500,
        }),
    }) as jest.Mock;

    const { findAllByRole } = render(<Home />);

    expect(await findAllByRole("list")).toHaveLength(1);
    expect(await findAllByRole("listitem")).toHaveLength(5);
    expect(HTTPService.getMovies).toHaveBeenCalledTimes(1);
  });
  test("Renders error", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: false,
          status_code: 34,
          status_message: "The resource you requested could not be found.",
        }),
    }) as jest.Mock;

    const { findByText } = render(<Home />);

    expect(await findByText(/Falha na requisição../)).toBeTruthy();
    expect(HTTPService.getMovies).toHaveBeenCalledTimes(1);
  });
});
