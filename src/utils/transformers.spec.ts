import { filmesAPI } from "../__mocks__/mocks";
import { formatGenresToMap, formatMovie } from "./transformers";

describe.skip("formatMovie utils function", () => {
  it("returns object transformed", () => {
    const movie = formatMovie(filmesAPI[0], new Map([[28, "Ação"]]));
    expect(movie.title).toBe("Badland Hunters");
    expect(movie.releaseYear).toBe(2024);
    expect(movie.voteAverage).toBeGreaterThanOrEqual(0);
    expect(movie.voteAverage).toBeLessThanOrEqual(10);
  });
});

describe.skip("formatGenresToMap utils function", () => {
  it("returns new Map called with values of 28, 35 and 18 in sequence", async () => {
    const iterator = (await formatGenresToMap([25])).keys();

    expect(iterator.next().value).toEqual(28);
    expect(iterator.next().value).toEqual(35);
    expect(iterator.next().value).toEqual(18);
  });
  it("returns empty new Map when function invoked without params", async () => {
    const map = await formatGenresToMap();
    const iterator = map.keys();
    expect(iterator.next().value).toEqual(undefined);
    expect(map.has(28)).toBeFalsy();
    expect(map.has(35)).toBeFalsy();
    expect(map.has(18)).toBeFalsy();
  });
});
