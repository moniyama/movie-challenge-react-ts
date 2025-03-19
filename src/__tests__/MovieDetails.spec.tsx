import { cleanup, fireEvent, render } from "@testing-library/react";
import MovieDetails from "../components/pages/MovieDetails";
import {
  map,
  movieGenderResponse,
  transformedFilmes,
} from "../__mocks__/mocks";
import HTTPService from "../services/APIService";
import "@testing-library/jest-dom";

jest.mock("../utils/constants", () => "token API");

const mockNavigate = jest.fn();
const mockParams = { movieId: 933131 };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => mockParams,
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
  Link: jest.fn(),
}));

jest
  .spyOn(HTTPService, "getMovieGenre")
  .mockImplementation()
  .mockResolvedValue(movieGenderResponse);

jest
  .spyOn(HTTPService, "getMovieDetail")
  .mockImplementation()
  .mockResolvedValue(transformedFilmes[0]);

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Movie Details Component", () => {
  it("render component", async () => {
    const { findAllByRole, findAllByText, findByAltText } = render(
      <MovieDetails />,
    );
    expect(await findAllByRole("img")).toHaveLength(1);
    expect(await findByAltText("poster do filme Badland Hunters")).toBeTruthy();
    expect(await findAllByText(/Badland Hunters/)).toBeTruthy();
  });

  it("calls navigate when voltar button is clicked", async () => {
    const { findByRole } = render(<MovieDetails />);

    const button = await findByRole("button");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("Renders error message", async () => {
    jest.spyOn(HTTPService, "getMovieDetail").mockRejectedValue({});
    const { findByText, getByText } = render(<MovieDetails />);

    await findByText("Sorry, an unexpected error has occurred.");
    expect(
      getByText("Sorry, an unexpected error has occurred."),
    ).toBeInTheDocument();
    expect(HTTPService.getMovieDetail).toHaveBeenCalledTimes(1);
    expect(HTTPService.getMovieDetail).toHaveBeenCalledWith(
      mockParams.movieId,
      map,
    );
  });
});
