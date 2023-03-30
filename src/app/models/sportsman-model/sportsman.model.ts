import {Sport} from "../sport-model/sport.model";
import {Team} from "../team-model/team.model";

export class Sportsman {
  id?: number;
  passport?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthdate?: Date;

  selectedSport?: Sport;
  selectedTeam?: Team;
}
