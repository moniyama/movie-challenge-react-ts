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
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [genresMap, setGenresMap] = useState<Map<number, string>>(new Map());
  const [filterGenre, setFilterGenre] = useState<number | null>(
    Number(searchParams.get("genre")) || null,
  );
  // const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<IMovieLabel | null>(
    null,
  );
  const [genreOptions, setGenreOptions] = useState<IMovieLabel[]>([]);

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
    setSearchParams(`page=${currentPage}&genre=${filterGenre}`);
    getMovies(currentPage, genresMap);
  }, [currentPage, filterGenre]);

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
              if (!id) {
                setSelectedOption(null);
              } else {
                const label =
                  genreOptions.find((item) => item.value === id) || null;
                setSelectedOption(label);
                setSelectedOption(label);
              }
              setFilterGenre(id);
            }}
            onClear={() => {
              resetMovie();
              setSelectedOption(null);
              setFilterGenre(null);
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
