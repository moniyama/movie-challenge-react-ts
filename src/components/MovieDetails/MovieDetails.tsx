import { useEffect, useState } from "react";
import { IMovie } from "../../models/Movie";
import HTTPService from "../../services/APIService";
import { formatGenresToMap } from "../../utils/transformers";
import { useNavigate, useParams } from "react-router-dom";

function MovieDetail() {
  let params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<IMovie>();

  const id: number = Number(params.movieId)

  async function getMovieDetail(idMovie: number) {
    setError(false);
    setIsLoading(true);
    try {
      const map = await HTTPService.getMovieGenre()
      const result = await HTTPService.getMovieDetail(idMovie, formatGenresToMap(map));
      setMovieDetail(result);
      return result;
    } catch (err) {
      setError(true);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMovieDetail(id)
  }, [])

  return (
    <main>
      {isLoading ? <p>carregando...</p> : ""}
      {error && <p>Ops.. Ocorreu uma falha! Tente novamente mais tarde</p>}
      {movieDetail &&
        <>
          <h1>{movieDetail.title}</h1>
          <img src={movieDetail.poster} alt={`poster do filme ${movieDetail.title}`} />
          <p>{movieDetail.overview}</p>
          <p>Nota: {movieDetail.voteAverage}</p>
          <p>{movieDetail.releaseYear}</p>
          <p>{movieDetail.genre.join(", ")}</p>
          <button type="button" onClick={() => navigate(-1)}>Voltar</button>
        </>
      }
    </main>
  );
}

export default MovieDetail;
