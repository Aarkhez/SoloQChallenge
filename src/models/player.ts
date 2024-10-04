export default class New {
    idLol: string;
    id: number;
    name: string;
    pseudo: string;
    tag: string;
    team: string;
    twitch: string;
    opgg: string;


  
    constructor(
        idLol: string = "",
        id: number = 0,
        name: string = "",
        pseudo: string = "",
        tag: string = "",
        team: string = "",
        twitch: string = "",
        opgg: string = ""

    ) {
        this.idLol = idLol;
        this.id = id;
        this.name = name;
        this.pseudo = pseudo;
        this.tag = tag;
        this.team = team;
        this.twitch = twitch;
        this.opgg = opgg;
    }
  }
  