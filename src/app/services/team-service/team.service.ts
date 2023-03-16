import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Team} from "../../models/team-model/team.model";
import {HttpClient} from "@angular/common/http";

const baseUrl = 'http://localhost:8080/api/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Team[]> {
    return this.http.get<Team[]>(baseUrl + '/main');
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  createTeam(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateTeam(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
