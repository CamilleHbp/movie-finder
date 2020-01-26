import { Component } from "@angular/core";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  isReady$;
  constructor(private searchService: SearchService) {

    this.isReady$ = this.searchService.isReady();
  }
}
