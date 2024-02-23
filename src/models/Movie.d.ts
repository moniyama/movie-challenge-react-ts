export interface IMovie {
  id: number;
  title: string;
  release_year: number;
  poster: string;
  overview: string;
  vote_average: number;
  language: string;
}

export interface IMovieAPI {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
