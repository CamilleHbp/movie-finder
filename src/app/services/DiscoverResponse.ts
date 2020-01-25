import MovieResult from "./MovieResult";

export default interface DiscoverResponse {
  page?: number;
  results?: MovieResult[];
  total_results?: number;
  total_pages?: number;
}
