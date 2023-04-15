import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SportsListComponent} from "./components/sports-list/sports-list.component";
import {EditSportComponent} from "./components/edit-sport/edit-sport.component";
import {EditTeamComponent} from "./components/edit-team/edit-team.component";
import {EditSportsmanComponent} from "./components/edit-sportsman/edit-sportsman.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'api/sport/main', pathMatch: 'full' },
  {path: 'api/sport/main', component: SportsListComponent},
  {path: 'api/sport', component: EditSportComponent},
  {path: 'api/team', component: EditTeamComponent},
  {path: 'api/sportsmen', component: EditSportsmanComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
