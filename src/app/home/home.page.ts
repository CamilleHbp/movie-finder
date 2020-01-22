import { Component } from "@angular/core";
import { MoviesService } from "../services/movies.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(public movieService: MoviesService) {
    this.movieService.getMovielist();
  }
}
