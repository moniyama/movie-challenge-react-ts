import { filmesAPI, movieGenderResponse } from "../__mocks__/mocks";
import { formatGenresToMap, formatMovie } from "./transformers";

describe("formatMovie utils function", () => {
  it("returns object transformed", () => {
    expect(formatMovie(filmesAPI[0]).title).toBe("Badland Hunters");
    expect(formatMovie(filmesAPI[0]).releaseYear).toBe(2024);
    expect(formatMovie(filmesAPI[0]).voteAverage).toBeGreaterThanOrEqual(0);
    expect(formatMovie(filmesAPI[0]).voteAverage).toBeLessThanOrEqual(10);
  });
});

describe("formatGenresToMap utils function", () => {
  it("returns new Map called with values of 28, 35 and 18 in sequence", () => {
    const iterator = formatGenresToMap(movieGenderResponse).keys();

    expect(iterator.next().value).toEqual(28);
    expect(iterator.next().value).toEqual(35);
    expect(iterator.next().value).toEqual(18);
  });
  it("returns empty new Map when function invoked without params", () => {
    const map = formatGenresToMap();
    const iterator = map.keys();
    expect(iterator.next().value).toEqual(undefined);
    expect(map.has(28)).toBeFalsy();
    expect(map.has(35)).toBeFalsy();
    expect(map.has(18)).toBeFalsy();
  });
});
