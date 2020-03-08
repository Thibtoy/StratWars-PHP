<?php 

namespace Application\game\mouvement;

use Application\game\mouvement\Impulse;

class Wave {
	private $position;
	private $move;
	private $statut = "RUN";
	private $reachable = array();
	private $map;
	private $impulses = array();

	public function __construct($position, $move, $map) {
		$this->position = $position;
		$this->move = $move;
		$this->addImpulse(new Impulse());
		$this->run();
	}

	public function addImpulse($impulse) {
		return $this->impulses[] = $impulse;
	}

	private function run() {
		while ($this->statut != "END") {
			$end = true;
			foreach ($impulses as $impulse) {
				if ($impulse->statut != "END") {
					$end = false;
					$impulse->impulse();
				}
			}
			if ($end) $this->statut = 'END';
		}
	}
}