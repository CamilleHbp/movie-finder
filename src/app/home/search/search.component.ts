import { Component, OnInit } from "@angular/core";
import { SearchService } from "src/app/services/search.service";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  private searchControl: FormControl;
  private searchInput = "";
  private searchInputObservable;

  constructor(private searchService: SearchService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.searchService.setInputObservable(this.searchControl.valueChanges);
    this.searchControl.setValue("");
  }
}
