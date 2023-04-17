import {Component} from '@angular/core';
import {SportService} from "../../services/sport-service/sport.service";
import {Sport} from "../../models/Sport";
import {Team} from "../../models/Team";
import {Sportsman} from "../../models/Sportsman";

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
    birthdate: new Date()
  }

  editTeam = {} as Team;
  editSportsman = {} as Sportsman;

  constructor(private sportService: SportService) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve(): void {
    this.sportService.getAll().subscribe({
      next: (data) => {
        this.sports = data;
        this.selectItem(this.currentSport.id!)
        this.newTeam = {} as Team;
        this.newSportsman = {} as Sportsman;
      }, error: (e) => {
        console.log(e);
      }
    });
  }

  selectItem(id: number) {
    let sport = this.sports.find(function (item) {
      return item.id == id;
    })!;

    this.currentSport = {} as Sport;
    this.currentSport.id = sport.id;
    this.currentSport.name = sport.name;

    this.teams = sport['teams'];
    this.sportsmen = sport['sportsmen']
    this.setSelectedSport(this.teams);
    this.setSelectedSport(this.sportsmen);
  }

  createSport() {
    const data = {
      name: this.currentSport.name?.toLowerCase()
    };
    this.sportService.createSport(data)
      .subscribe({
        next: (res) => {
          this.currentSport = res;
          this.retrieve();
        },
        error: (e) => {
          confirm('Такой вид спорта уже существует')
        }
      });
  }

  createTeam() {
    if (!isNaN(Number(this.newTeam.count))) {
      if (this.currentSport.id != undefined) {
        this.sportService.createTeam(this.currentSport.id!, this.newTeam).subscribe({
          next: (res) => {
            this.retrieve();
            this.newTeam = {} as Team;
          },
          error: (e) => {
            confirm('Команда с таким названием уже существует')
          }
        });
      } else {
        confirm('Вид спорта не выбран!')
      }
    } else {
      confirm('Количество участников должно быть числом')
    }
  }

  createSportsman() {
    if (this.currentSport.id != undefined) {
      this.sportService.createSportsman(this.currentSport.id!, this.newSportsman).subscribe({
        next: (res) => {
          this.retrieve();
          this.newSportsman = new Sportsman();
        },
        error: (e) => {
          confirm('Создать спортсмена не удалось. \nСпортсмен с такими паспортными данными уже существует')
        }
      });
    } else {
      confirm('Вид спорта не выбран!')
    }
  }

  deleteSport(id: number) {
    if (confirm('Вы уверены, что хотите удалить?')) {
      this.sportService.deleteSport(id).subscribe({
        next: (res) => {
          this.retrieve();
          this.clean();
        },
        error: (e) => {
          confirm('Элемент не удалён. \nСтатус ошибки ' + e.status)
        }
      });
    }
  }

  deleteTeam(id: number) {
    if (confirm('Вы уверены, что хотите удалить?')) {
      this.sportService.deleteTeam(id).subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          confirm('Элемент не удалён. \nСтатус ошибки ' + e.status)
        }
      })
    }
  }

  deleteSportsman(id: number) {
    if (confirm('Вы уверены, что хотите удалить?')) {
      this.sportService.deleteSportsman(id).subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          confirm('Элемент не удалён. \nСтатус ошибки ' + e.status)
        }
      })
    }
  }

  editSport() {
    if (this.currentSport.id != undefined) {
      this.sportService.updateSport(this.currentSport.id!, this.currentSport).subscribe({
        next: (data) => {
          this.retrieve();
          confirm('Редактирование успешно')
        },
        error: (e) => {
          confirm('Такой вид спорта уже существует')
        }
      });
    } else {
      confirm('Невозможно редактировать несуществующий спорт')
    }
  }

  updateTeam(id: number) {
    this.editTeam.name = (document.getElementById("teamname" + id) as HTMLInputElement).value;

    let count = (document.getElementById("count" + id) as HTMLInputElement).value
    if (!isNaN(Number(count))) {
      this.editTeam.count = Number(count);
      this.editTeam.sport_id = Number((document.getElementById("t_sport_selector_" + id) as HTMLInputElement).value);

      this.sportService.updateTeam(this.editTeam.sport_id!, id, this.editTeam)
        .subscribe({
          next: (res) => {
            this.retrieve();
            confirm('Редактирование успешно')
          },
          error: (e) => {
            confirm('Команда с таким названием уже существует')
          }
        });
    } else {
      confirm('Количество участников должно быть числом')
    }
  }

  updateSportsman(id: number) {
    this.editSportsman.passport = (document.getElementById("passport" + id) as HTMLInputElement).value;
    this.editSportsman.firstName = (document.getElementById("firstName" + id) as HTMLInputElement).value;
    this.editSportsman.lastName = (document.getElementById("lastName" + id) as HTMLInputElement).value;
    this.editSportsman.middleName = (document.getElementById("middleName" + id) as HTMLInputElement).value;
    this.editSportsman.birthdate = new Date((document.getElementById("birthdate" + id) as HTMLInputElement).value);
    this.editSportsman.sport_id = Number((document.getElementById("sport_selector_" + id) as HTMLInputElement).value);

    this.sportService.updateSportsman(this.editSportsman.sport_id!, id, this.editSportsman)
      .subscribe({
        next: (res) => {
          this.retrieve();
          confirm('Редактирование успешно. Спортсмен отобразится в конце списка')
        },
        error: (e) => {
          confirm('Спортсмен с такими пасспортными данными уже существует. \nПроверьте правильность написания данных')
        }
      });
  }

  getSelectedSport(selector: string) {
    let sport = this.sports.find(function (item) {
      return item.name == selector;
    })!;
    return sport.id;
  }

  setSelectedSport(list: any) {
    for (var t in list) {
      list[t].selectedSport = this.currentSport.name;
    }
  }

  private clean(): void {
    this.teams = [];
    this.sportsmen = [];
  }

  getSportByChildID() {
    let sport_id = this.currentSport.id!
    let sport = this.sports.find(function (item) {
      return item.id == sport_id;
    })!;
    return sport.name;
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  //(keypress)="keyPressNumbers($event)"
}
