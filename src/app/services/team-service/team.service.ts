import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Team} from "../../models/team-model/team.model";
import {HttpClient} from "@angular/common/http";
import {Sport} from "../../models/sport-model/sport.model";
import {Sportsman} from "../../models/sportsman-model/sportsman.model";

const baseUrl = 'http://localhost:8080/api/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Team[]> {
    return this.http.get<Team[]>(baseUrl + '/main');
  }

  getSportByTeam(id: number): Observable<Sport> {
    return this.http.get<Sport>(`${baseUrl}/${id}/sport`)
  }

  deleteTeam(id: number): Observable<Team> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  createTeam(data: Team): Observable<Team> { // creation without sport
    return this.http.post(baseUrl, data);
  }

  updateTeam(id: number, data: Team): Observable<Team> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteSportsman(id: number): Observable<Sportsman> {
    return this.http.delete(`${baseUrl}/sportsmen/${id}`);
  }

  createSportsman(team_id: number, data: Sportsman){
    return this.http.post(`${baseUrl}/${team_id}/sportsman`, data);
  }

  updateSportsman(team_id: number, sportsman_id: number, data: Sportsman): Observable<Sportsman>{
    return this.http.put(`${baseUrl}/${team_id}/sportsman/${sportsman_id}`, data);
  }
}
