export default class New {
    idLol: string;
    id: number;
    name: string;
    pseudo: string;
    tag: string;
    twitch: string;
    opgg: string;
    tier: string;
    rank: string;
    lp: string;
    wins: number;
    losses: number;
    lpAdjustment: number;


  
    constructor(
        idLol: string = "",
        id: number = 0,
        name: string = "",
        pseudo: string = "",
        tag: string = "",
        twitch: string = "",
        opgg: string = "",
        tier: string = "",
        rank: string = "",
        lp: string = "",
        wins: number = 0,
        losses: number = 0,
        lpAdjustment: number = 1,

    ) {
        this.idLol = idLol;
        this.id = id;
        this.name = name;
        this.pseudo = pseudo;
        this.tag = tag;
        this.twitch = twitch;
        this.opgg = opgg;
        this.tier = tier;
        this.rank = rank;
        this.lp = lp;
        this.wins = wins;
        this.losses = losses;
        this.lpAdjustment = lpAdjustment;
    }
  }
  