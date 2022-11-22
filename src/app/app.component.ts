import { Component } from '@angular/core';
import teamsData from '../assets/teams-data.json';
import matchData from '../assets/match-data.json';
import { teamsModel } from './Models/Teams';
import { matchesModel } from './Models/Matches';
import { filter, from, Observable, of } from 'rxjs';
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
  games: any = [];
  champion: string = ""
  prediction: any = [];
  total_point: number = 0;

  ngOnInit() {
    this.getTeamsData();
    this.getMatchOfWeek();
    this.playWeek();
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

  playWeek() {
    this.matches[0].matches.forEach(element => {
      const t1 = this.teams.find(x => x.id == element.home)
      const t2 = this.teams.find(x => x.id == element.away)
      const t1Goals = Math.floor(Math.random() * 5);
      const t2Goals = Math.floor(Math.random() * 5);

      if (t1Goals > t2Goals) {
        t1!.average += t1Goals - t2Goals;
        t2!.average += t2Goals - t1Goals;
        t1!.point += 3;
        t1!.played_games += 1;
        t2!.played_games += 1;
        t1!.won_games += 1;
        t2!.lose_games += 1;
        t1!.goal_scored = +t1!.goal_scored + t1Goals;
        t2!.goal_scored += t2Goals;
        t1!.goal_conceded += t2Goals;
        t2!.goal_conceded += t1Goals;
      }
      else if (t1Goals == t2Goals) {
        t1!.point += 1;
        t2!.point += 1;
        t1!.draw_games += 1;
        t2!.draw_games += 1;
        t1!.played_games += 1;
        t2!.played_games += 1;
        t1!.goal_scored += t1Goals;
        t2!.goal_scored += t2Goals;
        t1!.goal_conceded += t2Goals;
        t2!.goal_conceded += t1Goals;
      } else {
        t1!.average += t1Goals - t2Goals;
        t2!.average += t2Goals - t1Goals;
        t2!.point += 3;
        t1!.played_games += 1;
        t2!.played_games += 1;
        t2!.won_games += 1;
        t1!.lose_games += 1;
        t1!.goal_scored += t1Goals;
        t2!.goal_scored += t2Goals;
        t1!.goal_conceded += t2Goals;
        t2!.goal_conceded += t1Goals;
      }
      element.homeScore = t1Goals;
      element.awayScore = t2Goals;
    });

    this.teams = this.teams.sort((a, b) => a.name.toString().localeCompare(b.name.toString()))
    this.teams = this.teams.sort((a, b) => b.point == a.point ? b.point - a.point : a.average == b.average ? a.name.toString().localeCompare(b.name.toString()) && b.average - a.average && b.point - a.point : b.average - a.average && b.point - a.point);
    this.total_point = 0;
    this.teams.forEach(element => {
      this.total_point += element.point;
    })
    this.prediction = []
    this.teams.forEach(element => {
      this.prediction.push({ name: element.name, possibility: ((element.point / this.total_point) * 100).toFixed(2) });
    })
  }

  nextWeek() {
    this.week += 1;
    this.getMatchOfWeek()
    this.playWeek()
  }
  playAllMatches() {
    for (let index = 2; index < 7; index++) {
      this.week = index;
      this.getMatchOfWeek();
      this.playWeek();
    }
  }
  endLeague() {
    this.champion = this.teams[0].name;
    this.prediction = this.teams;
  }
}
