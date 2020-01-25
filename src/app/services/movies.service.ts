import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { environment } from "../../environments/environment";
import { Observable, merge } from "rxjs";
import { switchMap, delay, flatMap } from "rxjs/operators";

import MovieResult from "./MovieResult";
import DiscoverResponse from "./DiscoverResponse";
// Debug
import Debug from "../../Debug";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(private http: HttpClient, private storage: Storage) {}

  getDiscoverMoviesObservable(): Observable<MovieResult> {
    const apiKey = environment.tmdbBasicApiKey;

    return this.http
      .get<DiscoverResponse>(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      )
      .pipe(
        switchMap(response => {
          const maxPages = response.total_pages;
          const moviesObservable: Observable<MovieResult>[] = [];
          for (let page = 0; page <= maxPages; page++) {
            moviesObservable.push(
              this.http
                .get<DiscoverResponse>(
                  `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
                )
                .pipe(
                  flatMap(response => {
                    // Debug.logObject("response results", response.results);
                    return response.results;
                  })
                )
            );
          }
          return merge(...moviesObservable);
        })
      );
  }
}
