export class matchesModel {
    week!: number;
    matches!: matches[];
}

export class matches extends matchesModel {
    home!: number;
    homeScore!:number;
    away!: number;
    homeName!:string;
    awayName!:string;
    awayScore!:number;
}
