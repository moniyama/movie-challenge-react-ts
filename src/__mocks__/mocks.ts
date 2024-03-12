import { IMovie, IMovieAPI, IPagination } from "../models/Movie";

const filmesAPI: IMovieAPI[] = [
  {
    adult: false,
    backdrop_path: "/pWsD91G2R1Da3AKM3ymr3UoIfRb.jpg",
    genre_ids: [878, 28, 18],
    id: 933131,
    original_language: "ko",
    original_title: "황야",
    overview:
      "After a deadly earthquake turns Seoul into a lawless badland, a fearless huntsman springs into action to rescue a teenager abducted by a mad doctor.",
    popularity: 1382.144,
    poster_path: "/zVMyvNowgbsBAL6O6esWfRpAcOb.jpg",
    release_date: "2024-01-26",
    title: "Badland Hunters",
    video: false,
    vote_average: 6.74,
    vote_count: 440,
  },
  {
    adult: false,
    backdrop_path: "/yyFc8Iclt2jxPmLztbP617xXllT.jpg",
    genre_ids: [35, 10751, 14],
    id: 787699,
    original_language: "en",
    original_title: "Wonka",
    overview:
      "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.",
    popularity: 1175.854,
    poster_path: "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
    release_date: "2023-12-06",
    title: "Wonka",
    video: false,
    vote_average: 7.2,
    vote_count: 2191,
  },
  {
    adult: false,
    backdrop_path: "/unvtbkgxh47BewQ8pENvdOdme0r.jpg",
    genre_ids: [28, 18],
    id: 1212073,
    original_language: "de",
    original_title: "60 Minuten",
    overview:
      "Desperate to keep custody of his daughter, a mixed martial arts fighter abandons a big match and races across Berlin to attend her birthday party.",
    popularity: 1037.758,
    poster_path: "/jojfbnIHGsRpodIood3OQoqA45Y.jpg",
    release_date: "2024-01-19",
    title: "Sixty Minutes",
    video: false,
    vote_average: 6.864,
    vote_count: 372,
  },
  {
    adult: false,
    backdrop_path: "/s9YTxwaByYeoSqugYjJJtZjMRAG.jpg",
    genre_ids: [28, 27, 35, 53],
    id: 1211483,
    original_language: "en",
    original_title: "Skal - Fight for Survival",
    overview:
      "My name's Arthur, a huge Internet star who's just hit 3 million subs. While in the midst of throwing an epic party to celebrate, the universe had the balls to bring on the effing apocalypse and cut my night short. What was supposed to be a perfect hangover, has turned into an epic fight for survival.",
    popularity: 1000.333,
    poster_path: "/uQkiDKQyun13mqsOXv7I5MRKr0q.jpg",
    release_date: "2023-11-24",
    title: "Skal - Fight for Survival",
    video: false,
    vote_average: 5.75,
    vote_count: 28,
  },
  {
    adult: false,
    backdrop_path: "/r9oTasGQofvkQY5vlUXglneF64Z.jpg",
    genre_ids: [28, 35],
    id: 1029575,
    original_language: "en",
    original_title: "The Family Plan",
    overview:
      "Dan Morgan is many things: a devoted husband, a loving father, a celebrated car salesman. He's also a former assassin. And when his past catches up to his present, he's forced to take his unsuspecting family on a road trip unlike any other.",
    popularity: 980.464,
    poster_path: "/jLLtx3nTRSLGPAKl4RoIv1FbEBr.jpg",
    release_date: "2023-12-14",
    title: "The Family Plan",
    video: false,
    vote_average: 7.331,
    vote_count: 947,
  },
];

const transformedFilmes: IMovie[] = [
  {
    id: 933131,
    language: "ko",
    overview:
      "After a deadly earthquake turns Seoul into a lawless badland, a fearless huntsman springs into action to rescue a teenager abducted by a mad doctor.",
    poster: "/zVMyvNowgbsBAL6O6esWfRpAcOb.jpg",
    releaseYear: 2024,
    title: "Badland Hunters",
    voteAverage: 6.74,
  },
  {
    id: 787699,
    language: "en",
    overview:
      "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.",
    poster: "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
    releaseYear: 2023,
    title: "Wonka",
    voteAverage: 7.2,
  },
  {
    id: 1212073,
    language: "de",
    overview:
      "Desperate to keep custody of his daughter, a mixed martial arts fighter abandons a big match and races across Berlin to attend her birthday party.",
    poster: "/jojfbnIHGsRpodIood3OQoqA45Y.jpg",
    releaseYear: 2024,
    title: "Sixty Minutes",
    voteAverage: 6.864,
  },
  {
    id: 1211483,
    language: "en",
    overview:
      "My name's Arthur, a huge Internet star who's just hit 3 million subs. While in the midst of throwing an epic party to celebrate, the universe had the balls to bring on the effing apocalypse and cut my night short. What was supposed to be a perfect hangover, has turned into an epic fight for survival.",
    poster: "/uQkiDKQyun13mqsOXv7I5MRKr0q.jpg",
    releaseYear: 2023,
    title: "Skal - Fight for Survival",
    voteAverage: 5.75,
  },
  {
    id: 1029575,
    language: "en",
    overview:
      "Dan Morgan is many things: a devoted husband, a loving father, a celebrated car salesman. He's also a former assassin. And when his past catches up to his present, he's forced to take his unsuspecting family on a road trip unlike any other.",
    poster: "/jLLtx3nTRSLGPAKl4RoIv1FbEBr.jpg",
    releaseYear: 2023,
    title: "The Family Plan",
    voteAverage: 7.331,
  },
];

const getMoviesServiceParameter: IPagination = {
  filters: {
    page: 3,
  },
};

export { filmesAPI, getMoviesServiceParameter, transformedFilmes };
