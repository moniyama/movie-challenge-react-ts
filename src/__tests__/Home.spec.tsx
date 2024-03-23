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
import {
  // getMoviesServiceParameter,
  movieGenderResponse,
  transformedFilmes,
} from "../__mocks__/mocks";
import MovieService from "../services/MovieService";

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
const map = new Map();
map.set(28, "Ação");
map.set(35, "Comédia");
map.set(18, "Drama");

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

    jest
      .spyOn(MovieService, "getMovieGenre")
      .mockResolvedValue(movieGenderResponse);

    const { findAllByRole } = render(<Wrapper />);

    // await waitFor(() => {
    //   expect(HTTPService.getMovies).toHaveBeenCalledWith(
    //     getMoviesServiceParameter,
    //     map,
    //   );
    // });

    expect(await findAllByRole("listitem")).toHaveLength(5);
    expect(await findAllByRole("option")).toHaveLength(4);
    expect(await findAllByRole("list")).toHaveLength(1);
    // await waitForElementToBeRemoved(() => findByText(/carregando/));
  });

  test("Renders error message", async () => {
    jest.spyOn(HTTPService, "getMovies").mockRejectedValue({});
    /* jest.spyOn(HTTPService, "getMovies").mockResolvedValue({
      metaData: {
        pagination: {
          currentPage: 3,
          totalPages: 4,
        },
      },
      movies: transformedFilmes,
    }); */

    const { getByText, findByText } = render(<Wrapper />);
    await waitFor(() => {
      const message = getByText(
        "Ops.. Ocorreu uma falha! Tente novamente mais tarde",
      );
      expect(message).toBeInTheDocument();
    });
    expect(
      await findByText("Ops.. Ocorreu uma falha! Tente novamente mais tarde"),
    ).toBeTruthy();
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

  test("click in button reset", async () => {
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

    const { findByText } = render(<Wrapper />);

    const btn = await findByText(/Limpar/);
    user.click(btn).then(async () => {
      console.log("clicou");
      // expect(await findByRole("button", { name: "4" })).toHaveClass(
      //   "current-page",
      // );
    });
  });
});
