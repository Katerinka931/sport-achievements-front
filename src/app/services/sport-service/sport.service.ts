import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Sport} from "../../models/Sport";
import {Team} from "../../models/Team";
import {Sportsman} from "../../models/Sportsman";

@Injectable({
  providedIn: 'root'
})
export class SportService {

  private baseUrl = environment.apiUrl + '/sport'

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.baseUrl + '/main');
  }

  deleteSport(id: number): Observable<Sport> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  createSport(data: Sport): Observable<Sport> {
    return this.http.post(this.baseUrl, data);
  }

  updateSport(id: number, data: Sport): Observable<Sport> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  updateTeam(sport_id: number, team_id: number, data: Team): Observable<Team> {
    return this.http.put(`${this.baseUrl}/${sport_id}/team/${team_id}`, data);
  }

  createTeam(sport_id: number, data: Team) {
    return this.http.post(`${this.baseUrl}/${sport_id}/team`, data);
  }

  deleteTeam(id: number): Observable<Team> {
    return this.http.delete(`${this.baseUrl}/team/${id}`);
  }

  updateSportsman(sport_id: number, sportsman_id: number, data: Sportsman): Observable<Sportsman>{
    return this.http.put(`${this.baseUrl}/${sport_id}/sportsman/${sportsman_id}`, data);
  }

  createSportsman(sport_id: number, data: Sportsman){
    return this.http.post(`${this.baseUrl}/${sport_id}/sportsman`, data);
  }

  deleteSportsman(id: number): Observable<Sportsman> {
    return this.http.delete(`${this.baseUrl}/sportsmen/${id}`);
  }
}
