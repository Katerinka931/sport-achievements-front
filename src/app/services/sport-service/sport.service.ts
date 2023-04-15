import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ошибка на стороне клиента:', error.error);
    } else {
      console.error(
        `Ошибка сервера с кодом ${error.status}, ошибка: `, error.error);
    }
    return throwError(() => new Error('Что-то пошло не так, попробуйте еще раз позже.'));
  }

  getAll(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.baseUrl + '/main').pipe(
      catchError(this.handleError)
    );
  }

  deleteSport(id: number): Observable<Sport> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createSport(data: Sport): Observable<Sport> {
    return this.http.post(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  updateSport(id: number, data: Sport): Observable<Sport> {
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  updateTeam(sport_id: number, team_id: number, data: Team): Observable<Team> {
    return this.http.put(`${this.baseUrl}/${sport_id}/team/${team_id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  createTeam(sport_id: number, data: Team) {
    return this.http.post(`${this.baseUrl}/${sport_id}/team`, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteTeam(id: number): Observable<Team> {
    return this.http.delete(`${this.baseUrl}/team/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateSportsman(sport_id: number, sportsman_id: number, data: Sportsman): Observable<Sportsman> {
    return this.http.put(`${this.baseUrl}/${sport_id}/sportsman/${sportsman_id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  createSportsman(sport_id: number, data: Sportsman) {
    return this.http.post(`${this.baseUrl}/${sport_id}/sportsman`, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteSportsman(id: number): Observable<Sportsman> {
    return this.http.delete(`${this.baseUrl}/sportsmen/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
