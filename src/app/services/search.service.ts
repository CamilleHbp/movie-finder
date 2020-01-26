import { Injectable } from "@angular/core";
import SearchFilter from "./SearchFilter";
import { MovieProviderService } from "./movie-provider.service";
import { Observable, BehaviorSubject, from, Subject, of } from "rxjs";
import {
  distinctUntilChanged,
  switchMap,
  filter,
  finalize,
  debounceTime,
  startWith
} from "rxjs/operators";
import MovieResult from "./MovieResult";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  private input: Observable<any>;
  private searchQuery: Subject<string> = new Subject<string>();
  private movieList: MovieResult[] = [];
  private isReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private movieProviderService: MovieProviderService) {
    this.isReady$.next(false);
    this.movieProviderService
      .getDiscoverMoviesObservable()
      .pipe(
        finalize(() => {
          console.log("isReady");
          this.isReady$.next(true);
          // const event: any = new window["Event"]("resize") as any;
          // window.dispatchEvent(event);
        })
      )
      .subscribe(movie => this.movieList.push(movie));
  }

  isReady() {
    return this.isReady$;
  }

  getSearchResults(callback: () => void): Observable<MovieResult> {
    return from(this.input).pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => {
        callback();
        return from(this.movieList).pipe(
          filter(movie => {
            return movie.title.toLowerCase().includes(query.toLowerCase());
          })
        );
      })
    );

    // return from(this.input).pipe(
    //   // startWith(""),
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   switchMap(query => {
    //     callback();
    //     return from(this.movieList).pipe(
    //       filter(movie => {
    //         return movie.title.toLowerCase().includes(query.toLowerCase());
    //       }),
    //       finalize(() => {
    //         this.isLoading$.next(false);
    //       })
    //     );
    //   })
    // );
  }

  setInputObservable(inputObservable: Observable<any>) {
    this.input = inputObservable;
  }

  setSearchQuery(searchQuery: string) {
    this.searchQuery.next(searchQuery);
  }
}
