import { useState, useEffect } from "react";
import HTTPService from "../../services/APIService";
import { IMovie } from "../../models/Movie";
import MovieList from "../MovieList/MovieList";

function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getMovies() {
    try {
      setIsLoading(true);
      const result = await HTTPService.getMovies();
      setMovies(result);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {isLoading ? <p>carregando...</p> : ""}
      {error && <p>Falha na requisição.. Tente novamente mais tarde</p>}
      {!error && <MovieList movies={movies} />}
    </>
  );
}

export default Home;
