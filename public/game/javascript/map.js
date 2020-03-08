import {Tileset} from './tileset.js';

export class Map {
	constructor(map) {
		this.layers = new Array();
		for (let layer in map) {
			if (layer === 'battleField'){
				this.battleField = {
					squads: new Array(),
					field: map[layer].field,
					addSquad: function (squad) {
						this.squads.push(squad);
						this.field[squad.y][squad.x] = squad;
					}
				};
			}
			else {
				this.layers.push({
					tileset: new Tileset('public/images/tilesets/'+map[layer].tileset+'.png'),
					field: map[layer].field
				});
			};
		}
	}

	getHeight = () => {
		return this.layers[0].field.length;
	}

	getWidth = () => {
		return this.layers[0].field[0].length;
	}

	drawMap = (context, callback) => {
		this.layers.forEach(layer => {
			for (let i = 0, l = layer.field.length; i < l; i++){
				let line = layer.field[i];
				let y = i*32;
				for(var j = 0, k = line.length ; j < k ; j++) {
					let x = j*32;
					if(line[j] != "00")layer.tileset.drawTile(parseInt(line[j], 10), context, x, y);
				};
			};
		});
		this.battleField.squads.forEach(squad => {
			squad.draw(context, res => {callback(res)});
		});
	}
}