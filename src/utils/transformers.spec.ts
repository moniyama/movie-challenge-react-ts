import { filmesAPI, movieGenderResponse } from "../__mocks__/mocks";
import {
  formatGenresToMap,
  formatMovie,
  formatGenresToOptions,
} from "./transformers";

jest.mock("../utils/constants", () => "token API");

describe("formatMovie utils function", () => {
  it("returns object transformed", () => {
    const movie = formatMovie(filmesAPI[0], new Map([[28, "Ação"]]));
    expect(movie.title).toBe("Badland Hunters");
    expect(movie.releaseYear).toBe(2024);
    expect(movie.voteAverage).toBeGreaterThanOrEqual(0);
    expect(movie.voteAverage).toBeLessThanOrEqual(10);
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

describe("formatGenresToOptions utils function", () => {
  it("returns array with label & value", async () => {
    expect(formatGenresToOptions(movieGenderResponse)[0]).toEqual({
      value: "28",
      label: "Ação",
    });
    expect(formatGenresToOptions(movieGenderResponse)[1]).toEqual({
      value: "35",
      label: "Comédia",
    });
    expect(formatGenresToOptions(movieGenderResponse)[2]).toEqual({
      value: "18",
      label: "Drama",
    });
  });
  it("returns empty new Map when function invoked without params", async () => {
    expect(formatGenresToOptions()).toEqual([]);
  });
});
