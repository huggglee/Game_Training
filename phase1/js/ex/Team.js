class Team {
	constructor(name, wins=0, losses=0,pf=0,pa=0,ranking=0) {
		this.name = name;
		this.w = wins;
		this.l = losses;
        this.pf=pf;
        this.pa=pa;
		this.ranking=ranking;
	}

	winPercentage() {
		return this.w / (this.w + this.l);
	}

	gamesAhead(that) {
		return (this.w - this.l - that.w + that.l) / 2;
	}

	static playGame(winner, loser,pointW,pointL) {
		winner.w++;
		loser.l++;

        winner.pf+=pointW;
        winner.pa+=pointL;

        loser.pf+=pointL;
        loser.pa+=pointW;
	}

    static rank(arr){
        arr.sort((a,b) => b.winPercentage()-a.winPercentage());
		for(let i =0;i<arr.length;i++){
			arr[i].ranking=i+1;
		}
    }
}

// const team1=new Team ("ABC",10,3,123,30);
// const team2=new Team ("XYZ",3,10,30,123);

// Team.playGame(team1,team2,30,10);

// console.log(team1);
// console.log(team2);

let arr =[
	cal = new Team('California', 4, 3),
	uw = new Team ('Washington', 6, 2),
	ucLa = new Team ('UCLA', 2, 6),
	lsju = new Team('Leland Stanford Jr. University', 5, 3),
	wsu = new Team ('California', 7, 1),
	ua = new Team ('California', 4, 5),
	asu = new Team ('California', 4, 4),
	col = new Team ('Colorado', 5, 3),
	uo = new Team ('Oregon', 5, 3),
	osu = new Team ('Oregon State', 2, 6),
	usc = new Team ('Southern California', 4, 4),
	utah = new Team ('Utah', 6, 2),
]

Team.rank(arr);
console.log(arr);




