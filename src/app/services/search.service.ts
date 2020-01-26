import { Injectable } from "@angular/core";
import SearchFilter from "./SearchFilter";
import { MovieProviderService } from "./movie-provider.service";
import { Observable, from } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, filter } from "rxjs/operators";
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

  constructor(private movieProviderService: MovieProviderService) {
    this.movieProviderService
      .getDiscoverMoviesObservable()
      .subscribe(movie => this.movieList.push(movie));
    Debug.logObject("Search Service | movieList", this.movieList);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.discoverMovies.subscribe(movie => this.movieList.push(movie));
    Debug.logObject("Search Service | movieList", this.movieList);
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

  getSearchResults(): Observable<MovieResult> {
    return this.input.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(input => {
        Debug.logValue("getSearchResults input", input);
        return from(this.movieList).pipe(
          filter(movie =>
            movie.title.toLowerCase().includes(input.toLowerCase())
          )
        );
      })
      // switchMap(input => {
      //   Debug.logValue("getSearchResults input", input);
      //   return this.movies.pipe(
      //     filter(movie =>
      //       movie.title.toLowerCase().includes(input.toLowerCase())
      //     )
      //   );
      // })
    );
  }

  setInputObservable(inputObservable: Observable<any>) {
    this.input = inputObservable;
  }
}
