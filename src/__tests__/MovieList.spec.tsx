import { render } from "@testing-library//react";
import MovieList from "../components/MovieList/MovieList";
import { transformedFilmes } from "../__mocks__/mocks";
import MovieCard from "../components/MovieCard/MovieCard";

jest.mock("../components/MovieCard/MovieCard");

describe("MovieList component", () => {
  const { findAllByRole } = render(<MovieList movies={transformedFilmes} />);

  it("render ul & call Movie Card", async () => {
    const ul = await findAllByRole("list");
    expect(ul).toBeTruthy();
    expect(ul).toHaveLength(1);
    expect(MovieCard).toHaveBeenCalledTimes(5);
  });

  it("call Movie Card components 5 times", async () => {
    expect(MovieCard).toHaveBeenCalledTimes(5);
  });
});
