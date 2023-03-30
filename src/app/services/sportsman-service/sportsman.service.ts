import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Sportsman} from "../../models/sportsman-model/sportsman.model";
import {HttpClient} from "@angular/common/http";

const baseUrl = 'http://localhost:8080/api/sportsmen';

@Injectable({
  providedIn: 'root'
})
export class SportsmanService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Sportsman[]> {
    return this.http.get<Sportsman[]>(baseUrl + '/main');
  }

  deleteSportsman(id: number): Observable<Sportsman> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  createSportsman(data: Sportsman): Observable<Sportsman> {
    return this.http.post(baseUrl, data);
  }

  updateSportsman(id: number, data: Sportsman): Observable<Sportsman> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
