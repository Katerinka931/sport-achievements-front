import {Component} from '@angular/core';
import {Sportsman} from "../../models/sportsman-model/sportsman.model";
import {Achievement} from "../../models/achievement-model/achievement.model";
import {Contact} from "../../models/contact-model/contact.model";
import {SportsmanService} from "../../services/sportsman-service/sportsman.service";
import {Team} from "../../models/team-model/team.model";
import {Sport} from "../../models/sport-model/sport.model";
import {SportService} from "../../services/sport-service/sport.service";
import {TeamService} from "../../services/team-service/team.service";

@Component({
  selector: 'app-edit-sportsman',
  templateUrl: './edit-sportsman.component.html',
  styleUrls: ['./edit-sportsman.component.css']
})
export class EditSportsmanComponent {
  teams: Team[];
  sports: Sport[];
  sportsmen: Sportsman[];
  achievements: Achievement[];
  contacts: Contact[];

  selectedSport: string;
  selectedTeam: string;

  currentSportsman: Sportsman = {
    passport: '',
    lastName: '',
    firstName: '',
    middleName: '',
    birthdate: new Date()
  }
  newContact: Contact = {
    phone: '',
    email: ''
  };
  newAchievement: Achievement = {
    name: '',
    recvDate: new Date()
  };
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

  getSportBySportsman() {
    this.sportsmanService.getSportBySportsman(this.currentSportsman.id!).subscribe({
      next: (res) => {
        this.selectedSport = res.name!;
      },
      error: (e) => {
      }
    });
  }

  selectItem(id: number) {
    let sportsman = this.sportsmen.find(function (item) {
      return item.id == id;
    })!;

    this.currentSportsman = new Sportsman();
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
        if(res != null) {
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
          if(res != null) {
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

  deleteSportsman(id: number) {
    this.sportsmanService.deleteSportsman(id).subscribe({
      next: (res) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    });
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
            this.retrieve();
          },
          error: (e) => {
            console.error(e);
          }
        });
    } else {
      this.sportService.createSportsman(this.getSelectedSport(this.selectedSport)!, data)
        .subscribe({
          next: (res) => {
            this.retrieve();
          },
          error: (e) => {
            console.error(e);
          }
        });
    }
  }

  editSportsman() {
    if (this.isChecked) {
      this.teamService.updateSportsman(this.getSelectedTeam(this.selectedTeam)!, this.currentSportsman.id!,this.currentSportsman)
        .subscribe({
          next: (res) => {
            this.retrieve();
          },
          error: (e) => {
            console.error(e);
          }
        });
    } else {
      this.sportService.updateSportsman(this.getSelectedSport(this.selectedSport)!, this.currentSportsman.id!,this.currentSportsman)
        .subscribe({
          next: (res) => {
            this.retrieve();
            console.log('retr')
          },
          error: (e) => {
            console.error(e);
          }
        });
    }
  }

  updateContact(id: number) {
    let phone = document.getElementById("phone" + id)!['value'];
    let email = document.getElementById("email" + id)!['value'];

    const data = {
      phone: phone,
      email: email,
    };

    this.sportsmanService.updateContact(this.currentSportsman.id!, id, data)
      .subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  deleteContact(id: number) {
    this.sportsmanService.deleteContact(id).subscribe({
      next: (res) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  createContact() {
    const data = {
      phone: this.newContact.phone,
      email: this.newContact.email,
    };

    this.sportsmanService.createContact(this.currentSportsman.id!, data).subscribe({
      next: (res) => {
        this.retrieve();
        this.newContact = new Contact();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  updateAchievement(id: number) {
    let name = document.getElementById("name" + id)!['value'];
    let recvDate = document.getElementById("recvDate" + id)!['value'];

    const data = {
      name: name,
      recvDate: recvDate,
    };

    this.sportsmanService.updateAchievement(this.currentSportsman.id!, id, data)
      .subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  deleteAchievement(id: number) {
    this.sportsmanService.deleteAchievement(id).subscribe({
      next: (res) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  createAchievement() {
    const data = {
      name: this.newAchievement.name,
      recvDate: this.newAchievement.recvDate
    };

    this.sportsmanService.createAchievement(this.currentSportsman.id!, data).subscribe({
      next: (res) => {
        this.retrieve();
        this.newAchievement = new Achievement();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
}
