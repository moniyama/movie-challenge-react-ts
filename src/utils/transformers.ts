import { IMovie, IMovieAPI } from "../models/Movie";

function formatMovie(movie: IMovieAPI, map): IMovie {
  const { title, id, overview } = movie;

  const result = {
    id,
    title,
    poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    releaseYear: Number(movie.release_date.substring(0, 4)),
    overview,
    voteAverage: movie.vote_average,
    language: movie.original_language,
    genres: movie.genre_ids.map(genre_id => map.get(genre_id))
  };

  return result;
}

function banana() {
  console.log("banana");
}


const formatGenresToMap = (genres) => {
  return new Map(
    genres.map(genre => [genre.id, genre.name])
  );
}

export { formatMovie, banana, formatGenresToMap };
