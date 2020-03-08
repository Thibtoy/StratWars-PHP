import {Impulse} from './Impulse.js';

const DIRECTION = {
	TOP: {y: -1, x: 0, move: "MOVE_TOP"},
	DOWN: {y: 1, x: 0, move: "MOVE_DOWN"},
	RIGHT: {y: 0, x: 1, move: "MOVE_RIGHT"},
	LEFT:  {y: 0, x: -1, move: "MOVE_LEFT"}
}

export class Wayve {
	constructor(position, move, map) {
		this.state = {position, map, move};
		this.ways = new Array();
		this.reachable = new Object();
		this.statut = "run";
		for (let dir in DIRECTION) {
			if (this.moveIsPossible(DIRECTION[dir])) {
				let way = new Impulse(this.state, DIRECTION[dir], this.reachable);
				way.impulseList.push(way);
				way.impulse();
				this.ways.push(way);
			}
		}
		this.run();
	}

	run = () => {
		while (this.statut != 'end') {
			let end = true;
			this.ways.forEach(way => {
				for (let i = 0, l = way.impulseList.length; i < l; i++) {
					if (way.impulseList[i].statut != 'end') {
						way.impulseList[i].impulse();
						end = false;
					}
				}
			});
			if (end) this.statut = 'end';
		}
	}

	moveIsPossible = direction => {//il faut gérer les déplacements 1 à 1, les scenarios se bloquent mutuellement
		if (this.state.map.battleField.field[this.state.position.y + direction.y][this.state.position.x + direction.x] != "09")
			return true;
		else return false;
	}

	bestWay = wantedPos => {
		let scenarios = this.reachable[wantedPos.y+'$'+wantedPos.x];
		let bestWay = false;
		let bestWays = new Array();
		let roadSommary = new Array();
		for (let i = 0, l = scenarios.length; i < l; i++) {
			bestWay = (!bestWay)? scenarios[i] : ((scenarios[i].move > bestWay.move)? scenarios[i] : bestWay);
		}
		bestWays.push(bestWay);
		for (let i = 0, l = scenarios.length; i < l; i++) {
			if (scenarios[i].move === bestWay.move) bestWays.push(scenarios[i]);
		}
		bestWays.forEach((way, i) => {
			let changes = 0;
			let lastMove = false;
			for (let i = 0, l = way.route.length; i < l; i++) {
				if (lastMove && way.route[i] != lastMove) changes++;
				lastMove = way.route[i];
			}
			roadSommary.push({i, changes});
		});
		let best = -1;
		for (let i = 0, l = roadSommary.length; i < l; i++) {
			best = (best === -1)? roadSommary[i] : ((roadSommary[i].changes > best.changes)? roadSommary[i] : best);
		}
		bestWay = bestWays[best.i];
		return bestWay.route;
	}
}