import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../models/Movie";

function MovieCard({ movie }: { movie: IMovie }) {
  const navigate = useNavigate();
  const { title, releaseYear, poster, genre, id } = movie;
  return (
    <li>
      <div
        role="button"
        onClick={() => navigate(`/movie/${id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter") navigate(`/movie/${id}`);
        }}
        tabIndex={0}
      >
        <h1>{title}</h1>
        <img src={poster} alt={`poster do filme ${title}`} />
        <p>{releaseYear}</p>
        <p>{genre.join(", ")}</p>
      </div>
    </li>
  );
}

export default MovieCard;
