const DIRECTION = {
	TOP: {y: -1, x: 0, move: "MOVE_TOP"},
	DOWN: {y: 1, x: 0, move: "MOVE_DOWN"},
	RIGHT: {y: 0, x: 1, move: "MOVE_RIGHT"},
	LEFT:  {y: 0, x: -1, move: "MOVE_LEFT"}
}

export class Impulse {
	constructor(state, direction, reachable, impulseList = new Array(), history = new Array(), route = new Array()) {
		this.position = {y: (state.position.y + direction.y), x: (state.position.x + direction.x)};
		this.move = state.move - 1;
		this.map = state.map;
		this.reachable = reachable;
		this.impulseList = impulseList;
		this.history = history;
		this.route = route;
		this.statut = 'run';
		this.history.push({y: state.position.y, x: state.position.x});
		this.route.push(direction.move);
		if (!this.reachable[this.position.y+'$'+this.position.x]) 
			this.reachable[this.position.y+'$'+this.position.x] = new Array();
		this.reachable[this.position.y+'$'+this.position.x].push({move: this.move, route: this.route});
	}

	impulse = () => {
		let that = this;
		for (let dir in DIRECTION) {
			if(this.moveIsPossible(DIRECTION[dir])) {				
				let	route = this.copyArray(this.route),
					history = this.copyArray(this.history),
					state = {
						position: this.position,
						move: this.move,
						map: this.map
					};
				this.impulseList.push(new Impulse (state, DIRECTION[dir], this.reachable, this.impulseList, history, route));
			}
		}
		this.statut = 'end';
	}

	moveIsPossible = direction => {
		if (this.move > 0
			&& this.inField(direction)
				&& this.notInHistory(direction)
					 	//&& this.notInImpulseList(direction)
			  				&& (!this.reachable[(this.position.y + direction.y)+'$'+(this.position.x + direction.x)] || this.goodWay(direction))
			  					&& this.map.battleField.field[this.position.y + direction.y][this.position.x + direction.x] != "09"
		)
			return true;
		else return false;
	}

	goodWay = direction => {
		let scenarios = this.reachable[(this.position.y + direction.y)+'$'+(this.position.x + direction.x)];
		for (let i = 0, l = scenarios.length; i < l; i++) {
			if(this.move >= scenarios[i].move) return true;
		}
		
	}

	inField = direction => {
		let dirY = this.position.y + direction.y,
			dirX = this.position.x + direction.x;
		if (dirY >= 0 && dirX >= 0 && dirY < this.map.battleField.field.length && dirX < this.map.battleField.field[0].length) return true;
		else return false;
	}

	notInHistory = direction => {
		let that = this;
		if (this.history.find(position => (position.y === (that.position.y + direction.y)) && (position.x === (that.position.x + direction.x))))
			return false;
		else return true;
	}

	notInImpulseList = direction => {
		let that = this,
			nextPosition = {y: (that.position.y + direction.y), x: (that.position.x + direction.x)};
		if (that.impulseList.find(position => (position.y === nextPosition.y && position.x === nextPosition.x)))
			return false;
		else return true;
	}

	copyArray = array => {
		let newArray = new Array();
		for (let i = 0, l = array.length; i < l; i++) newArray[i] = array[i];
		return newArray;
	}
}