export default class New {
    idLol: string;
    id: number;
    name: string;
    pseudo: string;
    tag: string;
    team: string;


  
    constructor(
        idLol: string = "",
        id: number = 0,
        name: string = "",
        pseudo: string = "",
        tag: string = "",
        team: string = "",

    ) {
        this.idLol = idLol;
        this.id = id;
        this.name = name;
        this.pseudo = pseudo;
        this.tag = tag;
        this.team = team;
    }
  }
  