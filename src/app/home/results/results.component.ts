import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import MovieResult from "../../services/MovieResult";
import { ResultDetailModal } from "./result-detail.component";
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

  constructor(
    private modalController: ModalController,
    private searchService: SearchService
  ) {}

  private clearResults: () => void = () => {
    this.movies = [];
  };

  ngOnInit() {}

  loadPlaceholder(event) {
    event.target.src = "assets/images/movie_placeholder.png";
  }

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

  async openMovieDetails(movie: MovieResult) {
    Debug.logObject("modal movie", movie);
    const modal = await this.modalController.create({
      component: ResultDetailModal,
      componentProps: {
        movie,
        modalController: this.modalController
      }
    });
    return await modal.present();
  }
}
