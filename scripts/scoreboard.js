
let sboard;

class Scoreboard {
	constructor(){
		this.b = select('#board');
	}
	
	update(){
		let sum = new Array(4).fill(0);
		mobs.forEach(m => {
			sum[m.team]++;
		});
		
		this.b.html("");
		sum.forEach((val, i) => {
			this.b.html(this.b.html() + teams[i].name + ' :: ' + val + '<br>');
		});
		
		this.isEndOfGame(sum);
	}
	
	isEndOfGame(a){
		a.forEach((t1, i) => {
			let enemy_points = 0;
			a.forEach(t2 => {
				if(t1 != t2){
					enemy_points += t2;
				}
			});
			if(enemy_points == 0){
				alert(teams[i].name + ' wygrali!');
				restartGame();
			}
		});
	}
}



