import { Component } from '@angular/core';
import teamsData from '../assets/teams-data.json';
import matchData from '../assets/match-data.json';
import { teamsModel } from './Models/Teams';
import { matchesModel } from './Models/Matches';
import { filter, from, Observable, of } from 'rxjs';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'leauge';
  teams: teamsModel[] = [];
  matches: matchesModel[] = [];
  week: number = 1;

  

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getTeamsData();
    this.getMatchOfWeek();
    console.log(this.teams)
    console.log(this.matches)
  }
  getMatchOfWeek() {

    from(matchData).pipe(filter((x: any) => x.week == this.week)).subscribe(
      {
        next: (response) => this.matches = [response],
        error: (e) => console.error(e),
        complete: console.info
      }
    )


  }

  getTeamsData() {
    of(teamsData).subscribe(
      {
        next: (response) => this.teams = response,
        error: (e) => console.error(e),
        complete: console.info
      }
    )
  }
}
