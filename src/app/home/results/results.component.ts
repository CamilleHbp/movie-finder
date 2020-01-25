import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import MovieResult from "../../services/MovieResult";
import { Subscription } from "rxjs";

import Debug from '../../../Debug';

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit {
  private movies: MovieResult[] = [];
  private poster_size: string = 'w92';

  constructor(private movieService: MoviesService) {
    this.movieService
      .getDiscoverMoviesObservable()
      .subscribe(movie => {
        // Debug.logValue("subscription movie title", movie.title);
        this.movies.push(movie);
      });
  }

  ngOnInit() {}
}
