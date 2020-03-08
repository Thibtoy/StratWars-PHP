const DIRECTION = {
	TOP: {y: -1, x: 0, move: "MOVE_TOP"},
	DOWN: {y: 1, x: 0, move: "MOVE_DOWN"},
	RIGHT: {y: 0, x: 1, move: "MOVE_RIGHT"},
	LEFT:  {y: 0, x: -1, move: "MOVE_LEFT"}
}

export default class GuessBestWays {
	constructor(map, startPoint, move, moveTable) {
		this.run = true;
		this.positions = new Array();
		this.positions.push({
			y: startPoint.y,
			x: startPoint.x,
			cost: 0,
			road: new Array(),
			run: true,
		}) 
		this.state = {map, startPoint, move, moveTable};
		this.mouve();
	}

	mouve = () => {
		while (this.run) {
			let end = true;
			for (let i = 0, l = this.positions.length; i < l; i++) {
				if (this.positions[i].run) {
					for (let DIR in DIRECTION) {
						let currentPosition = this.positions[i];
						let road = copyArray(currentPosition.road);
						road.push(DIRECTION[DIR].move);
						currentPosition = {
							y: (currentPosition.y + DIRECTION[DIR].y), 
							x: (currentPosition.x + DIRECTION[DIR].x), 
							cost: currentPosition.cost,
							road: road,
							run: true
						};
						if (currentPosition.cost > this.state.move) continue;
						else if ((currentPosition.y >= 0 
								&& currentPosition.y < this.state.map.getHeight()) 
									&& (currentPosition.x >= 0 
										&& currentPosition.x < this.state.map.getWidth())) { 
			    			if (this.state.map.battleField.field[currentPosition.y][currentPosition.x] != "09") {
			    				let position = this.positions.find(
			    					position => ((position.x == currentPosition.x) && (position.y == currentPosition.y))
			    				);
			    				currentPosition.cost = (this.state.map.battleField.field[currentPosition.y][currentPosition.x] == "01")? 
			    					currentPosition.cost + 0.6 : currentPosition.cost + 1;
			    				if (position) {
			    					if (currentPosition.cost < position.cost) {
			    						this.positions[this.positions.indexOf(position)] = currentPosition;
			    						end = false;
			    					}
			    				}
			    				else {
			    					this.positions.push(currentPosition);
			    					end = false;
			    				}
			    			} 
			    		}
					}
					this.positions[i].run = false;
				}
			}
			this.run = (end)? false : true;
		}
	}
}

function copyArray(array) {
	let newArray = new Array();
	for (let i = 0, l = array.length; i < l; i++) newArray[i] = array[i];
	return newArray;
}