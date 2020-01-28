<?php
namespace Application\game\army;

abstract class ArmyUnit {
	protected $_points;
	protected $_name;
	protected $_mouve = 1;
	protected $_life = 20;
	protected $_vision = 2;
	protected $_physicalDammages = 4;
	protected $_distantDammages = 0;
	protected $_magicalDammages = 0;
	protected $_physicalDefense = 0;
	protected $_distantDefense = 0;
	protected $_magicalDefense = 0;
	protected $_grade;
	protected $_type;
	protected $_kind;
	protected $_weapon;
	protected $_shield;
	protected $_spellProtection;

	private function setPoints($points) {
		$this->_points = $points;
	}

	private function setMouve($mouve) {
		$this->_mouve = $mouve;
	}

	private function setLife($life) {
		$this->_life = $life;
	}

	private function setVision($vision) {
		$this->_vision = $vision;
	}

	private function setStrength($strength) {
		$this->_strength = $strength;
	}

	private function setPhysicalDefense($defense) {
		$this->_defense = $defense;
	}

	private function setGrade($grade) {
		$this->_grade = $grade;
	}

	protected function setName($name) {
		$this->_name = $name;
	}

	// public function addStuff($stuff) {
	// 	foreach ($stuff as $key => $item) {
	// 		$this->_stuff[$key] = $item;
	// 		$this->alter('points', $item['cost']);
	// 		foreach ($item['bonus'] as $property => $value) {
	// 			$this->alter($property, $value);
	// 		};
	// 	};		
	// }

	public function alter($property, $value) {
		$this->{'set'.ucfirst($property)}($this->{'_'.$property}+$value);
	}

	public function getPoints() {
		return $this->_points;
	}

	public function getName() {
		return $this->_name;
	}

	public function getLife() {
		return $this->_life;
	}

	// protected function hit(ArmyUnit $unit, $type) {
	// 	$damages = -($this->_strength*(1 - $unit->{'_'.$type.'Defense'}));
	// 	$unit->alter('life', $damages);
	// 	$message = $this->getName().' a infligé '.$damages.' à '.$unit->getName();
	// 	$message = ($unit->getLife() < 0)? $message.',<br/>'.$unit->getName().' est mort.' : $message.'.';
	// 	return $message;
	// }
}