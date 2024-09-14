import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.VITE_API_KEY;

type MovieType = "movie" | "series" | "episode";

type ErrorResponse = {
  Error: string;
  Response: "False";
};

type SuccessResponse<T> = T & {
  Response: "True";
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type SearchEntity = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
};

export type MovieEntity = SearchEntity & {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
};

export type SearchResponse = {
  Search: SearchEntity[];
  totalResults: string;
};

export const searchMoviesByTitle = async (
  title: string
): Promise<SuccessResponse<SearchResponse>> => {
  if (!title) {
    return { Response: "True", Search: [], totalResults: "0" };
  }

  const params = {
    s: title,
    apikey: API_KEY,
  };

  const response: AxiosResponse<ApiResponse<SearchResponse>> = await axios.get(
    BASE_URL,
    { params }
  );

  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }

  return response.data;
};

export const getMovieDetailsById = async (
  id: string
): Promise<SuccessResponse<MovieEntity>> => {
  const params = {
    i: id,
    apikey: API_KEY,
  };

  const response: AxiosResponse<ApiResponse<MovieEntity>> = await axios.get(
    BASE_URL,
    { params }
  );

  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }

  return response.data;
};
