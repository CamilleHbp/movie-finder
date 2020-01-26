import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Observable, from, range } from "rxjs";
import { switchMap, concatMap, map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import MovieResult from "./MovieResult";
import DiscoverResponse from "./DiscoverResponse";

@Injectable({
  providedIn: "root"
})
export class MovieProviderService {
  constructor(private http: HttpClient, private storage: Storage) {}

  getDiscoverMoviesObservable(): Observable<MovieResult> {
    const apiKey = environment.tmdbBasicApiKey;

    return this.http
      .get<DiscoverResponse>(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      )
      .pipe(
        switchMap(firstResponse =>
          range(1, Math.min(50, firstResponse.total_pages)).pipe(
            concatMap(page =>
              this.http
                .get<DiscoverResponse>(
                  `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
                )
                .pipe(
                  concatMap(response =>
                    from(response.results).pipe(map(result => result))
                  )
                )
            )
          )
        )
      );
  }
}
