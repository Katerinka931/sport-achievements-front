import {Sport} from "../sport-model/sport.model";

export class Team {
  id?: number;
  name?: string;
  count?: number;

  teamsSport?: Sport;

  selectedSport?: Sport;
}
