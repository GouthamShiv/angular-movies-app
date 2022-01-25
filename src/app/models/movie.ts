export interface Movie {
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
  original_name: string;
  revenue: number;
  runtime: number;
  status: string;
  genres: Genre[];
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
}

export interface MovieDTO {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export enum Category {
  movie = 'movie',
  tv = 'tv',
}

export interface Genre {
  id: number;
  name: string;
}

export interface VideoDTO {
  id: number;
  results: Video[];
}

export interface Video {
  site: string;
  key: string;
}

export interface Images {
  backdrops: {
    file_path: string;
  }[];
}

export interface Credits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}
