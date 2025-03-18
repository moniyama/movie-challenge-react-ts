import { cleanup, fireEvent, render } from "@testing-library/react";
import MovieCard from "../components/MovieCard/MovieCard";
import { transformedFilmes } from "../__mocks__/mocks";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Movie Card Component", () => {
  it("render component", async () => {
    const { findAllByRole, findAllByText, findByAltText } = render(
      <MovieCard movie={transformedFilmes[0]} />,
    );

    expect(await findAllByRole("listitem")).toHaveLength(1);
    expect(await findAllByRole("img")).toHaveLength(1);
    expect(await findByAltText("poster do filme Badland Hunters")).toBeTruthy();
    expect(await findAllByText(/Badland Hunters/)).toBeTruthy();
  });

  it("calls navigate when is clicked", async () => {
    const { findByRole } = render(<MovieCard movie={transformedFilmes[0]} />);

    const img = await findByRole("img");
    fireEvent.click(img);
    expect(mockNavigate).toHaveBeenCalledWith("/movie/933131");
  });

  it("calls navigate when enter is pressed", async () => {
    const { findByRole } = render(<MovieCard movie={transformedFilmes[0]} />);

    const div = await findByRole("button");
    fireEvent.keyDown(div, { key: "A" });
    fireEvent.keyDown(div, { key: "Enter" });
    expect(mockNavigate).toHaveBeenCalledWith("/movie/933131");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
