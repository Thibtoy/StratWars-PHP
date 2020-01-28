const DIRECTION = {
	TOP: {y: -1, x: 0, mouve: "MOUVE_TOP"},
	DOWN: {y: 1, x: 0, mouve: "MOUVE_DOWN"},
	RIGHT: {y: 0, x: 1, mouve: "MOUVE_RIGHT"},
	LEFT:  {y: 0, x: -1, mouve: "MOUVE_LEFT"}
}

export class Scenario {
	constructor(startPoint, deplacementField, endPoint, mouvement, scenarios, results, history = new Array(), route = new Array()) {
		this.state = {startPoint, deplacementField, endPoint, mouvement, history, position: startPoint};
		this.route = route;
		this.scenarios = scenarios;
		this.results = results;
		this.notWantedDir = this.getNotWantedDirection(this.getDirection());
		this.secondNotWantedDir;
		this.statut = "running";		
		while (this.statut === "running") {
			this.mouve();
		}
	}

	mouve = () => {
		this.direction = this.getDirection();
		this.bindNewScenarios(this.direction);
		if(this.mouveIsPossible(this.direction)) {
			this.state.history.push({y: this.state.position.y, x: this.state.position.x});
			this.state.position = {y: (this.state.position.y + this.direction.y), x: (this.state.position.x + this.direction.x)};
			this.route.push(this.direction.mouve);
			this.state.mouvement--;
			//this.secondNotWantedDir = this.getNotWantedDirection(this.direction);
			if(this.state.position.y === this.state.endPoint.y && this.state.position.x === this.state.endPoint.x) {
				this.results.push(this);
				this.statut = 'success';
			}
			else if(!this.reachablePosition()) this.statut = "echec";
			else this.statut = "running";
		}
		else this.statut = "echec";
	}

	getDirection = () => {
		if (Math.abs(this.state.endPoint.y - this.state.position.y) > Math.abs(this.state.endPoint.x - this.state.position.x))
			return (this.state.endPoint.y < this.state.position.y)?  DIRECTION.TOP: DIRECTION.DOWN;
		else 
			return (this.state.endPoint.x < this.state.position.x)? DIRECTION.LEFT: DIRECTION.RIGHT;
	}

	mouveIsPossible = (direction) => {
		return (this.inField(direction)
			&& this.state.deplacementField[this.state.position.y + direction.y][this.state.position.x + direction.x] 
			//&& direction.mouve != this.notWantedDir 
				&& this.notInHistory(direction))? 
		true: false;
	}

	bindNewScenarios = (nextDirection) => {
		for (let dir in DIRECTION) {
			if (this.mouveIsPossible(DIRECTION[dir])) {
				if(nextDirection != DIRECTION[dir] && this.notInScenario(DIRECTION[dir])) {
					let position = {y: (this.state.position.y + DIRECTION[dir].y), x:(this.state.position.x + DIRECTION[dir].x)},
						history = this.copyArray(this.state.history),
						route = this.copyArray(this.route),
						mouvement = this.state.mouvement - 1;
					history.push(this.state.position);
					route.push(DIRECTION[dir].mouve);
					this.scenarios.push(
						new Scenario(
							position, 
							this.state.deplacementField, 
							this.state.endPoint,
							mouvement,
							this.scenarios,
							this.results,
							history,
							route
						)
					);
				}
			};
		};
	}

	copyArray = array => {
		let newArray = new Array();
		for (let i = 0, l = array.length; i < l; i++) newArray[i] = array[i];
		return newArray;
	}

	notInScenario = direction => {
		let that = this;
		if (this.scenarios.find(scenario => (scenario.state.startPoint.y === (that.state.position.y + direction.y)) && (scenario.state.startPoint.x === (that.state.position.x + direction.x)))) 
			return false;
		else return true;
	}

	inField = direction => {
		let dirY = this.state.position.y + direction.y,
			dirX = this.state.position.x + direction.x;
		if (dirY >= 0 && dirX >= 0 && dirY < this.state.deplacementField.length && dirX < this.state.deplacementField[0].length) return true;
		else return false;
	}

	notInHistory = direction => {
		let that = this;
		if (this.state.history.find(position => (position.y === (that.state.position.y + direction.y)) && (position.x === (that.state.position.x + direction.x))))
			return false;
		else return true;
	}

	getNotWantedDirection = direction => {
		switch (direction) {
			case DIRECTION.TOP: return DIRECTION.DOWN.mouve;
			case DIRECTION.DOWN: return DIRECTION.TOP.mouve;
			case DIRECTION.LEFT: return DIRECTION.RIGHT.mouve;
			case DIRECTION.RIGHT: return DIRECTION.LEFT.mouve;
			default: break;
		}
	}

	reachablePosition = () => {
		let remainingMouves = Math.abs(this.state.endPoint.y - this.state.position.y) + Math.abs(this.state.endPoint.x - this.state.position.x);
		return (remainingMouves > this.state.mouvement)? false: true;
	}

	launchNewScenarios = () => {
		for (let i = 0, l = this.newScenarios.length; i < l; i++) {
			let scenario = this.newScenarios[i];
			this.newScenarios[i] = new Scenario(scenario.position, scenario.deplacementField, this.state.endPoint, scenario.mouvement, scenario.history, scenario.route, this.results);
		}
	}
}