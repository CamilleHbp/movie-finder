import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(private storage: Storage, private http: HttpClient) {}

  getMovielist() {
    console.log(`OMDb Api Key: ${environment.omdbApiKey}`);
    const apiKey = environment.omdbApiKey;
    this.http.get(`https://omdbapi.com/?apikey=${apiKey}&t=test`).subscribe((response) => {
    console.log(response);
});
  }
}
