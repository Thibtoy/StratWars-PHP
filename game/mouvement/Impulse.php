<?php 

namespace Application\game\mouvement;

class Impulse {
	private $position;
	private $move;
	private $statut = "RUN";
	private $map;

	public function __construct($position, $move, $map) {
		$this->position = $position;
		$this->move = $move - 1;
		$this->map = $map;
	}

	// private function setPosition($position) {
	// 	return $this->position = $position;
	// }

	// private function setMove($move) {
	// 	return $this->move = $move;
	// }

	// private function addWay($way) {
	// 	return $this->ways[] = $way;
	// }
}