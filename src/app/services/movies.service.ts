import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { HttpClientModule } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(private storage: Storage) {}

  getMovielist() {
    console.log("getMovieList");
  }
}
