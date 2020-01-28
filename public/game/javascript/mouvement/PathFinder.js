import {Scenario} from './scenario.js';

export class PathFinder {
	constructor(startPoint, deplacementField, endPoint, mouve) {
		this.state = {startPoint, deplacementField, endPoint, mouve}
		this.results = new Array();
		this.scenarios = new Array();
	}

	run = () => {
		this.scenarios.push(
			new Scenario(
				this.state.startPoint, 
				this.state.deplacementField, 
				this.state.endPoint, 
				this.state.mouve, 
				this.scenarios,
				this.results
			)
		);
	// 	while (this.statut != "end"){
	// 		this.handleScenarios();
	// 		if (currentScenarios.length === 0) this.statut = "end";
	// 		// if (this.statut === "running") {
				 
	// 		// 	this.statut = this.currentScenarios.mouve();
	// 		// }
	// 		// else if (this.statut.obstacle) {
	// 		// 	let notWantedDir = this.currentScenarios.getNotWantedDirection(this.statut.direction)
				 
	// 		// 	this.statut = "end";
	// 		// }
	// 		// switch (this.statut) {
	// 		// 	case "running":
	// 		// 		this.currentScenario = (!this.currentScenario)? 
	// 		// 			new Scenario(state.startPoint, state.deplacementField, state.endPoint, state.mouve) : this.currentScenario; 
	// 		// 		this.statut = this.currentScenario.mouve();
	// 		// 		break;

	// 		// 	case "obstacle":
	// 		// 		this.statut = "failled";
	// 		// 		break;

	// 		// 	default:
	// 		// 		this.statut = "success";
	// 		// 		break;
	// 		// }		
	// 	}
	}

	getBestWay = () => {
		let bestWay = false;
		for (let i = 0, l = this.results.length; i < l; i++) {
			bestWay = (!bestWay)? this.results[i]: bestWay;
			bestWay = (this.results[i].state.mouvement > bestWay.state.mouvement)? this.results[i]: bestWay; 
		}
		return bestWay;
	}

	handleScenarios = () => {
		let succeedIndexes = new Array();
		let failledIndexes = new Array();
		for (let i = this.currentScenarios.length - 1; i >= 0; i--) {
			switch (true) {
				case this.currentScenarios[i].statut === "success":
					let scenario = this.currentScenarios.splice(i, 1);
					this.succeedScenarios.push(scenario[0]);
					break;
				case this.currentScenarios[i].statut === "echec":
					this.currentScenarios.splice(i, 1);
					failledIndexes.push(i);
					break;
				case this.currentScenarios[i].statut.obstacle:
					let newScenarios = this.currentScenarios[i].bindOtherWay()
					break;
			}
		}
	}
}