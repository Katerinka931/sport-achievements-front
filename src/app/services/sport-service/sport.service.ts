import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sport} from "../../models/sport-model/sport.model";
import {Team} from "../../models/team-model/team.model";
import {Sportsman} from "../../models/sportsman-model/sportsman.model";

const baseUrl = 'http://localhost:8080/api/sport';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Sport[]> {
    return this.http.get<Sport[]>(baseUrl + '/main');
  }

  deleteSport(id: number): Observable<Sport> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  createSport(data: Sport): Observable<Sport> {
    return this.http.post(baseUrl, data);
  }

  updateSport(id: number, data: Sport): Observable<Sport> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  updateTeam(sport_id: number, team_id: number, data: Team): Observable<Team> {
    return this.http.put(`${baseUrl}/${sport_id}/team/${team_id}`, data);
  }

  createTeam(sport_id: number, data: Team) {
    return this.http.post(`${baseUrl}/${sport_id}/team`, data);
  }

  deleteTeam(id: number): Observable<Team> {
    return this.http.delete(`${baseUrl}/team/${id}`);
  }

  updateSportsman(sport_id: number, sportsman_id: number, data: Sportsman): Observable<Sportsman>{
    return this.http.put(`${baseUrl}/${sport_id}/sportsman/${sportsman_id}`, data);
  }

  createSportsman(sport_id: number, data: Sportsman){
    return this.http.post(`${baseUrl}/${sport_id}/sportsman`, data);
  }

  deleteSportsman(id: number): Observable<Sportsman> {
    return this.http.delete(`${baseUrl}/sportsmen/${id}`);
  }
}
