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
import { EditSportAdminComponent } from './components/edit-sport-admin/edit-sport-admin.component';
import { EditSportsmanAdminComponent } from './components/edit-sportsman-admin/edit-sportsman-admin.component';
import { EditTeamAdminComponent } from './components/edit-team-admin/edit-team-admin.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    SportsListComponent,
    TeamsListComponent,
    SportsmenListComponent,
    EditSportAdminComponent,
    EditSportsmanAdminComponent,
    EditTeamAdminComponent
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
