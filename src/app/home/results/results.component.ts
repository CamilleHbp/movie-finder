import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import MovieResult from "../../services/MovieResult";
import { SearchService } from "../../services/search.service";

import Debug from "../../../Debug";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit {
  private movies$: Subscription;
  isLoading$;
  // private movies: MovieResult[] = [];
  private movies: MovieResult[] = [];
  private poster_size: string = "w92";

  constructor(private searchService: SearchService) {}

  private clearResults: () => void = () => {
    Debug.logObject("callme!", this.movies);
    this.movies = [];
  };

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.movies$ = this.searchService
      .getSearchResults(this.clearResults)
      .subscribe(movie => {
        this.movies.push(movie);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    // this.movies$.unsubscribe();
  }
}
