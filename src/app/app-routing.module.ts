import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SportsListComponent} from "./components/sports-list/sports-list.component";
import {TeamsListComponent} from "./components/teams-list/teams-list.component";
import {SportsmenListComponent} from "./components/sportsmen-list/sportsmen-list.component";

const routes: Routes = [

  // { path: '', redirectTo: 'api/sport', pathMatch: 'full' },
  {path: '', component: SportsListComponent},
  {path: 'api/sport', component: SportsListComponent},
  {path: 'api/team', component: TeamsListComponent},
  {path: 'api/sportsmen', component: SportsmenListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
