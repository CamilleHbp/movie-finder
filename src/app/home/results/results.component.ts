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
  private movies: MovieResult[] = [];
  private poster_size: string = "w92";

  constructor(private searchService: SearchService) {}

  private clearResults: () => void = () => {
    this.movies = [];
  };

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.searchService.getSearchResults(this.clearResults).subscribe(movie => {
      this.movies.push(movie);
      this.movies.sort((movie, movieNext) =>
        movie.title.toLowerCase().localeCompare(movieNext.title.toLowerCase())
      );
    });
  }
}
