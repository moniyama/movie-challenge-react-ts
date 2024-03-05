import { filmesAPI } from "../__mocks__/mocks";
import { formatMovie } from "./transformers";

describe("formatMovie utils function", () => {
  it("returns object transformed", () => {
    expect(formatMovie(filmesAPI[0]).title).toBe("Badland Hunters");
    expect(formatMovie(filmesAPI[0]).releaseYear).toBe(2024);
    expect(formatMovie(filmesAPI[0]).voteAverage).toBeGreaterThanOrEqual(0);
    expect(formatMovie(filmesAPI[0]).voteAverage).toBeLessThanOrEqual(10);
  });
});
