import "./MovieList.css";
import { IMovie } from "../../models/Movie";

function MovieList({ movies }: { movies: IMovie[] }) {
  return (
    <ul>
      {movies.map(({ id, title, releaseYear, poster }) => (
        <li key={id}>
          <h1>{title}</h1>
          <img src={poster} alt={`poster do filme ${title}`} />
          <p>{releaseYear}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieList
