import { Pipe, PipeTransform } from "@angular/core";
import InputType from "../../services/InputType";
import MovieResult from "src/app/services/MovieResult";
import SearchFilter from "../../services/SearchFilter";

@Pipe({ name: "searchFilter" })
export class SearchFilterPipe implements PipeTransform {
  transform(
    value: MovieResult[],
    searchFilters: SearchFilter[]
  ): MovieResult[] {
    let filteredValue = value;
    searchFilters.forEach(filter => {
      switch (filter.type) {
        case InputType.OriginalLanguage:
          break;
        case InputType.VoteCount:
          break;
        case InputType.Year:
          break;
        default:
          filteredValue = this.titleFilter(filteredValue, filter.input);
          break;
      }
    });
    return filteredValue;
  }

  private titleFilter(value: MovieResult[], input: string) {
    return value.filter(element => element.title.includes(input));
  }
}
