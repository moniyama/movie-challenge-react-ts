import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HTTPService from "../../services/APIService";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

function Home() {
  const [page, setPage] = useState({ current: 1, total: 1 });

  async function fetchMovies() {
    return HTTPService.getMovies({
      filters: {
        page: page.current,
      },
    });
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos", page],
    queryFn: fetchMovies,
  });

  return (
    <>
      {isPending ? <p>carregando...</p> : ""}
      {isError && <p>{error.message}</p>}
      {data && (
        <>
          <MovieList movies={data.movies} />
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
