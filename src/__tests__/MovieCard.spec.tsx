import { render } from "@testing-library/react";
import MovieCard from "../components/MovieCard/MovieCard";
import { formatMovie } from "../utils/transformers";
import { filmesAPI } from "../__mocks__/mocks";

describe("Movie Card Component", () => {
  it("render component", async () => {
    const { findAllByRole, findAllByText, findByAltText } = render(
      <MovieCard movie={formatMovie(filmesAPI[0])} />,
    );

    expect(await findAllByRole("listitem")).toHaveLength(1);
    expect(await findAllByRole("img")).toHaveLength(1);
    expect(await findByAltText("poster do filme Badland Hunters")).toBeTruthy();
    expect(await findAllByText(/Badland Hunters/)).toBeTruthy();
  });
});
