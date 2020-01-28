<?php
namespace Application\models;
use Application\models\Manager;

class ArmyManager extends Manager {
	public function getArmy($armyId) {
		$db = $this->dbConnect();
		$req = $db->prepare('SELECT Armies.id, Armies.name, Armies.user_id, Kinds.name AS kind FROM Armies LEFT JOIN Kinds ON Armies.kind_id = Kinds.id WHERE Armies.id = ?');
		try {
			$req->execute(array($armyId));
			return $req->fetch();
		}
		catch(\PDOException $e) {
			echo($e);
			return false;
		}
	}

	public function getSquad($squadId) {
		$db = $this->dbConnect();
		$req = $db->prepare('SELECT Squads.id, Squads.name, Squads.army_id, Types.name AS type, Types.id AS typeId, Kinds.name AS kind, Kinds.id AS kindId FROM Squads LEFT JOIN Types ON Squads.type_id = Types.id LEFT JOIN Kinds ON (SELECT Armies.kind_id FROM Armies WHERE Armies.id = Squads.army_id) = Kinds.id WHERE Squads.id = ?');
		$req->execute(array($squadId));
		$squad = $req->fetch(\PDO::FETCH_ASSOC);
		$squadReq = $db->prepare('SELECT Units.id AS unitId, name, squad_position AS position FROM UnitToSquad LEFT JOIN Units ON UnitToSquad.unit_id = Units.id WHERE UnitToSquad.squad_id = ?');
		$squadReq->execute(array($squadId));
		$squad['units'] = array();
		while ($unit = $squadReq->fetch(\PDO::FETCH_ASSOC)) {
			$statReq = $db->prepare('SELECT SUM(life) AS life, SUM(vision) AS vision, SUM(mouve) AS mouve, SUM(physicalDefense) AS physicalDefense, SUM(distantDefense) AS distantDefense, SUM(magicalDefense) AS magicalDefense, SUM(physicalDammages) AS physicalDammages, SUM(distantDammages) AS distantDammages, SUM(magicalDammages) AS magicalDammages, SUM(points) AS points, SUM(grade) AS grade FROM Stats WHERE Stats.id IN ((SELECT Units.stat_id FROM Units WHERE Units.id = ?), (SELECT Kinds.stat_id FROM Kinds WHERE Kinds.id = ?), (SELECT Types.stat_id FROM Types WHERE Types.id = ?), ?)');
			$statReq->execute(array($unit['unitId'], $squad['kindId'], $squad['typeId'], 9));
			$unit['stats'] = $statReq->fetch(\PDO::FETCH_ASSOC);
			$squad['units'][] = $unit;
		}		
		return $squad;
	}

	public function allowAddUnit($id, $pos) {
		$db = $this->dbConnect();
		$req = $db->prepare('SELECT squad_position AS position FROM UnitToSquad WHERE squad_id =?');
		$req->execute(array($id));
		while ($unit = $req->fetch(\PDO::FETCH_ASSOC)) {
			if ($unit['position'] == $pos) return false;
		}
		return true;
	}

	public function addUnit($params) {
		$db = $this->dbConnect();
		$req = $db->prepare('INSERT INTO UnitToSquad (squad_id, unit_id, squad_position) VALUES (?, ?, ?)'); 
		try {
			$req->execute($params);
			return $db->lastInsertId();
		}
		catch(\PDOException $e) {
			return false;
		}
	}

	public function newArmy($army) {
		$db = $this->dbConnect();
		$req = $db->prepare('INSERT INTO Armies (user_id, name, kind_id) VALUES (?, ?, ?)');
		try {
			$req->execute($army);
			return $db->lastInsertId();
		}
		catch(\PDOException $e) {
			return false;
		}
	}

	public function newSquad($squad) {
		$db = $this->dbConnect();
		$req = $db->prepare('INSERT INTO Squads (name, army_id, type_id) VALUES (?, ?, ?)');
		try {
			$req->execute($squad);
			return $db->lastInsertId();
		}
		catch(\PDOException $e) {
			echo($e);
			return false;
		}
	}
}