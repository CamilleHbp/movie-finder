import { Component, OnInit } from "@angular/core";
import { SearchService } from "src/app/services/search.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  private searchControl: FormControl;

  constructor(private searchService: SearchService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.searchService.setInputObservable(this.searchControl.valueChanges);
    this.searchControl.setValue("");
  }
  ngAfterViewInit(): void {
    this.searchService.setInputObservable(this.searchControl.valueChanges);
    this.searchControl.setValue("");
  }
}
