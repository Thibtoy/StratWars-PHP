import {Scenario} from './scenario.js';

export class PathFinder {
	constructor(startPoint, deplacementField, endPoint, move) {
		this.state = {startPoint, deplacementField, endPoint, move, position: startPoint}
		this.results = new Array();
		this.scenarios = new Array();
		this.scenarios.push(new Scenario(
			this.state.startPoint, 
			this.state.deplacementField, 
			this.state.endPoint, 
			this.state.move, 
			this.results,
			this.scenarios,
		));
	}

	run = () => {
		while (this.statut != 'end') {
			let end = true;
			if (this.results.length > 0) this.remainingMoves = this.getBestWay().state.movement;
			for (let i = 0, l = this.scenarios.length; i < l; i++) {
				if (this.scenarios[i].statut === "running") {
					if (this.remainingMoves && this.scenarios[i].state.movement < this.remainingMoves) this.scenarios[i].statut = "echec";
					else end = false;
					this.scenarios[i].move();
				}
			}
			if (end) this.statut = "end";
		}
	}

	getBestWay = () => {
		let bestWay = false;
		for (let i = 0, l = this.results.length; i < l; i++) {
			bestWay = (!bestWay)? this.results[i]: bestWay;
			bestWay = (this.results[i].state.movement > bestWay.state.movement)? this.results[i]: bestWay; 
		}
		return bestWay;
	}
}