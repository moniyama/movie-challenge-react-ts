import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HTTPService from "../../services/APIService";
import { IMovie } from "../../models/Movie";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import { formatGenresToMap } from "../../utils/transformers";

interface IPageCount {
  currentPage: number;
  totalPages: number;
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  let genresMap = null;

  async function getMovies(currentPage: number, map) {
    setError(false);
    setIsLoading(true);
    try {
      const result = await HTTPService.getMovies({
        filters: {
          page: currentPage,
        },
      },
      map);
      setMovies(result.movies);
      return result;
    } catch (err) {
      setError(true);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }

  async function getGenres(){
    return await HTTPService.getMovieGenres();
  }

  async function checkURL(currentPage) {
    if(!genresMap){
      const genresAPI = await getGenres();
      genresMap = formatGenresToMap(genresAPI);
    }
    const result = await getMovies(currentPage, genresMap);
    if (typeof result !== "undefined") {
      setTotalPages(result.metaData.pagination.currentPage);
    }
  }
  
  useEffect(() => {
    checkURL(currentPage);
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
