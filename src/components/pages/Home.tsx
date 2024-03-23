import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HTTPService from "../../services/APIService";
import { IMovie } from "../../models/Movie";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import {
  formatGenresToMap,
  formatGenresToOptions,
} from "../../utils/transformers";
import ListOptions, { IMovieLabel } from "../ListOptions/ListOptions";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page"))
  const genreIdParam = Number(searchParams.get("genre"))

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(pageParam || 1);

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [genresMap, setGenresMap] = useState<Map<number, string>>(new Map());
  const [filterGenre, setFilterGenre] = useState<number | null>(
    genreIdParam || null,
  );
  // const [sortBy, setSortBy] = useState<string | null>(null);
  const [genreOptions, setGenreOptions] = useState<IMovieLabel[]>([]);
  const [selectedOption, setSelectedOption] = useState<IMovieLabel | null>(
    genreOptions.find(item => item.value === filterGenre) || null,
  );

  async function getMovies(page: number, map: Map<number, string>) {
    setError(false);
    setIsLoading(true);
    try {
      const result = await HTTPService.getMovies(
        {
          filters: {
            page,
            genreId: filterGenre || null,
            sortBy: "sortBy" || null,
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
    return HTTPService.getMovieGenre();
  }

  async function checkURL(currentPageState: number) {
    if (!genresMap.size) {
      const genres = await getGenres();
      setGenresMap(formatGenresToMap(genres));
      setGenreOptions(formatGenresToOptions(genres));
    }

    const result = await getMovies(currentPageState, genresMap);
    if (typeof result !== "undefined") {
      setTotalPages(result.metaData.pagination.totalPages);
    }
  }

  function resetMovie() {
    setMovies([]);
  }

  useEffect(() => {
    checkURL(currentPage);
  }, [genresMap]);

  useEffect(() => {
    resetMovie();
    const find = genreOptions.find(item => item.value === filterGenre) || null
    setSelectedOption(find)
    setSearchParams(`page=${currentPage}&genre=${filterGenre}`);
    getMovies(currentPage, genresMap);
    
  }, [currentPage, filterGenre, genreOptions]);

  return (
    <>
      {isLoading ? <p>carregando...</p> : ""}
      {error && <p>Ops.. Ocorreu uma falha! Tente novamente mais tarde</p>}
      {!!movies.length && !error && (
        <>
          <ListOptions
            options={genreOptions}
            selectedOption={selectedOption}
            onChange={(id: number | null) => {
              resetMovie();
              setFilterGenre(id);
            }}
            onClear={() => {
              if (filterGenre) {
                resetMovie();
                setFilterGenre(null);
              }
            }}
          />
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
