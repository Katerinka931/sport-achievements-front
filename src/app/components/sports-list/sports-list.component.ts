import {Sport} from "../../models/sport-model/sport.model";
import {Team} from "../../models/team-model/team.model";
import {Sportsman} from "../../models/sportsman-model/sportsman.model";
import {SportService} from "../../services/sport-service/sport.service";
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.css']
})
export class SportsListComponent implements OnInit {
  sports?: Sport[];
  teams?: Team[];
  sportsmen?: Sportsman[];

  hidden_item: any = {};

  constructor(private sportService: SportService) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve(): void {
    this.sportService.getAll().subscribe({
      next: (data) => {
        this.sports = data;
      }
    });
  }
}
