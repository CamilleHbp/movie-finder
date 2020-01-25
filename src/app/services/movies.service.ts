import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { environment } from "../../environments/environment";
import { Observable, merge, range } from "rxjs";
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

  getDiscoverPages(apiKey: string, pages: number): Observable<MovieResult> {
    return range(1, pages).pipe(
      // delay(100),
      flatMap(page => {
        const pageResults = this.http
          .get<DiscoverResponse>(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
          )
          .pipe(flatMap(response => response.results));
        // Debug.logObject("pageResults", pageResults);
        return pageResults;
      })
    );
  }

  getDiscoverMoviesObservable(): Observable<MovieResult> {
    const apiKey = environment.tmdbBasicApiKey;

    return this.http
      .get<DiscoverResponse>(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      )
      .pipe(
        flatMap(response => {
          const discoverResults = this.getDiscoverPages(
            apiKey,
            response.total_pages
          );
          // Debug.logObject("discover pages", discoverResults);
          return discoverResults;
        })
      );
  }
}
