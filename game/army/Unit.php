<?php
namespace Application\game\army;

use Application\game\army\ArmyUnit;

class Unit extends ArmyUnit {
	public function __construct($name, $build = array(), $options = null) {
		$this->setName($name);
		foreach ($build as $property => $value) {
			$this->alter($property, $value);
		}
		// if(isset($options['stuff'])) {
		// 	$this->addStuff($options['stuff']);
		// }
	}

	public function simpleAttack($unit) {
		return $this->hit($unit, 'physical');
	}
} 