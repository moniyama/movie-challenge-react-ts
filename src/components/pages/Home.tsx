import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HTTPService from "../../services/APIService";
import { IMovie } from "../../models/Movie";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

interface IPageCount {
  currentPage: number;
  totalPages: number;
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<IPageCount>({
    currentPage: Number(searchParams.get("page") || 1),
    totalPages: 1,
  });
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  async function getMovies(currentPage: number) {
    console.log('getMovies')
    setError(false);
    setIsLoading(true);
    try {
      const result = await HTTPService.getMovies({
        filters: {
          page: currentPage,
        },
      });
      setMovies(result.movies);
      return await Promise.resolve(result);
    } catch (err) {
      setError(true);
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function checkURL() {
    const result = await getMovies(page.currentPage);
    if (typeof result !== "undefined") {
      setPage({
        currentPage: result.metaData.pagination.currentPage,
        totalPages: result.metaData.pagination.totalPages,
      });
    }
  }

  useEffect(() => {
    checkURL();
  }, []);

  useEffect(() => {
    setSearchParams(`page=${page.currentPage}`);
    getMovies(page.currentPage);
  }, [page.currentPage]);

  return (
    <>
      {isLoading ? <p>carregando...</p> : ""}
      {error && <p>Ops.. Ocorreu uma falha! Tente novamente mais tarde</p>}
      {!!movies.length && !error && (
        <>
          <MovieList movies={movies} />
          <Pagination
            currentPage={page.currentPage}
            onSelectPage={setPage}
            totalPages={page.totalPages}
          />
        </>
      )}
    </>
  );
}

export default Home;
