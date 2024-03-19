import "./MovieCard.css";
import { IMovie } from "../../models/Movie";

function MovieCard({ movie }: { movie: IMovie }) {
  const { title, releaseYear, poster, genres } = movie;
  return (
    <li>
      <h1>{title}</h1>
      <img src={poster} alt={`poster do filme ${title}`} />
      <p>{releaseYear}</p>
      <p>{genres.join('-')}</p>
    </li>
  );
}

export default MovieCard;
