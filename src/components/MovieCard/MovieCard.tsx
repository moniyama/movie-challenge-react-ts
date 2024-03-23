import "./MovieCard.css";
import { IMovie } from "../../models/Movie";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }: { movie: IMovie }) {
  const navigate = useNavigate();
  const { title, releaseYear, poster, genre, id } = movie;
  return (
    <li onClick={() => navigate(`/movie/${id}`)}>
      <h1>{title}</h1>
      <img src={poster} alt={`poster do filme ${title}`} />
      <p>{releaseYear}</p>
      <p>{genre.join(", ")}</p>
    </li>
  );
}

export default MovieCard;
