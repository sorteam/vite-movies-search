import useSWR from "swr";
import {
  getMovieDetailsById,
  MovieEntity,
  searchMoviesByTitle,
  SearchResponse,
} from "./api";

export function useList(title: string = "") {
  const resp = useSWR<SearchResponse, unknown, [string, string]>(
    ["/api/list", title],
    ([_, p]) => searchMoviesByTitle(p),
    { revalidateOnFocus: false, revalidateIfStale: false }
  );

  return resp;
}

export function useMovie(id: string) {
  const resp = useSWR<MovieEntity, unknown, [string, string]>(
    ["/api/movie", id],
    ([_, p]) => getMovieDetailsById(p),
    { revalidateOnFocus: false, revalidateIfStale: false }
  );

  return resp;
}
