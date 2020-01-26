import { Injectable } from "@angular/core";
import SearchFilter from "./SearchFilter";
import { MovieProviderService } from "./movie-provider.service";
import { Observable, BehaviorSubject } from "rxjs";
import {
  distinctUntilChanged,
  switchMap,
  filter,
  finalize,
  startWith
} from "rxjs/operators";
import MovieResult from "./MovieResult";
import Debug from "src/Debug";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  // private searchFilters: SearchFilter[];
  // private searchQuery: string;
  // private searchFiltersObservable: Observable<SearchFilter> = from(
  //   this.searchFilters
  // );
  private input: Observable<any>;
  private discoverMovies: Observable<MovieResult>;
  private movieList: MovieResult[] = [];
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private movieProviderService: MovieProviderService) {
    this.isLoading$.next(true);
    this.movieProviderService
      .getDiscoverMoviesObservable()
      .pipe(finalize(() => {
        this.isLoading$.next(false)
        const event: any = new window["Event"]("resize") as any;
        window.dispatchEvent(event);
      }))
      .subscribe(movie => this.movieList.push(movie));
  }

  isLoadingInitialMovies() {
    return this.isLoading$;
  }
  // addSearchFilters(searchFilter: SearchFilter) {
  //   this.searchFilters.push(searchFilter);
  // }

  // addSearchFilters(searchFilter: SearchFilter) {
  //   this.searchFilters.push(searchFilter);
  // }

  // clearSearchFilters() {
  //   this.searchFilters = [];
  //   this.searchFiltersObservable = from([]);
  // }

  // getSearchFiltersObservable() {
  //   return this.searchFiltersObservable;
  // }

  getSearchResults(searchQuery?: string): MovieResult[] {
    return this.movieList;
    // const filterObservable = this.input.pipe(
    //   debounceTime(250),
    //   distinctUntilChanged(),
    // );
    // switchMap(input => {
    //   Debug.logValue("getSearchResults input", input);
    //   return from(this.movieList).pipe(
    //     filter(movie =>
    //       movie.title.toLowerCase().includes(input.toLowerCase())
    //     )
    //   );

    // switchMap(input => {
    //   Debug.logValue("getSearchResults input", input);
    //   return this.movies.pipe(
    //     filter(movie =>
    //       movie.title.toLowerCase().includes(input.toLowerCase())
    //     )
    //   );
    // })
  }

  setInputObservable(inputObservable: Observable<any>) {
    this.input = inputObservable;
  }
}
