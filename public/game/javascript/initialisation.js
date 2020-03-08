import {Map} from './map.js';
import {Squad} from './squad.js';
import {movement} from './movement/movement.js';
import {Wayve} from './movement/wayve.js';
import GuessBestWays from './movement/GuessBestWays.js';


var canva = document.getElementById('Canva');
var context = canva.getContext('2d');
var map;

let xhr = new XMLHttpRequest();

xhr.open('POST', 'game/map');
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
    	let data = JSON.parse(xhr.responseText);
    	map = new Map(data);
    	canva.width = map.getWidth()*32;
    	canva.height = map.getHeight()*32;
    	canva.style.position = "absolute";
		canva.style.left = "calc(50% - "+(canva.width/2)+"px)";
		canva.style.top = "calc(50% - "+(canva.height/2)+"px)";
		map.battleField.addSquad(new Squad('Skull', 22, 3, 0));
		map.battleField.addSquad(new Squad('Skull', 20, 3, 0));
		window.onload = function() {
			map.drawMap(context);
    		canva.addEventListener('click', click);
		}
	}
});
xhr.send();

function tryMove(event) {
	canva.removeEventListener('click', this.tryMove);
	let clientY = Math.floor(event.layerY/32);
	let clientX = Math.floor(event.layerX/32);
	let way = (this.wayve.reachable[clientY+'$'+clientX])? this.wayve.bestWay({y: clientY, x: clientX}) : false;
	if (way) moveSquad(this, way);
	else {
		displayMove(this.deplacementField, true);
  		canva.addEventListener('click', click);
	}
}

async function moveSquad (squad, way){
	displayMove(squad.deplacementField, true);
	for (let i = 0, l = way.length; i < l; i++) {
		let event = way.shift()
		map.battleField.field[squad.y][squad.x] = '00'
		switch (true) {
			case (event === 'MOVE_DOWN'):
				squad.direction = 0;
				squad.y++;
				squad.etatAnimation = 1;
				break;
			case (event === 'MOVE_TOP'):
				squad.direction = 3;
				squad.y--;
				squad.etatAnimation = 1;
				break;
			case (event === 'MOVE_LEFT'):
				squad.direction = 1;
				squad.x--;
				squad.etatAnimation = 1;
				break;
			case (event === 'MOVE_RIGHT'):
				squad.direction = 2;
				squad.x++;
				squad.etatAnimation = 1;
				break;
		}
		let move = new Promise((res, rej) => {
			squad.animation = setInterval(function() {
				map.drawMap(context, resp => {
					if (resp) {
						map.battleField.field[squad.y][squad.x] = squad;
						res(true);
					}
				});
			}, 30);
		});
		await move;
	}
	canva.addEventListener('click', click);
}

function click(event) {
	canva.removeEventListener('click', click);
    var squad = map.battleField.field[Math.floor(event.layerY/32)][Math.floor(event.layerX/32)];
    if(typeof squad === 'string') return;
    let bestWays = new GuessBestWays(map, {y: squad.y, x: squad.x}, squad.move, {road: 0.6});
	console.log(bestWays);
	displayMove(bestWays.positions);
   // 	if(!squad.tryMove) squad.tryMove = tryMove.bind(squad);
   // 	squad.deplacementField = new Object();
   // 	for (let i = -squad.move, l = squad.move; i <= l; i++) {
   // 		let k = Math.abs(i);
   // 		for (let j = -squad.move; j <= l; j++) {
   // 			if ((j >= -(l-k)) && (j <= (l-k)) && (j != 0 || i != 0)) {
   // 				let line = squad.y + i;
   // 				let cell = squad.x + j;
   // 				if ((line >= 0 && line < map.getHeight()) && (cell >= 0 && cell < map.getWidth())) { 
   //  				if (map.battleField.field[line][cell] === "09") continue;
   //  				else squad.deplacementField[line+'$'+cell] = "08";
   //  			}
   //  			else continue;
   //  		}
   //  		else continue;		
   //  	}	
   //  }
   //  let position = {y: Math.floor(event.layerY/32), x: Math.floor(event.layerX/32)};
   //  squad.wayve = new Wayve(position, squad.move, map);
  	// for (let pos in squad.wayve.reachable) {
  	// 	let coords = pos.split('$');
  	// 	if (!squad.deplacementField[coords[0]+'$'+coords[1]]) squad.deplacementField[coords[0]+'$'+coords[1]] = "07";
  	// }
  	// for (let pos in squad.deplacementField) {
  	// 	let coords = pos.split('$');
  	// 	if (!squad.wayve.reachable[coords[0]+'$'+coords[1]]) squad.deplacementField[coords[0]+'$'+coords[1]] = "06";
  	// }
  	// displayMove(squad.deplacementField);
   //  canva.addEventListener('click', squad.tryMove);
}

function displayMove (positions, clear = false) {
	positions.forEach(position => {
		if (!clear) map.layers[8].field[position.y][position.x] = "07";
  		else map.layers[8].field[position.y][position.x] = "00";
	})
  	map.drawMap(context);
}