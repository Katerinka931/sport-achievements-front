import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
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

  getAll(): Observable<Sportsman[]> {
    return this.http.get<Sportsman[]>(this.baseUrl + '/main');
  }

  deleteSportsman(id: number): Observable<Sportsman> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  createSportsman(data: Sportsman): Observable<Sportsman> {
    return this.http.post(this.baseUrl, data);
  }

  updateSportsman(id: number, data: Sportsman): Observable<Sportsman> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  createContact(sportsman_id: number, data: Contact) {
    return this.http.post(`${this.baseUrl}/${sportsman_id}/contacts`, data);
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.baseUrl}/contact/${id}`);
  }

  updateContact(sportsman_id: number, contact_id: number, data: Contact) {
    return this.http.put(`${this.baseUrl}/${sportsman_id}/contacts/${contact_id}`, data);
  }

  createAchievement(sportsman_id: number, data: Achievement) {
    return this.http.post(`${this.baseUrl}/${sportsman_id}/achievements`, data);
  }

  deleteAchievement(id: number) {
    return this.http.delete(`${this.baseUrl}/achievement/${id}`);
  }

  updateAchievement(sportsman_id: number, ach_id: number, data: Achievement) {
    return this.http.put(`${this.baseUrl}/${sportsman_id}/achievements/${ach_id}`, data);
  }

  getTeamBySportsman(id: number) {
    return this.http.get<Team>(`${this.baseUrl}/${id}/team`);
  }

  getSportBySportsman(id: number) {
    return this.http.get<Team>(`${this.baseUrl}/${id}/sport`);
  }
}
