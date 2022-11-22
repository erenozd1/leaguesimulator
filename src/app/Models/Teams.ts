export class teamsModel {
    id:number;
    name: string;
    code: string;
    point:number;
    played_games:number;
    won_games:number;
    lose_games:number;
    draw_games:number;
    average:number;
    goal_scored:number;
    goal_conceded:number;
    constructor(id:number, name: string, code: string,point:number,played_games:number,won_games:number,lose_games:number,draw_games:number,average:number,goal_scored:number,goal_conceded:number) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.point = point;
        this.played_games = played_games;
        this.lose_games = lose_games;
        this.average = average;
        this.won_games = won_games;
        this.draw_games = draw_games;
        this.goal_conceded = goal_conceded;
        this.goal_scored = goal_scored;
    }
}