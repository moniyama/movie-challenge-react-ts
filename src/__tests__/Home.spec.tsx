import { render, waitFor, screen, cleanup } from "@testing-library/react";
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

jest.mock("../utils/constants", () => "token API");
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useSearchParams: () => mockNavigate,
// }));

// jest.mock("react-router-dom", "get").mockReturnValue("3");
jest.spyOn(HTTPService, "getMovies").mockResolvedValue({
  metaData: {
    pagination: {
      currentPage: 123,
      totalPages: 200,
    },
  },
  movies: transformedFilmes,
});
jest.spyOn(HTTPService, "getMovieGenre").mockResolvedValue(movieGenderResponse);

function Wrapper() {
  return (
    <MemoryRouter initialEntries={["?page=123&genre=28"]}>
      <Home />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

beforeEach(() => {
  render(<Wrapper />);
});

const map = new Map();
map.set(28, "Ação");
map.set(35, "Comédia");
map.set(18, "Drama");

const getMoviesFilterParams = {
  filters: {
    page: 123, // mock
    genreId: 28,
    sortBy: "sortBy",
  },
};

describe("Home Page view", () => {
  test.skip("Renders Home at page 3", async () => {
    const { findAllByRole } = screen;

    await waitFor(() => {
      expect(HTTPService.getMovies).toHaveBeenCalledWith(
        getMoviesFilterParams,
        map,
      );
    });
    expect(await findAllByRole("listitem")).toHaveLength(5);
    expect(await findAllByRole("option")).toHaveLength(4);
    screen.debug();
    // expect(await findAllByRole("list")).toHaveLength(1);
    // expect(await findAllByRole("button")).toHaveLength(10);
    // await waitForElementToBeRemoved(() => findByText("carregando.."));
  });

  test("Renders error message", async () => {
    jest.spyOn(HTTPService, "getMovies").mockRejectedValue({});
    /* jest.spyOn(HTTPService, "getMovies").mockResolvedValue(getMoviesFilterParams); */

    const { getByText, findByText } = screen;
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

  test.skip("click in button proximo it changes current page", async () => {
    const user = userEvent.setup();

    const { findByText, findByRole } = screen;

    expect(await findByRole("button", { name: "123" })).toHaveClass(
      "current-page",
    );

    user.click(await findByText(/Proximo/)).then(async () => {
      expect(await findByRole("button", { name: "124" })).toHaveClass(
        "current-page",
      );
    });
  });

  test.skip("click in button reset", async () => {
    const user = userEvent.setup();
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
