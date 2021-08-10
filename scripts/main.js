
let res = 10;

function setup() {
	createCanvas(res * 90, res * 90);
	sboard = new Scoreboard();
	
	restartGame();
	
	sboard.update();
	setInterval(() => sboard.update(), 500);
}

function draw() {
	background(224, 48);
	
	mobs.forEach(m => {
		m.update();
		m.draw();
	});
}

function restartGame(){
	mobs.splice(0, mobs.length);
	for(let a = 0; a < 100; a++) mobs.push(new Mob());
}

