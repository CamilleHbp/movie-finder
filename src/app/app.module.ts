import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { MoviesService } from "./services/movies.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MoviesService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
