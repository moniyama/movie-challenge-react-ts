import { IMovie, IMovieAPI, IMovieGenre } from "../models/Movie";

function formatMovie(movie: IMovieAPI): IMovie {
  const { title, id, overview } = movie;

  const result = {
    id,
    title,
    poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    releaseYear: Number(movie.release_date.substring(0, 4)),
    overview,
    voteAverage: movie.vote_average,
    language: movie.original_language,
  };

  return result;
}

function formatGenresToMap(arr: IMovieGenre[] = []) {
  let arrToBeMapped: [number, string][] = [];
  if (arr.length) {
    arrToBeMapped = arr.map((item) => [item.id, item.name]);
  }

  // const arrToBeMapped = arr.map(Object.values)  // WHY doesnt work
  return new Map(arrToBeMapped);
}

export { formatMovie, formatGenresToMap };
