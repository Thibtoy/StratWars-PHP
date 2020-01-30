const DIRECTION = {
	40: 0,
	37: 1,
	39: 2,
	38: 3
}
const DUREE_ANIMATION = 3;
const DUREE_DEPLACEMENT = 9;

export class Squad {
	constructor(name, x, y, direction) {
		this.mouve = 25;
		this.mouvable = new Array();
		this.eventPile = new Array();
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.src = 'public/images/characterSprites/'+name+'.png';
		this.etatAnimation = -1;
		this.image = new Image();
		this.image.src = this.src
		this.image.ref = this;
		this.image.onload = function() {
			if(!this.complete) throw "Erreur de chargement du sprite Character";
			this.ref.width = this.width / 3;
			this.ref.height = this.height / 4;
		};
	}

	draw = (context, callback) => {
		let frame = 1; // Numéro de l'image à prendre pour l'animation
		let decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage
		if (this.etatAnimation >= DUREE_DEPLACEMENT) {
			this.etatAnimation = -1;
			clearInterval(this.animation);
			callback(true);
		}
    	else if(this.etatAnimation >= 0) {
		// On calcule l'image (frame) de l'animation à afficher
			frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
			if(frame > 2) frame %= 3;
		// Nombre de pixels restant à parcourir entre les deux cases
			var pixelsAParcourir = 32 - (32 * (this.etatAnimation / DUREE_DEPLACEMENT));
		// À partir de ce nombre, on définit le décalage en x et y.
		// NOTE : Si vous connaissez une manière plus élégante que ces quatre conditions, je suis preneur
			if(this.direction === 3) decalageY = pixelsAParcourir;//haut?
			else if(this.direction === 0) decalageY = -pixelsAParcourir;//bas?
			else if(this.direction === 1) decalageX = pixelsAParcourir;//gauche?
	 		else if(this.direction === 2) decalageX = -pixelsAParcourir;//droite?
	 		this.etatAnimation++
		}
 // * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
 // * donc il nous suffit de garder les valeurs 0 pour les variables 
 // * frame, decalageX et decalageY
 		context.drawImage(
			this.image,
			frame*this.width, this.direction*this.height,
			this.width, this.height,
			(this.x * 32) + decalageX, ((this.y * 32) - 8) + decalageY,
			this.width, this.height,
		);
	}

	goTo = (position, i, j, deplacementField) => {
		let y0 = Math.floor(deplacementField.length/2); // this.mouve
		let x0 = Math.floor(deplacementField[0].length/2); // this.mouve
		let x = x0;
		let y = y0;
		let crossing = new Array();
		let tryedPositions = new Array();
		// for (let count = 0, l = this.mouve; count < l; count++) {
		// 	let mouve = (i < y)? ( (j < x)?  [(y - i),  (x - j)] : [(y - i),  (x - j)] ) : ( (j < x)?  [(y - i),  (x - j)] :  [(y - i),  (x - j)]);
		// 	if(Math.abs(mouve[0]) > Math.abs(mouve[1])) {
		// 		if (mouve[0] < 0) {
		// 			if (deplacementField[y - 1][x] != "10") y--;
		// 			else if (mouve[1] < 0) {
		// 				if (deplacementField[y][x - 1] != "10") x--;
		// 				else x++
		// 			}
		// 		}
		// 		if (mouve[0] < 0) {
		// 			if (deplacementField[y - 1][x] != "10") y--;
		// 		}
		// 	}
		// }
		// console.log(y, y0);
		// if (Math.abs(y0 - i) > Math.abs(x0 - j)) {
		// 	if (i < y0) {
		// 		for (let try = 0, l = this.mouve; i < l; i++) {
		// 			if (try === 0) {
		// 				if(deplacementField[i][j] != null) {
		// 					if (deplacementField[i])
		// 				}
		// 			}
		// 		}
		// 	}
		// } 
				
	}

	getMouve = (deplacementField) => {
		deplacementField.forEach((line, i) => {
			line.forEach((position, j) => {
				if (!position) return;
				this.goTo(position, i, j, deplacementField);
			});
		});
		console.log(deplacementField);
	}
}