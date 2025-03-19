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
import ErrorPage from "./Error";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalPages, setTotalPages] = useState<number>(0);
  const [queryPage, setQueryPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );
  const [queryGenre, setQueryGenre] = useState<number | null>(
    Number(searchParams.get("genre")) || null,
  );
  const [querySortBy, setQuerySortBy] = useState<string | null>(
    searchParams.get("sort_by") || null,
  );

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [genresMap, setGenresMap] = useState<Map<number, string>>(new Map());
  const [genreOptions, setGenreOptions] = useState<IMovieLabel[]>([]);
  const [sortOptions, setSortOptions] = useState<IMovieLabel[]>([]);

  const [selectedOptionGenre, setSelectedOptionGenre] =
    useState<IMovieLabel | null>(
      genreOptions.find((item) => item.value === String(queryGenre)) || null,
    );

  const [selectedOptionSort, setSelectedOptionSort] =
    useState<IMovieLabel | null>(
      sortOptions.find((item) => item.value === String(querySortBy)) || null,
    );
  async function getGenres() {
    return HTTPService.getMovieGenre();
  }

  async function getMovies(page: number, map: Map<number, string>) {
    setError(false);
    setIsLoading(true);
    try {
      const filterParams = {
        filters: {
          page,
          genreId: queryGenre || null,
          sortBy: querySortBy === "null" ? null : querySortBy,
        },
      };

      const result = await HTTPService.getMovies(filterParams, map);

      if (querySortBy?.includes("title")) {
        result.movies.sort((a, b) => a.title.localeCompare(b.title));
        if (querySortBy?.includes("desc")) {
          result.movies.reverse();
        }
      }
      if (querySortBy?.includes("popularity")) {
        result.movies.sort((a, b) => a.popularity - b.popularity);
        if (querySortBy?.includes("desc")) {
          result.movies.reverse();
        }
      }

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

  function updateSortOnInit() {
    setSortOptions([
      { value: "popularity.asc", label: "Least popular" },
      { value: "popularity.desc", label: "Most popular" },
      { value: "title.asc", label: "Titles A-Z" },
      { value: "title.desc", label: "Titles Z-A" },
    ]);
  }

  function handleSelectedOption() {
    if (queryGenre) {
      const find =
        genreOptions.find((item) => item.value === String(queryGenre)) || null;
      setSelectedOptionGenre(find);
    } else {
      setSelectedOptionGenre(null);
    }
    if (querySortBy && querySortBy !== null) {
      const find =
        sortOptions.find((item) => item.value === querySortBy) || null;
      setSelectedOptionSort(find);
    } else {
      setSelectedOptionSort(null);
    }
    getMovies(queryPage, genresMap);
  }

  function resetMovie() {
    setMovies([]);
  }

  useEffect(() => {
    updateGenresOnInit();
    updateSortOnInit();
  }, []);

  useEffect(() => {
    handleSelectedOption();
  }, [genresMap]);

  useEffect(() => {
    resetMovie();
    setSearchParams({
      page: queryPage.toString(),
      genre: queryGenre?.toString() || "null",
      sort_by: querySortBy || "null",
    });
    handleSelectedOption();
  }, [queryPage, queryGenre, querySortBy]);

  return (
    <>
      {isLoading ? <p>carregando...</p> : ""}
      {error && <ErrorPage />}
      {!!movies.length && !error && (
        <>
          <ListOptions
            label="Gender"
            options={genreOptions}
            selectedOption={selectedOptionGenre}
            onChange={setQueryGenre}
            onClear={() => setQueryGenre(null)}
          />
          <ListOptions
            label="Sort by"
            options={sortOptions}
            selectedOption={selectedOptionSort}
            onChange={setQuerySortBy}
            onClear={() => setQuerySortBy(null)}
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
