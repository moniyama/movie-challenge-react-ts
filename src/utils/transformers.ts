import { IMovie, IMovieAPI } from "../models/Movie";

function formatMovie(movie: IMovieAPI): IMovie {
  const { title, id, overview } = movie;

  const result = {
    id,
    title,
    poster: movie.poster_path,
    release_year: Number(movie.release_date.substring(0, 4)),
    overview,
    vote_average: movie.vote_average,
    language: movie.original_language,
  };

  return result;
}

function banana() {
  console.log("banana");
}

export { formatMovie, banana };
