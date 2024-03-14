import {
  render,
  waitFor,
  // waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import HTTPService from "../services/APIService";
import { transformedFilmes } from "../__mocks__/mocks";

jest.mock("../utils/constants", () => "token API");
jest.spyOn(URLSearchParams.prototype, "get").mockReturnValue("3");

afterEach(() => {
  jest.clearAllMocks();
});

function Wrapper() {
  return (
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe("Home Page view", () => {
  test("Renders Home at page 3", async () => {
    jest.spyOn(HTTPService, "getMovies").mockResolvedValue({
      metaData: {
        pagination: {
          currentPage: 1,
          totalPages: 10,
        },
      },
      movies: transformedFilmes,
    });

    const { findAllByRole, findByText } = render(<Wrapper />);

    await waitFor(() => {
      expect(HTTPService.getMovies).toHaveBeenCalledWith({
        filters: { page: 3 },
      });
    });

    expect(await findAllByRole("listitem")).toHaveLength(5);
    expect(await findAllByRole("list")).toHaveLength(1);
    // await waitForElementToBeRemoved(() => findByText(/carregando/));
  });

  test("Renders error message", async () => {
    jest.spyOn(HTTPService, "getMovies").mockRejectedValue({});
    const { findByText } = render(<Wrapper />);

    expect(await findByText(/falha/)).toBeTruthy();
  });
});
