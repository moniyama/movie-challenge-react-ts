import "./MovieCard.css";
import { IMovie } from "../../models/Movie";

function MovieCard({ movie }: { movie: IMovie }) {
  const { title, releaseYear, poster } = movie;
  return (
    <li>
      <h1>{title}</h1>
      <img src={poster} alt={`poster do filme ${title}`} />
      <p>{releaseYear}</p>
    </li>
  );
}

export default MovieCard;
