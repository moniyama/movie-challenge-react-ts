import { render, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import HTTPService from "../services/APIService";
import {
  map,
  movieGenderResponse,
  transformedFilmes,
} from "../__mocks__/mocks";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
  Link: jest.fn(),
}));

jest.mock("../utils/constants", () => "token API");
jest.spyOn(HTTPService, "getMovies").mockResolvedValue({
  metaData: {
    pagination: {
      currentPage: 3,
      totalPages: 20,
    },
  },
  movies: transformedFilmes,
});
jest.spyOn(HTTPService, "getMovieGenre").mockResolvedValue(movieGenderResponse);

function Wrapper({ query }: { query: string }) {
  const url = `${window.location.pathname + query}`;
  window.history.pushState({}, "", url);

  return (
    <MemoryRouter initialEntries={[query]}>
      <Home />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const getMoviesFilterParams = {
  filters: {
    page: 3, // mock
    genreId: 28,
    sortBy: null,
  },
};

describe("Home Page view", () => {
  test("Renders Home at page 3", async () => {
    const { queryByText, findAllByRole, findByRole } = render(
      <Wrapper query="?page=3&genre=28" />,
    );

    await waitFor(() => {
      expect(queryByText("carregando...")).not.toBeInTheDocument(); // initially present
      expect(HTTPService.getMovies).toHaveBeenCalledWith(
        getMoviesFilterParams,
        map,
      );
    });

    expect(await findAllByRole("listitem")).toHaveLength(5); // 5 movies
    expect(await findAllByRole("option")).toHaveLength(9); // 3 gender + 4 sort + 2 default
    expect(await findByRole("button", { name: "3" })).toHaveClass(
      "current-page",
    );
  });

  test("click in button proximo it changes current page", async () => {
    // quando esse test eh feito depois do test de error, da erro!!

    const user = userEvent.setup();
    const { findByRole, findByText } = render(
      <Wrapper query="?page=3&genre=28&sort_by=null" />,
    );

    expect(await findByRole("button", { name: "3" })).toHaveClass(
      "current-page",
    );

    await user.click(await findByText(/Proximo/));
    expect(await findByRole("button", { name: "4" })).toHaveClass(
      "current-page",
    );
  });

  test("Renders error message", async () => {
    jest.spyOn(HTTPService, "getMovies").mockRejectedValue({});

    const { getByText, findByText } = render(
      <Wrapper query="?page=3&genre=28" />,
    );
    await waitFor(() => {
      const message = getByText("Sorry, an unexpected error has occurred.");
      expect(message).toBeInTheDocument();
    });
    expect(
      await findByText("Sorry, an unexpected error has occurred."),
    ).toBeTruthy();
  });

  test.skip("click in button reset", async () => {
    const user = userEvent.setup();
    const { findByText, findByRole } = render(
      <Wrapper query="?page=5&genre=28" />,
    );

    const btn = await findByText(/Limpar/);

    await user.click(btn);
    expect(await findByRole("button", { name: "5" })).toHaveClass(
      "current-page",
    );
    // expect genre in url to be null
  });

  test.skip("when query genre is not present in url", async () => {
    render(<Wrapper query="?page=3" />);
    console.log(window.location.href);
    // expect genre in url to be completed with genre null
    expect(window.location.search).toBe("?page=3&genre=null");
  });
});
