import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ошибка на стороне клиента:', error.error);
    } else {
      console.error(
        `Ошибка сервера с кодом ${error.status}, ошибка: `, error.error);
    }
    return throwError(() => new Error('Что-то пошло не так, попробуйте еще раз позже.'));
  }

  getAll():Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl + '/main').pipe(
      catchError(this.handleError)
    );
  }

  getSportByTeam(id: number): Observable<Sport> {
    return this.http.get<Sport>(`${this.baseUrl}/${id}/sport`).pipe(
      catchError(this.handleError)
    );
  }

  deleteTeam(id: number): Observable<Team> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createTeam(data: Team): Observable<Team> { // creation without sport
    return this.http.post(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  updateTeam(id: number, data: Team): Observable<Team> {
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteSportsman(id: number): Observable<Sportsman> {
    return this.http.delete(`${this.baseUrl}/sportsmen/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createSportsman(team_id: number, data: Sportsman){
    return this.http.post(`${this.baseUrl}/${team_id}/sportsman`, data).pipe(
      catchError(this.handleError)
    );
  }

  updateSportsman(team_id: number, sportsman_id: number, data: Sportsman): Observable<Sportsman>{
    return this.http.put(`${this.baseUrl}/${team_id}/sportsman/${sportsman_id}`, data).pipe(
      catchError(this.handleError)
    );
  }
}
