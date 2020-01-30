import {Scenario} from './scenario.js';

export class PathFinder {
	constructor(startPoint, deplacementField, endPoint, mouve) {
		this.state = {startPoint, deplacementField, endPoint, mouve, position: startPoint}
		this.results = new Array();
		this.scenarios = new Array();
	}

	run = () => {
		let scenario = new Scenario(
			this.state.startPoint, 
			this.state.deplacementField, 
			this.state.endPoint, 
			this.state.mouve, 
			this.results,
			this.scenarios,
		);
		this.scenarios.push(scenario);
		while (this.statut != 'end') {
			let end = true;
			for (let i = 0, l = this.scenarios.length; i < l; i++) {
				if (this.scenarios[i].statut === "running") {
					end = false;
					this.scenarios[i].run();
				}
			}
			if (end) this.statut = "end";
		}
	}

	getBestWay = () => {
		let bestWay = false;
		for (let i = 0, l = this.results.length; i < l; i++) {
			bestWay = (!bestWay)? this.results[i]: bestWay;
			bestWay = (this.results[i].state.mouvement > bestWay.state.mouvement)? this.results[i]: bestWay; 
		}
		return bestWay;
	}
}