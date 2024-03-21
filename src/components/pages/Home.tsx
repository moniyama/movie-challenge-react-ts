import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HTTPService from "../../services/APIService";
import { IMovie, IMovieGenre } from "../../models/Movie";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import ListOptions from "../ListOptions/ListOptions";
import { formatGenresToMap } from "../../utils/transformers";
import MovieService from "../../services/MovieService";

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
  let genresMap:  Map<number, string> = new Map();

  async function getMovies(currentPage: number, map: Map<number, string>) {
    setError(false);
    setIsLoading(true);
    try {
      const result = await HTTPService.getMovies({
        filters: {
          page: currentPage,
        },
      }, map);
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
    return await MovieService.getMovieGenre()
  }

  async function checkURL(currentPage: number) {
    if(!genresMap.size) {
      const genres = await getGenres()
      genresMap = formatGenresToMap(genres)
    }

    const result = await getMovies(currentPage, genresMap);
    if (typeof result !== "undefined") {
      setTotalPages(result.metaData.pagination.totalPages)
    }
  }

  useEffect(() => {
    checkURL(currentPage);
  }, []);

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
          <ListOptions
            options={[{ value: 2, label: "Ação" }, { value: 32, label: "Comédia" }, { value: 4, label: "Drama" }]}
            selectedOption={{ value: 2, label: "Ação" }}
            onChange={() => { }}
            onClear={() => { }}
          ></ListOptions>
          <MovieList movies={movies} />
          {/* <Pagination
            currentPage={currentPage}
            onSelectPage={setCurrentPage}
            totalPages={totalPages}
          /> */}
        </>
      )}
    </>
  );
}

export default Home;
