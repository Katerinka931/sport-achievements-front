import {Component, OnInit} from '@angular/core';
import {SportsmanService} from "../../services/sportsman-service/sportsman.service";
import {SportService} from "../../services/sport-service/sport.service";
import {TeamService} from "../../services/team-service/team.service";
import {Sport} from "../../models/Sport";
import {Team} from "../../models/Team";
import {Sportsman} from "../../models/Sportsman";
import {Contact} from "../../models/Contact";
import {Achievement} from "../../models/Achievement";

@Component({
  selector: 'app-edit-sportsman',
  templateUrl: './edit-sportsman.component.html',
  styleUrls: ['./edit-sportsman.component.css']
})
export class EditSportsmanComponent implements OnInit {
  teams: Team[];
  sports: Sport[];
  sportsmen: Sportsman[];
  achievements: Achievement[];
  contacts: Contact[];

  selectedSport: string;
  selectedTeam: string;

  currentSportsman = {} as Sportsman;

  newContact = {} as Contact;
  newAchievement = {} as Achievement;

  editContact = {} as Contact;
  editAchievement = {} as Achievement;

  isChecked: boolean;

  constructor(private sportsmanService: SportsmanService, private sportService: SportService, private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve(): void {
    this.retrieveSportsmen();
    this.retrieveSports();
    this.retrieveTeams();
  }

  private retrieveSportsmen(): void {
    this.sportsmanService.getAll().subscribe({
      next: (data) => {
        this.sportsmen = data;
        this.selectItem(this.currentSportsman.id!);
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

  private retrieveTeams(): void {
    this.teamService.getAll().subscribe({
      next: (data) => {
        this.teams = data;
      }, error: (e) => {
        console.log(e);
      }
    });
  }

  selectItem(id: number) {
    let sportsman = this.sportsmen.find(function (item) {
      return item.id == id;
    })!;

    this.currentSportsman.id = sportsman.id;
    this.currentSportsman.passport = sportsman.passport;
    this.currentSportsman.lastName = sportsman.lastName;
    this.currentSportsman.firstName = sportsman.firstName;
    this.currentSportsman.middleName = sportsman.middleName;
    this.currentSportsman.birthdate = sportsman.birthdate;
    this.achievements = sportsman['achievements'];
    this.contacts = sportsman['contacts'];

    this.sportsmanService.getTeamBySportsman(this.currentSportsman.id!).subscribe({
      next: (res) => {
        if (res != null) {
          this.selectedTeam = res.name!;
          this.isChecked = true;
        } else {
          this.isChecked = false
        }
      },
      error: (e) => {
      }
    });
    this.getSportBySportsman();
  }

  createSportsman() {
    const data = {
      passport: this.currentSportsman.passport,
      lastName: this.currentSportsman.lastName?.toLowerCase(),
      firstName: this.currentSportsman.firstName?.toLowerCase(),
      middleName: this.currentSportsman.middleName?.toLowerCase(),
      birthdate: this.currentSportsman.birthdate
    };

    if (this.isChecked) {
      this.teamService.createSportsman(this.getSelectedTeam(this.selectedTeam)!, data)
        .subscribe({
          next: (res) => {
            this.currentSportsman = res;
            this.retrieve();
          },
          error: (e) => {
            confirm('Не удалось создать спортсмена. \nСпортсмен с такими паспортными данными уже существует. ')
          }
        });
    } else {
      this.sportService.createSportsman(this.getSelectedSport(this.selectedSport)!, data)
        .subscribe({
          next: (res) => {
            this.currentSportsman = res;
            this.retrieve();
          },
          error: (e) => {
            confirm('Не удалось создать спортсмена. \nСпортсмен с такими паспортными данными уже существует. ')
          }
        });
    }
  }

  createContact() {
    this.sportsmanService.createContact(this.currentSportsman.id!, this.newContact).subscribe({
      next: (res) => {
        this.retrieve();
        this.newContact = {} as Contact;
      },
      error: (e) => {
        e.status == 400 ? confirm('Неправильно введен номер телефона') : confirm('Проверьте правильность введенных данных!')
      }
    });
  }

  createAchievement() {
    this.sportsmanService.createAchievement(this.currentSportsman.id!, this.newAchievement).subscribe({
      next: (res) => {
        this.retrieve();
        this.newAchievement = {} as Achievement;
      },
      error: (e) => {
        confirm('Не удалось создать достижение. Проверьте правильность введенных данных ')
      }
    });
  }

  deleteSportsman(id: number) {
    this.sportsmanService.deleteSportsman(id).subscribe({
      next: (res) => {
        this.retrieve();
        confirm('Удаление успешно')
      },
      error: (e) => {
        confirm('Удаление не удалось')
      }
    });
  }

  deleteContact(id: number) {
    this.sportsmanService.deleteContact(id).subscribe({
      next: (res) => {
        this.retrieve();
        confirm('Удаление успешно')
      },
      error: (e) => {
        confirm('Удаление не удалось')
      }
    })
  }

  deleteAchievement(id: number) {
    this.sportsmanService.deleteAchievement(id).subscribe({
      next: (res) => {
        this.retrieve();
        confirm('Удаление успешно')
      },
      error: (e) => {
        confirm('Удаление не удалось')
      }
    })
  }

  editSportsman() {
    if (this.isChecked) {
      this.teamService.updateSportsman(this.getSelectedTeam(this.selectedTeam)!, this.currentSportsman.id!, this.currentSportsman)
        .subscribe({
          next: (res) => {
            this.retrieve();
            confirm('Редактирование успешно. Спортсмен будет перезаписан в конец списка')
          },
          error: (e) => {
            confirm('Проверьте правильность введенных данных!')
          }
        });
    } else {
      this.sportService.updateSportsman(this.getSelectedSport(this.selectedSport)!, this.currentSportsman.id!, this.currentSportsman)
        .subscribe({
          next: (res) => {
            this.retrieve();
            confirm('Редактирование успешно. Спортсмен будет перезаписан в конец списка')
          },
          error: (e) => {
            confirm('Проверьте правильность введенных данных!')
          }
        });
    }
  }

  updateContact(id: number) {
    this.editContact.phone = (document.getElementById("phone" + id) as HTMLInputElement).value;
    this.editContact.email = (document.getElementById("email" + id) as HTMLInputElement).value;

    this.sportsmanService.updateContact(this.currentSportsman.id!, id, this.editContact)
      .subscribe({
        next: (res) => {
          this.retrieve();
          confirm('Редактирование успешно. Контакт будет перезаписан в конец списка')
        },
        error: (e) => {
          e.status == 400 ? confirm('Неправильно введен номер телефона') : confirm('Проверьте правильность введенных данных!')
        }
      });
  }

  updateAchievement(id: number) {
    this.editAchievement.name = (document.getElementById("name" + id) as HTMLInputElement).value;
    this.editAchievement.recvDate = new Date((document.getElementById("recvDate" + id) as HTMLInputElement).value);

    this.sportsmanService.updateAchievement(this.currentSportsman.id!, id, this.editAchievement)
      .subscribe({
        next: (res) => {
          this.retrieve();
          confirm('Редактирование успешно. Достижение будет перезаписано в конец списка')
        },
        error: (e) => {
          confirm('Проверьте правильность введенных данных!')
        }
      });
  }

  getSportBySportsman() {
    this.sportsmanService.getSportBySportsman(this.currentSportsman.id!).subscribe({
      next: (res) => {
        this.selectedSport = res.name!;
      },
      error: (e) => {
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

  check() {
    if (this.isChecked) {
      this.sportsmanService.getTeamBySportsman(this.currentSportsman.id!).subscribe({
        next: (res) => {
          if (res != null) {
            this.selectedTeam = res.name!;
          } else {
            this.selectedTeam = res;
          }
        },
        error: (e) => {
        }
      });
    } else {
      this.getSportBySportsman()
    }
  }
}
