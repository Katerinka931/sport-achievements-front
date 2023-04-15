import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Sportsman} from "../../models/Sportsman";
import {Contact} from "../../models/Contact";
import {Achievement} from "../../models/Achievement";
import {Team} from "../../models/Team";

@Injectable({
  providedIn: 'root'
})
export class SportsmanService {
  private baseUrl = environment.apiUrl + '/sportsmen'

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

  getAll(): Observable<Sportsman[]> {
    return this.http.get<Sportsman[]>(this.baseUrl + '/main').pipe(
      catchError(this.handleError)
    );
  }

  deleteSportsman(id: number): Observable<Sportsman> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createSportsman(data: Sportsman): Observable<Sportsman> {
    return this.http.post(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  updateSportsman(id: number, data: Sportsman): Observable<Sportsman> {
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  createContact(sportsman_id: number, data: Contact) {
    return this.http.post(`${this.baseUrl}/${sportsman_id}/contacts`, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.baseUrl}/contact/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateContact(sportsman_id: number, contact_id: number, data: Contact) {
    return this.http.put(`${this.baseUrl}/${sportsman_id}/contacts/${contact_id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  createAchievement(sportsman_id: number, data: Achievement) {
    return this.http.post(`${this.baseUrl}/${sportsman_id}/achievements`, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteAchievement(id: number) {
    return this.http.delete(`${this.baseUrl}/achievement/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateAchievement(sportsman_id: number, ach_id: number, data: Achievement) {
    return this.http.put(`${this.baseUrl}/${sportsman_id}/achievements/${ach_id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  getTeamBySportsman(id: number) {
    return this.http.get<Team>(`${this.baseUrl}/${id}/team`).pipe(
      catchError(this.handleError)
    );
  }

  getSportBySportsman(id: number) {
    return this.http.get<Team>(`${this.baseUrl}/${id}/sport`).pipe(
      catchError(this.handleError)
    );
  }
}
