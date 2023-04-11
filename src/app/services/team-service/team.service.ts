import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Sport} from "../../models/Sport";
import {Team} from "../../models/Team";
import {Sportsman} from "../../models/Sportsman";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = environment.apiUrl + '/team'

  constructor(private http: HttpClient) { }

  getAll():Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl + '/main');
  }

  getSportByTeam(id: number): Observable<Sport> {
    return this.http.get<Sport>(`${this.baseUrl}/${id}/sport`)
  }

  deleteTeam(id: number): Observable<Team> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  createTeam(data: Team): Observable<Team> { // creation without sport
    return this.http.post(this.baseUrl, data);
  }

  updateTeam(id: number, data: Team): Observable<Team> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteSportsman(id: number): Observable<Sportsman> {
    return this.http.delete(`${this.baseUrl}/sportsmen/${id}`);
  }

  createSportsman(team_id: number, data: Sportsman){
    return this.http.post(`${this.baseUrl}/${team_id}/sportsman`, data);
  }

  updateSportsman(team_id: number, sportsman_id: number, data: Sportsman): Observable<Sportsman>{
    return this.http.put(`${this.baseUrl}/${team_id}/sportsman/${sportsman_id}`, data);
  }
}
