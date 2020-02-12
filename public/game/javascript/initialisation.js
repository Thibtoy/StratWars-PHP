import {Map} from './map.js';
import {Squad} from './squad.js';
import {mouvement} from './mouvement/mouvement.js';
import {Wayve} from './mouvement/wayve.js';


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

function tryMouve(event) {
	let clientY = Math.floor(event.layerY/32);
	let clientX = Math.floor(event.layerX/32);
	let way = this.wayve.bestWay({y: clientY, x: clientX});
	// let way;
	// for (let i = 0, l = this.deplacementField.length; i < l; i++) {
	// 	let finded = this.deplacementField[i].find(
	// 		scenario => (scenario 
	// 			&& scenario.route 
	// 				&& clientY === scenario.position.line 
	// 					&& clientX === scenario.position.cell
	// 		)
	// 	);
	// 	if (finded) way = finded;
	// }
	// console.log(way);
	if (way) mouveSquad(this, way);
	// else return;
}

async function mouveSquad (squad, way){
	canva.removeEventListener('click', squad.tryMouve);
	for (let pos in squad.wayve.reachable) {
  		let coords = pos.split('$');
  		map.layers[8].field[coords[0]][coords[1]] = "00";
  	}
	for (let i = 0, l = way.length; i < l; i++) {
		let event = way.shift()
		map.battleField.field[squad.y][squad.x] = '00'
		switch (true) {
			case (event === 'MOUVE_DOWN'):
				squad.direction = 0;
				squad.y++;
				squad.etatAnimation = 1;
				break;
			case (event === 'MOUVE_TOP'):
				squad.direction = 3;
				squad.y--;
				squad.etatAnimation = 1;
				break;
			case (event === 'MOUVE_LEFT'):
				squad.direction = 1;
				squad.x--;
				squad.etatAnimation = 1;
				break;
			case (event === 'MOUVE_RIGHT'):
				squad.direction = 2;
				squad.x++;
				squad.etatAnimation = 1;
				break;
		}
		let mouve = new Promise((res, rej) => {
			squad.animation = setInterval(function() {
				map.drawMap(context, resp => {
					if (resp) {
						map.battleField.field[squad.y][squad.x] = squad;
						res(true);
					}
				});
			}, 30);
		});
		await mouve;
	}
	canva.addEventListener('click', click);
}

function click(event) {
	canva.removeEventListener('click', click);
    var squad = map.battleField.field[Math.floor(event.layerY/32)][Math.floor(event.layerX/32)]
    if(typeof squad === 'string') return;
   	if(!squad.tryMouve) squad.tryMouve = tryMouve.bind(squad);
   	let deplacementField = new Array();
   	// for (let i = -squad.mouve, l = squad.mouve; i <= l; i++) {
   	// 	let k = Math.abs(i);
   	// 	let row = new Array();
   	// 	for (let j = -squad.mouve; j <= l; j++) {
   	// 		if ((j >= -(l-k)) && (j <= (l-k)) && (j != 0 || i != 0)) {
   	// 			let line = squad.y + i;
   	// 			let cell = squad.x + j;
   	// 			if ((line >= 0 && line < map.getHeight()) && (cell >= 0 && cell < map.getWidth())) {
    // 				map.layers[8].field[line][cell] = "08"; 
    // 				squad.mouvable.push({line, cell});
    // 				if (map.battleField.field[line][cell] === "09") {
    // 					map.layers[8].field[line][cell] = "06";
    // 					row.push(null);
    // 				}
    // 				else row.push({line, cell});  							
    // 			}
    // 			else row.push(null);
    // 		}
    // 		else row.push(null);		
    // 	}	
    // 	deplacementField.push(row);	
    // }
    //mouvement(deplacementField, squad, map);
    let position = {y: Math.floor(event.layerY/32), x: Math.floor(event.layerX/32)};
    squad.wayve = new Wayve(position, squad.mouve, map);
  	for (let pos in squad.wayve.reachable) {
  		let coords = pos.split('$');
  		map.layers[8].field[coords[0]][coords[1]] = "08";
  	}
    map.drawMap(context);
    canva.addEventListener('click', squad.tryMouve);
}