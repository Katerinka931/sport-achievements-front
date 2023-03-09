import { Component, OnInit } from '@angular/core';
import {SportService} from "../../services/sport-service/sport.service";
import {Sport} from "../../models/sport-model/sport.model";

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.css']
})
export class SportsListComponent implements OnInit {

  private sports?: Sport[];

  constructor(private sportService: SportService) { }

  ngOnInit(): void {
    console.log('init');
    this.retrieve();
  }

  private retrieve(): void {
    this.sportService.getAll().subscribe({
      next: (data) => {
       console.log(data);
      }
    });
  }

}
