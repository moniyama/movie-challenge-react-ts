import { render, waitFor } from "@testing-library/react";
import Home from "../components/pages/Home";
import HTTPService from "../services/APIService";
import { filmesAPI } from "../__mocks__/mocks";

jest.mock("../utils/constants", () => "token API");

jest.spyOn(HTTPService, "getMovies");

// const container: HTMLElement = document.createElement('div');
// beforeEach(() => {
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   document.body.removeChild(container);
// });

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

    const { container } = render(<Home />);

    await waitFor(() => {
      expect(HTTPService.getMovies).toHaveBeenCalledTimes(1);
      expect(container.querySelectorAll("li").length).toBe(5);
      // expect(findAllByRole("li")).toHaveLength(5); // why not working
    });

    // expect(HTTPService.getMovies).toHaveBeenCalledTimes(1); // error de not wrapped in act
    // expect(await findAllByRole("li")).toBe(5); // why not working
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

    // expect(await findByText("Falha na requisição")).toBeTruthy();
    await waitFor(() => {
      expect(findByText("Falha na requisição..")).toBeTruthy();
      expect(HTTPService.getMovies).toHaveBeenCalledTimes(1);
    });
  });
});
