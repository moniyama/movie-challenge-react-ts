import { filmesAPI } from "../__mocks__/mocks";
import { formatMovie } from "./transformers";

describe("formatMovie utils function", () => {
  it("returns object transformed", () => {
    expect(formatMovie(filmesAPI[0]).title).toBe("Badland Hunters");
    expect(formatMovie(filmesAPI[0]).release_year).toBe(2024);
    expect(formatMovie(filmesAPI[0]).vote_average).toBeGreaterThanOrEqual(0);
    expect(formatMovie(filmesAPI[0]).vote_average).toBeLessThanOrEqual(10);
  });
});
