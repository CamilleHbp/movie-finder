import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";

import { SearchComponent } from "./search/search.component";
import { ResultsComponent } from "./results/results.component";
import { ResultDetailModal } from "./results/result-detail.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    ResultsComponent,
    ResultDetailModal,
    SearchComponent
  ],
  entryComponents: [ResultDetailModal],
})
export class HomePageModule {}
