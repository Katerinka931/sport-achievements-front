import {SportService} from "../../services/sport-service/sport.service";
import {Component, OnInit} from '@angular/core';
import {Sport} from "../../models/Sport";

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.css']
})
export class SportsListComponent implements OnInit {
  sports?: Sport[];
  constructor(private sportService: SportService) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve(): void {
    this.sportService.getAll().subscribe({
      next: (data) => {
        this.sports = data;
      }, error: (e) => {
        console.log(e);
        confirm('Ошибка сервера \nСтатус ошибки ' + e.status)
      }
    });
  }
}
