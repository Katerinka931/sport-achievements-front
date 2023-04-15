import {Component} from '@angular/core';
import {TeamService} from "../../services/team-service/team.service";
import {SportService} from "../../services/sport-service/sport.service";
import {Sport} from "../../models/Sport";
import {Team} from "../../models/Team";
import {Sportsman} from "../../models/Sportsman";

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

  currentTeam = {} as Team;
  newSportsman = {} as Sportsman;
  editSportsman = {} as Sportsman;

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
        if (this.currentTeam.id != undefined) {
          this.selectItem(this.currentTeam.id!)
        }
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
        this.currentTeam.id = team.id;
        this.currentTeam.name = team.name;
        this.currentTeam.count = team.count;
        this.selectedSport = res.name!;
        this.sportsmen = team['sportsmen'];

        console.log(this.sportsmen)
      },
      error: (e) => {
      }
    });
  }

  createTeam() {
    const data = {
      name: this.currentTeam.name?.toLowerCase(),
      count: this.currentTeam.count,
    };
    if (this.selectedSport != undefined) {
      this.sportService.createTeam(this.getSelectedSport(this.selectedSport)!, data)
        .subscribe({
          next: (res) => {
            this.currentTeam = res;
            this.retrieve();
          },
          error: (e) => {
            e.status === 400 ? confirm('Количество участников должно быть числом') : confirm('Команда с таким названием уже существует')
          }
        });
    } else {
      confirm('Вид спорта не выбран')
    }
  }

  createSportsman() {
    if (this.currentTeam.id != undefined) {
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
          confirm('Спортсмен с такими паспортными данными уже существует')
        }
      });
    } else {
      confirm('Вид спорта не выбран!')
    }
  }

  deleteTeam(id: number) {
    if (confirm('Вы уверены, что хотите удалить?')) {
      this.teamService.deleteTeam(id).subscribe({
        next: (res) => {
          this.retrieve();
          this.clean();
        },
        error: (e) => {
          confirm('Удаление не удалось')
        }
      });
    }
  }

  deleteSportsman(id: number) {
    if (confirm('Вы уверены, что хотите удалить?')) {
      this.sportService.deleteSportsman(id).subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }

  editTeam() {
    this.sportService.updateTeam(this.getSelectedSport(this.selectedSport)!, this.currentTeam.id!, this.currentTeam).subscribe({
      next: (data) => {
        this.retrieve();
        confirm('Редактирование успешно. Команда будет перезаписана в конец списка')
      },
      error: (e) => {
        e.status === 400 ? confirm('Количество участников должно быть числом') : confirm('Команда с таким названием уже существует')
      }
    });
  }

  updateSportsman(id: number) {
    this.editSportsman.passport = (document.getElementById("passport" + id) as HTMLInputElement).value;
    this.editSportsman.firstName = (document.getElementById("firstName" + id) as HTMLInputElement).value;
    this.editSportsman.lastName = (document.getElementById("lastName" + id) as HTMLInputElement).value;
    this.editSportsman.middleName = (document.getElementById("middleName" + id) as HTMLInputElement).value;
    this.editSportsman.birthdate = new Date((document.getElementById("birthdate" + id) as HTMLInputElement).value);
    this.editSportsman.team_id = Number((document.getElementById("team_selector_" + id) as HTMLInputElement).value);

    this.teamService.updateSportsman(this.editSportsman.team_id!, id, this.editSportsman)
      .subscribe({
        next: (res) => {
          this.retrieve();
          confirm('Редактирование успешно. Спортсмен будет перезаписан в конец списка')
        },
        error: (e) => {
          confirm('Редактирование не удалось. \nСпортсмен с такими паспортными данными уже существует')
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

  private clean(): void {
    this.currentTeam = {} as Team;
    this.teams = [];
    this.sportsmen = [];
    this.selectedSport = '';
  }

  getTeamBySportsmanID() {
    let team_id = this.currentTeam.id!;
    let team = this.teams.find(function (item) {
      return item.id == team_id;
    })!;
    return team.name
  }
}
