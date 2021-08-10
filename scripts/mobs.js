
let mobs = [];

let max_hp = 250;

class Mob {
	constructor(t){
		this.pos = createVector(random(width - res), random(height - res));
		this.speed = Math.round(random(1, 2));
		this.setAngle();
		this.hp = Math.round(random(50, 200));
		if(t == undefined)
			this.team = Math.floor(random(0, teams.length));
		else
			this.team = t;
	}
	
	update(){
		this.pos.add(this.angle);
		
		mobs.forEach(m2 => {
			if(this != m2){
				let r = dist(this.pos.x, this.pos.y, m2.pos.x, m2.pos.y);
				if(r <= res/2){
					push();
					strokeWeight(16);
					noFill();
					if(this.team != m2.team){
						mobs_fight(this, m2);
						stroke(255, 0, 0);
					}else{
						this.hp += 5;
						m2.hp += 5;
						stroke(0, 255, 0);
					}
					point(this.pos.x, this.pos.y);
					pop();
				}
			}
		});
		
		if(this.pos.x <= 0 || this.pos.x + res >= width) this.angle.mult(-1);
		if(this.pos.y <= 0 || this.pos.y + res >= height) this.angle.mult(-1);
		
		if(this.hp > max_hp) this.hp = max_hp;
	}
	
	setAngle(){
		let a = Math.round(random(3));
		if(a == 0) this.angle = createVector(0, -1);
		else if(a == 1) this.angle = createVector(1, 0);
		else if(a == 2) this.angle = createVector(0, 1);
		else if(a == 3) this.angle = createVector(-1, 0);
		else console.log("BŁĘDNY OBRÓT >> " + a);
		this.angle.mult(this.speed);
	}
	
	draw(){
		push();
		fill(map(this.hp, 0, max_hp, 0, 255));
		stroke(teams[this.team].r, teams[this.team].g, teams[this.team].b);
		rectMode(CENTER);
		rect(this.pos.x, this.pos.y, res, res);
		pop();
	}
}

function mobs_fight(a, b){
	if(a.hp > b.hp){
		a.hp -= b.hp;
		mobs.splice(mobs.indexOf(b), 1);
		a.setAngle();
		mobs.push(new Mob(a.team));
	}
	else if(b.hp > a.hp){
		b.hp -= a.hp;
		mobs.splice(mobs.indexOf(a), 1);
		b.setAngle();
		mobs.push(new Mob(b.team));
	}
	else {
		if(random(1) < 0.5){
			a.hp = 1;
			mobs.splice(mobs.indexOf(b), 1);
			a.setAngle();
			mobs.push(new Mob(a.team));
		}
		else if(random(1) > 0.5){
			b.hp = 1;
			mobs.splice(mobs.indexOf(a), 1);
			b.setAngle();
			mobs.push(new Mob(b.team));
		}
		else {
			a.hp = 1;
			b.hp = 1;
			a.setAngle();
			b.setAngle();
			mobs.push(new Mob(a.team));
			mobs.push(new Mob(b.team));
		}
	}
}











