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

    this.currentSportsman = new Sportsman();
    this.currentSportsman.id = sportsman.id;
    this.currentSportsman.passport = sportsman.passport;
    this.currentSportsman.lastName = sportsman.lastName;
    this.currentSportsman.firstName = sportsman.firstName;
    this.currentSportsman.middleName = sportsman.middleName;
    this.currentSportsman.birthdate = sportsman.birthdate;

    // this.selected = this.currentSport.name!;

    this.achievements = sportsman['achievements'];
    this.contacts = sportsman['contacts'];
    // this.setSelectedSport(this.teams);
    // this.setSelectedSport(this.sportsmen);
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
    this.sportsmanService.createSportsman(data)
      .subscribe({
        next: (res) => {
          this.retrieve();
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  editSportsman() {
    this.sportsmanService.updateSportsman(this.currentSportsman.id!, this.currentSportsman).subscribe({
      next: (data) => {
        this.retrieve();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  updateContact(id: number) {

  }

  deleteContact(id: number) {

  }

  createContact() {

  }

  updateAchievement(number: number) {

  }
}
