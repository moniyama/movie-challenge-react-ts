import { useState, useEffect } from "react";
import "./App.css";
import HTTPService from "../services/APIService";
import { IMovie } from "../models/Movie";

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  async function getMovies() {
    const result = await HTTPService.getMovies();
    setMovies(result);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <ul>
      {movies.map(({ id, title, releaseYear, poster }) => (
        <li key={id}>
          <h1>{title}</h1>
          <img src={poster} alt={`poster do filme ${title}`} />
          <p>{releaseYear}</p>
        </li>
      ))}
    </ul>
  );
}

export default App;
