import {PathFinder} from './PathFinder.js';

export function mouvement(deplacementField, squad, map) {
	let startPoint  = {y: Math.floor(deplacementField.length/2), x: Math.floor(deplacementField[0].length/2)};
	squad.deplacementField = deplacementField
	squad.deplacementField.forEach((line, i) => {
		line.forEach((position, j) => {
			if (!position) return;
			let endPoint = {y: i, x: j};
			let pathFinder = new PathFinder(startPoint, deplacementField, endPoint, squad.mouve);
			pathFinder.run();
			let bestWay = pathFinder.getBestWay();
			
			if (!bestWay) map.layers[8].field[position.line][position.cell] = "06";
			else {
				deplacementField[i][j] = {pathFinder, position, route: bestWay.route};
			}
		});
	});
};