import {Component} from '@angular/core';
import {Sport} from "../../models/sport-model/sport.model";
import {SportService} from "../../services/sport-service/sport.service";
import {Sportsman} from "../../models/sportsman-model/sportsman.model";
import {Team} from "../../models/team-model/team.model";
import {TeamService} from "../../services/team-service/team.service";
import {SportsmanService} from "../../services/sportsman-service/sportsman.service";

@Component({
  selector: 'app-edit-sport',
  templateUrl: './edit-sport.component.html',
  styleUrls: ['./edit-sport.component.css']
})
export class EditSportComponent {
  sports: Sport[];
  sportsmen: Sportsman[];
  teams: Team[];

  currentSport: Sport = {
    name: '',
  };

  newTeam: Team = {
    name: '',
    count: 0,
  }

  newSportsman: Sportsman = {
    passport: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthdate: ''
  }

  selected: any;

  constructor(private sportService: SportService, private teamService: TeamService, private sportsmanService: SportsmanService) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve(): void {
    this.sportService.getAll().subscribe({
      next: (data) => {
        this.sports = data;
        this.selectItem(this.currentSport.id)
      }, error: (e) => {
        console.log(e);
      }
    });
  }

  selectItem(id: any) {
    let sport = this.sports.find(function (item) {
      return item.id == id;
    })!;

    this.currentSport = new Sport();
    this.currentSport.id = sport.id;
    this.currentSport.name = sport.name;

    this.selected = this.currentSport.name;

    this.teams = sport['teams'];
    this.sportsmen = sport['sportsmen']
    this.setSelectedSport(this.teams);
    this.setSelectedSport(this.sportsmen);
  }

  setSelectedSport(list: any){
    for (var t in list) {
      list[t].selectedSport = this.currentSport.name;
    }
  }

  editSport() {
    this.sportService.updateSport(this.currentSport.id, this.currentSport).subscribe({
      next: (data) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  createSport() {
    const data = {
      name: this.currentSport.name?.toLowerCase()
    };
    this.sportService.createSport(data)
      .subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  deleteSport(id: any) {
    this.sportService.deleteSport(id).subscribe({
      next: (res) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  deleteTeam(id: any) {
    this.teamService.deleteTeam(id).subscribe({
      next: (res) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  getSelectedSport(selector: any) {
    let sport = this.sports.find(function (item) {
      return item.name == selector;
    })!;
    return sport.id;
  }

  updateTeam(id: number) {
    let teamName = document.getElementById("teamname" + id)!['value'];
    let count = document.getElementById("count" + id)!['value'];
    let selector = document.getElementById("t_sport_selector_" + id)!['value'];
    let sport_id = this.getSelectedSport(selector);

    const data = {
      name: teamName,
      count: count,
    };

    this.sportService.updateTeam(sport_id, id, data)
      .subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  createTeam() {
    const data = {
      name: this.newTeam.name?.toLowerCase(),
      count: this.newTeam.count,
    };
    this.sportService.createTeam(this.currentSport.id, data).subscribe({
      next: (res) => {
        this.retrieve();
        this.newTeam = new Team();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  deleteSportsman(id: any) {
    this.sportsmanService.deleteSportsman(id).subscribe({
      next: (res) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  updateSportsman(id: any) {
    let firstName = document.getElementById("firstName" + id)!['value'];
    let lastName = document.getElementById("lastName" + id)!['value'];
    let middleName = document.getElementById("middleName" + id)!['value'];
    let passport = document.getElementById("passport" + id)!['value'];
    let birthdate = document.getElementById("birthdate" + id)!['value'];

    let selector = document.getElementById("sport_selector_" + id)!['value'];
    let sport_id = this.getSelectedSport(selector);

    const data = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      passport: passport,
      birthdate: birthdate
    };

    this.sportService.updateSportsman(sport_id, id, data)
      .subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  createSportsman() {
    const data = {
      firstName: this.newSportsman.firstName,
      lastName: this.newSportsman.lastName,
      middleName: this.newSportsman.middleName,
      passport: this.newSportsman.passport,
      birthdate: this.newSportsman.birthdate
    };
    this.sportService.createSportsman(this.currentSport.id, data).subscribe({
      next: (res) => {
        this.retrieve();
        this.newSportsman = new Sportsman();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
}
