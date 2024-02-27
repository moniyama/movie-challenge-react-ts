import "./MovieList.css";
import { IMovie } from "../../models/Movie";
import MovieCard from "../MovieCard/MovieCard";

function MovieList({ movies }: { movies: IMovie[] }) {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
