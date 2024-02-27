import { useState, useEffect } from "react";
import "./App.css";
import HTTPService from "../services/APIService";
import { IMovie } from "../models/Movie";
import MovieList from "./MovieList/MovieList";

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  async function getMovies() {
    const result = await HTTPService.getMovies();
    setMovies(result);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return <MovieList movies={movies} />;
}

export default App;
