import {
  render,
  waitFor,
  // waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
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
          currentPage: 3,
          totalPages: 3,
        },
      },
      movies: transformedFilmes,
    });

    const { findAllByRole } = render(<Wrapper />);

    await waitFor(() => {
      expect(HTTPService.getMovies).toHaveBeenCalledWith({
        filters: { page: 3 },
      });
    });

    expect(await findAllByRole("listitem")).toHaveLength(5);
    expect(await findAllByRole("list")).toHaveLength(1);
    // await waitForElementToBeRemoved(() => findByText(/carregando/));
  });

  test.skip("Renders error message", async () => {
    jest.spyOn(HTTPService, "getMovies").mockRejectedValue({});
    const { findByText } = render(<Wrapper />);

    expect(await findByText(/falha/)).toBeTruthy();
  });

  test("click in button proximo it changes current page", async () => {
    const user = userEvent.setup();
    jest.spyOn(HTTPService, "getMovies").mockResolvedValue({
      metaData: {
        pagination: {
          currentPage: 3,
          totalPages: 4,
        },
      },
      movies: transformedFilmes,
    });
    const { findByText, findByRole } = render(<Wrapper />);

    expect(await findByRole("button", { name: "3" })).toHaveClass(
      "current-page",
    );

    user.click(await findByText(/Proximo/)).then(async () => {
      expect(await findByRole("button", { name: "4" })).toHaveClass(
        "current-page",
      );
    });
  });
});
