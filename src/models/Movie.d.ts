export interface IMovie {
  id: number;
  title: string;
  releaseYear: number;
  poster: string;
  overview: string;
  voteAverage: number;
  language: string;
  genre: string[];
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

export interface IPaginationResponse {
  metaData: {
    pagination: {
      currentPage: number;
      totalPages: number;
    };
  };
  movies: IMovie[];
}

export interface IPagination {
  filters: {
    page: number;
  };
}

export interface IMovieGenre {
  id: number;
  name: string;
}
