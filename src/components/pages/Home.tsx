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
  const [queryPage, setQueryPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );
  const [queryGenre, setQueryGenre] = useState<number | null>(
    Number(searchParams.get("genre")) || null,
  );

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [genresMap, setGenresMap] = useState<Map<number, string>>(new Map());
  const [genreOptions, setGenreOptions] = useState<IMovieLabel[]>([]);

  // const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<IMovieLabel | null>(
    genreOptions.find((item) => item.value === queryGenre) || null,
  );

  async function getGenres() {
    return HTTPService.getMovieGenre();
  }

  async function getMovies(page: number, map: Map<number, string>) {
    setError(false);
    setIsLoading(true);
    try {
      const result = await HTTPService.getMovies(
        {
          filters: {
            page,
            genreId: queryGenre || null,
            sortBy: "sortBy" || null,
          },
        },
        map,
      );
      setMovies(result.movies);
      setTotalPages(result.metaData.pagination.totalPages);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateGenresOnInit() {
    if (!genresMap.size) {
      const genres = await getGenres();
      setGenresMap(formatGenresToMap(genres));
      setGenreOptions(formatGenresToOptions(genres));
    }
  }

  function handleSelectedOption() {
    if (queryGenre) {
      const find =
        genreOptions.find((item) => item.value === queryGenre) || null;
      setSelectedOption(find);
    } else {
      setSelectedOption(null);
    }

    getMovies(queryPage, genresMap);
  }

  function resetMovie() {
    setMovies([]);
  }

  useEffect(() => {
    updateGenresOnInit();
  }, []);

  useEffect(() => {
    handleSelectedOption();
  }, [genresMap]);

  useEffect(() => {
    resetMovie();
    setSearchParams({
      page: queryPage.toString(),
      genre: queryGenre?.toString() || "null",
    });
    handleSelectedOption();
  }, [queryPage, queryGenre]);

  return (
    <>
      {isLoading ? <p>carregando...</p> : ""}
      {error && <p>Ops.. Ocorreu uma falha! Tente novamente mais tarde</p>}
      {!!movies.length && !error && (
        <>
          <ListOptions
            options={genreOptions}
            selectedOption={selectedOption}
            onChange={setQueryGenre}
            onClear={() => setQueryGenre(null)}
          />
          <MovieList movies={movies} />
          <Pagination
            currentPage={queryPage}
            onSelectPage={setQueryPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
}

export default Home;
