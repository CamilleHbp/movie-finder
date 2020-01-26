import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import MovieResult from "../../services/MovieResult";
import { Subscription } from "rxjs";

import Debug from "../../../Debug";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit {
  private movies$: Subscription = null;
  private movies: MovieResult[] = [];
  private poster_size: string = "w92";

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movies$ = this.movieService
      .getDiscoverMoviesObservable()
      .subscribe(movie => {
        this.movies.push(movie);
        // There is a bug with ion-virtual-scroll that causes the list not to be rerendered when the state is updated
        // The fix is to send a resize event to force rerendering
        const event: any = new window["Event"]("resize") as any;
        window.dispatchEvent(event);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.movies$.unsubscribe();
  }
}
