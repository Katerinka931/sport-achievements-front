import {Component, OnInit} from '@angular/core';
import {Team} from "../../models/team-model/team.model";
import {TeamService} from "../../services/team-service/team.service";

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {

  teams?: Team[];
  hidden_item: any = {};
  hidden_sportsman_data: any = {};

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve(): void {
    this.teamService.getAll().subscribe({
      next: (data) => {
        this.teams = data;

        console.log(this.teams);
      }
    });
  }
}
