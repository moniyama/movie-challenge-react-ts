import { useState, useEffect } from "react";
import HTTPService from "../../services/APIService";
import { IMovie } from "../../models/Movie";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState({ current: 1, total: 1 });

  async function getMovies() {
    try {
      setIsLoading(true);
      const result = await HTTPService.getMovies({
        filters: {
          page: 1,
        },
      });
      setPage({
        current: result.metaData.pagination.currentPage,
        total: result.metaData.pagination.totalPages,
      });
      setMovies(result.movies);
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
      {!isLoading && (
        <>
          <MovieList movies={movies} />
          <Pagination
            currentPage={page.current}
            onSelectPage={setPage}
            totalPages={page.total}
          />
        </>
      )}
    </>
  );
}

export default Home;
