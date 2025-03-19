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

const getMoviesFilterParamsNull = {
  filters: {
    page: 3,
    genreId: null,
    sortBy: null,
  },
};
const getMoviesFilterParams = {
  filters: {
    page: 3,
    genreId: 28,
    sortBy: null,
  },
};

const getMoviesFilterParamsWithSortByPopularity = {
  filters: {
    page: 3,
    genreId: 28,
    sortBy: "popularity.desc",
  },
};

const getMoviesFilterParamsWithSortByTitle = {
  filters: {
    page: 3,
    genreId: 28,
    sortBy: "title.desc",
  },
};

describe("Home Page interactions", () => {
  test("click in button proximo it changes current page", async () => {
    const user = userEvent.setup();

    const { findByRole, getByText, getByRole } = render(
      <Wrapper query="?page=3&genre=28&sort_by=null" />,
    );

    expect(await findByRole("button", { name: "3" })).toHaveClass(
      "current-page",
    );

    await waitFor(() => {
      user.click(getByText(/Proximo/));
      expect(getByRole("button", { name: "4" })).toHaveClass("current-page");
    });
  });

  test.skip("select a sort select option", async () => {
    const user = userEvent.setup();
    const { findByRole } = render(
      <Wrapper query="?page=3&genre=28&sort_by=null" />,
    );
    const option = findByRole("option", { name: "Most popular" });
    user.selectOptions(await option, "popularity.desc");
    // screen.debug();

    // const btn = await findByText(/Most popular/);
    await waitFor(() => {
      // expect(HTTPService.getMovies).toHaveBeenNthCalledWith(
      //   3, // nth time
      //   getMoviesFilterParamsWithSortByPopularity,
      //   map,
      // );
    });

    // expect genre in url to be null
  });
});

describe("Home Page render views", () => {
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

  test("Renders Home at page 3, an call api with genre null", async () => {
    const { queryByText } = render(<Wrapper query="?page=3&genre=null" />);

    await waitFor(() => {
      expect(queryByText("carregando...")).not.toBeInTheDocument(); // initially present
      expect(HTTPService.getMovies).toHaveBeenCalledWith(
        getMoviesFilterParamsNull,
        map,
      );
    });
  });

  test("Renders Home sorted by popularity.desc", async () => {
    const { getByText, queryByText, findByText, getAllByRole } = render(
      <Wrapper query="?page=3&genre=28&sort_by=popularity.desc" />,
    );

    expect(queryByText("carregando...")).toBeInTheDocument();
    expect(await findByText("carregando...")).not.toBeInTheDocument(); // get inside waitfor

    await waitFor(() => {
      expect(HTTPService.getMovies).toHaveBeenCalledWith(
        getMoviesFilterParamsWithSortByPopularity,
        map,
      );
      const all = getAllByRole("listitem");
      const firstMovie = getByText("Wonka");
      const lastMovie = getByText("Badland Hunters");
      expect(firstMovie.compareDocumentPosition(lastMovie)).toBe(4);
      expect(all[0]).toHaveTextContent("Wonka");
      expect(all[1]).toHaveTextContent("Sixty Minutes");
      expect(all[2]).toHaveTextContent("Skal");
      expect(all[3]).toHaveTextContent("Family Plan");
      expect(all[4]).toHaveTextContent("Badland Hunters");
    });
  });

  test("Renders Home sorted by title.desc", async () => {
    const { queryByText, getAllByRole } = render(
      <Wrapper query="?page=3&genre=28&sort_by=title.desc" />,
    );

    expect(queryByText("carregando...")).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByText("carregando...")).not.toBeInTheDocument(); // initially present
      expect(HTTPService.getMovies).toHaveBeenCalledWith(
        getMoviesFilterParamsWithSortByTitle,
        map,
      );

      const all = getAllByRole("listitem");

      expect(all[0]).toHaveTextContent("Wonka");
      expect(all[1]).toHaveTextContent("Family Plan");
      expect(all[2]).toHaveTextContent("Skal");
      expect(all[3]).toHaveTextContent("Sixty Minutes");
      expect(all[4]).toHaveTextContent("Badland Hunters");
    });
  });

  test("Renders error message", async () => {
    jest.spyOn(HTTPService, "getMovies").mockRejectedValue({}); // all tests after will became rejected

    const { getByText } = render(<Wrapper query="?page=3&genre=28" />);
    await waitFor(() => {
      const message = getByText("Sorry, an unexpected error has occurred.");
      expect(message).toBeInTheDocument();
    });
  });
});
