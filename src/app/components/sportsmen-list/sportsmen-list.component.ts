import { Component, OnInit } from '@angular/core';
import {SportsmanService} from "../../services/sportsman-service/sportsman.service";
import {Sportsman} from "../../models/sportsman-model/sportsman.model";

@Component({
  selector: 'app-sportsmen-list',
  templateUrl: './sportsmen-list.component.html',
  styleUrls: ['./sportsmen-list.component.css']
})
export class SportsmenListComponent implements OnInit {
  sportsmen: Sportsman[];
  hidden_sportsman_data: any = {};

  constructor(private sportsmanService: SportsmanService) { }

  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve(): void {
    this.sportsmanService.getAll().subscribe({
      next: (data) => {
        this.sportsmen = data;
      }
    });
  }
}
