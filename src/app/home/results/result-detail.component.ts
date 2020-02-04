import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import MovieResult from "../../services/MovieResult";
import Debug from "src/Debug";

@Component({
  selector: "app-result-detail",
  templateUrl: "./result-detail.component.html",
  styleUrls: ["./result-detail.component.scss"]
})
export class ResultDetailModal implements OnInit {
  @Input() movie: MovieResult;
  @Input() modalController: ModalController;
  private poster_size: string = "w300";

  constructor() {
    // this.movie = navParams.get("movie");
    // Debug.logObject("modal movie", this.movie.title);
  }

  ngOnInit() {}

  loadPlaceholder(event) {
    event.target.src = "assets/images/movie_placeholder.png";
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
