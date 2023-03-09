import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SportsListComponent} from "./components/sports-list/sports-list.component";
import {TeamsListComponent} from "./components/teams-list/teams-list.component";
import {SportsmenListComponent} from "./components/sportsmen-list/sportsmen-list.component";
import {EditSportComponent} from "./components/edit-sport/edit-sport.component";
import {EditTeamComponent} from "./components/edit-team/edit-team.component";
import {EditSportsmanComponent} from "./components/edit-sportsman/edit-sportsman.component";

const routes: Routes = [
  {path: '', redirectTo: 'api/sport/main', pathMatch: 'full' },
  {path: 'api/sport/main', component: SportsListComponent},
  {path: 'api/team/main', component: TeamsListComponent},
  {path: 'api/sportsmen/main', component: SportsmenListComponent},
  {path: 'api/sport', component: EditSportComponent},
  {path: 'api/team', component: EditTeamComponent},
  {path: 'api/sportsmen', component: EditSportsmanComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
