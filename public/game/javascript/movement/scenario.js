const DIRECTION = {
	TOP: {y: -1, x: 0, move: "MOVE_TOP"},
	DOWN: {y: 1, x: 0, move: "MOVE_DOWN"},
	RIGHT: {y: 0, x: 1, move: "MOVE_RIGHT"},
	LEFT:  {y: 0, x: -1, move: "MOVE_LEFT"}
}

export class Scenario {// ré implementer le not wantedDir, propre à chaque scenario (un scenario qui se lance en move right, not wanted left CQFD tmtc)
	constructor(startPoint, deplacementField, endPoint, movement, results, scenarios, history = new Array(), route = new Array()) {
		this.state = {startPoint, deplacementField, endPoint, movement, history, position: startPoint};
		this.route = route;
		this.scenarios = scenarios;
		this.results = results;
		this.statut = "running";	
	}

	move = () => {
		this.direction = this.getDirection();
		this.bindNewScenarios(this.direction);
		if(this.moveIsPossible(this.direction)) {
			this.state.history.push({y: this.state.position.y, x: this.state.position.x});
			this.state.position = {y: (this.state.position.y + this.direction.y), x: (this.state.position.x + this.direction.x)};
			this.route.push(this.direction.move);
			this.state.movement--;
			if(this.state.position.y === this.state.endPoint.y && this.state.position.x === this.state.endPoint.x) {
				this.results.push(this);
				this.statut = 'success';
			}
			else if(!this.reachablePosition()) this.statut = "echec";
			else this.statut = "running";
		}
		else this.statut = "echec";
	}

	bindNewScenarios = (nextDirection) => {
		for (let dir in DIRECTION) {
			if (this.moveIsPossible(DIRECTION[dir])) {
				if(nextDirection != DIRECTION[dir] && this.notInScenario(DIRECTION[dir])) {
					let position = {y: (this.state.position.y + DIRECTION[dir].y), x:(this.state.position.x + DIRECTION[dir].x)},
						history = this.copyArray(this.state.history),
						route = this.copyArray(this.route),
						movement = this.state.movement - 1;
					history.push(this.state.position);
					route.push(DIRECTION[dir].move);
					let newScenario = new Scenario(
						position, 
						this.state.deplacementField, 
						this.state.endPoint,
						movement,
						this.results,
						this.scenarios,
						history,
						route,
					);
					if (newScenario.reachablePosition()) {
						this.scenarios.push(newScenario);
					}
				}
			};
		};
	}

	getDirection = () => {
		if (Math.abs(this.state.endPoint.y - this.state.position.y) > Math.abs(this.state.endPoint.x - this.state.position.x))
			return (this.state.endPoint.y < this.state.position.y)?  DIRECTION.TOP: DIRECTION.DOWN;
		else 
			return (this.state.endPoint.x < this.state.position.x)? DIRECTION.LEFT: DIRECTION.RIGHT;
	}

	moveIsPossible = (direction) => {
		return (this.inField(direction)
			&& this.state.deplacementField[this.state.position.y + direction.y][this.state.position.x + direction.x] 
				&& this.notInHistory(direction))? 
		true: false;
	}

	notInScenario = direction => {
		let that = this;
		if (this.scenarios.find(scenario => (scenario.state.position.y === (that.state.position.y + direction.y)) && (scenario.state.position.x === (that.state.position.x + direction.x)))) 
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

	reachablePosition = () => {
		let remainingMoves = Math.abs(this.state.endPoint.y - this.state.position.y) + Math.abs(this.state.endPoint.x - this.state.position.x);
		return (remainingMoves > this.state.movement)? false: true;
	}

	copyArray = array => {
		let newArray = new Array();
		for (let i = 0, l = array.length; i < l; i++) newArray[i] = array[i];
		return newArray;
	}
}