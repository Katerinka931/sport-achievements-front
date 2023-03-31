import {Component} from '@angular/core';
import {Team} from "../../models/team-model/team.model";
import {Sportsman} from "../../models/sportsman-model/sportsman.model";
import {TeamService} from "../../services/team-service/team.service";
import {Sport} from "../../models/sport-model/sport.model";
import {SportService} from "../../services/sport-service/sport.service";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent {
  teams: Team[];
  sportsmen: Sportsman[];

  sports: Sport[];
  selectedSport: string;
  selectedTeam: string;

  currentTeam: Team = {
    name: '',
    count: 0
  }
  newSportsman: Sportsman = {
    passport: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthdate: new Date()
  };

  constructor(private teamService: TeamService, private sportService: SportService) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve(): void {
    this.retrieveSports();
    this.retrieveTeams();
  }

  private retrieveTeams(): void {
    this.teamService.getAll().subscribe({
      next: (data) => {
        this.teams = data;
        this.selectItem(this.currentTeam.id!)
      }, error: (e) => {
        console.log(e);
      }
    });
  }

  private retrieveSports(): void {
    this.sportService.getAll().subscribe({
      next: (data) => {
        this.sports = data;
      }, error: (e) => {
        console.log(e);
      }
    });
  }

  selectItem(id: number) {
    let team = this.teams.find(function (item) {
      return item.id == id;
    })!;

    this.teamService.getSportByTeam(id).subscribe({
      next: (res) => {
        this.currentTeam = new Team();
        this.currentTeam.id = team.id;
        this.currentTeam.name = team.name;
        this.currentTeam.count = team.count;
        this.selectedSport = res.name!;

        this.selectedTeam = this.currentTeam.name!;
        this.sportsmen = team['sportsmen'];
      },
      error: (e) => {
      }
    });
  }

  deleteTeam(id: number) {
    this.teamService.deleteTeam(id).subscribe({
      next: (res) => {
        this.retrieve();
        this.clean();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getSelectedSport(selector: string) {
    let sport = this.sports.find(function (item) {
      return item.name == selector;
    })!;
    return sport.id;
  }

  getSelectedTeam(selector: string) {
    let team = this.teams.find(function (item) {
      return item.name == selector;
    })!;
    return team.id;
  }

  createTeam() {
    const data = {
      name: this.currentTeam.name?.toLowerCase(),
      count: this.currentTeam.count,
    };
    this.sportService.createTeam(this.getSelectedSport(this.selectedSport)!, data)
      .subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  editTeam() {
    this.sportService.updateTeam(this.getSelectedSport(this.selectedSport)!, this.currentTeam.id!, this.currentTeam).subscribe({
      next: (data) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  updateSportsman(id: number) {
    let firstName = document.getElementById("firstName" + id)!['value'];
    let lastName = document.getElementById("lastName" + id)!['value'];
    let middleName = document.getElementById("middleName" + id)!['value'];
    let passport = document.getElementById("passport" + id)!['value'];
    let birthdate = document.getElementById("birthdate" + id)!['value'];

    let selector = document.getElementById("team_selector_" + id)!['value'];
    let team_id = this.getSelectedTeam(selector);

    const data = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      passport: passport,
      birthdate: birthdate
    };

    this.teamService.updateSportsman(team_id!, id, data)
      .subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  deleteSportsman(id: number) {
    this.sportService.deleteSportsman(id).subscribe({
      next: (res) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  createSportsman() {
    const data = {
      firstName: this.newSportsman.firstName,
      lastName: this.newSportsman.lastName,
      middleName: this.newSportsman.middleName,
      passport: this.newSportsman.passport,
      birthdate: this.newSportsman.birthdate
    };
    this.teamService.createSportsman(this.currentTeam.id!, data).subscribe({
      next: (res) => {
        this.retrieve();
        this.newSportsman = new Sportsman();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  private clean(): void {
    this.teams = [];
    this.sportsmen = [];
  }
}
