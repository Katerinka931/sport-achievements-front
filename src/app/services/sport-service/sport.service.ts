import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sport} from "../../models/sport-model/sport.model";

const baseUrl = 'http://localhost:8080/api/sport';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Sport[]> {
    return this.http.get<Sport[]>(baseUrl);
  }
}
