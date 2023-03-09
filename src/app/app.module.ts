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
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import { EditSportsmanComponent } from './components/edit-sportsman/edit-sportsman.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import {EditSportComponent} from "./components/edit-sport/edit-sport.component";

@NgModule({
  declarations: [
    AppComponent,
    SportsListComponent,
    TeamsListComponent,
    SportsmenListComponent,
    EditSportsmanComponent,
    EditTeamComponent,
    EditSportComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        MatTreeModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
