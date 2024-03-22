import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HTTPService from "../../services/APIService";
import { IMovie } from "../../models/Movie";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import { formatGenresToMap } from "../../utils/transformers";
import MovieService from "../../services/MovieService";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [genresMap, setGenresMap] = useState<Map<number, string>>(new Map());

  async function getMovies(page: number, map: Map<number, string>) {
    setError(false);
    setIsLoading(true);
    try {
      const result = await HTTPService.getMovies(
        {
          filters: {
            page,
          },
        },
        map,
      );
      setMovies(result.movies);
      return result;
    } catch (err) {
      setError(true);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }

  async function getGenres() {
    return MovieService.getMovieGenre();
  }

  async function checkURL(currentPageState: number) {
    if (!genresMap.size) {
      const genres = await getGenres();
      setGenresMap(formatGenresToMap(genres));
    }

    const result = await getMovies(currentPageState, genresMap);
    if (typeof result !== "undefined") {
      setTotalPages(result.metaData.pagination.totalPages);
    }
  }

  useEffect(() => {
    checkURL(currentPage);
  }, [genresMap]);

  useEffect(() => {
    setSearchParams(`page=${currentPage}`);
    getMovies(currentPage, genresMap);
  }, [currentPage]);

  return (
    <>
      {isLoading ? <p>carregando...</p> : ""}
      {error && <p>Ops.. Ocorreu uma falha! Tente novamente mais tarde</p>}
      {!!movies.length && !error && (
        <>
          <MovieList movies={movies} />
          <Pagination
            currentPage={currentPage}
            onSelectPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
}

export default Home;
