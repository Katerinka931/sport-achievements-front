import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SportsListComponent } from './components/sports-list/sports-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { SportsmenListComponent } from './components/sportsmen-list/sportsmen-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SportsListComponent,
    TeamsListComponent,
    SportsmenListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
