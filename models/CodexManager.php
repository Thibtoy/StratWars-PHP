<?php
namespace Application\models;
use Application\models\Manager;

class CodexManager extends Manager {

	public function getKinds() {
		$db = $this->dbConnect();
		$req = $db->query('SELECT id, name FROM Kinds');
        return $req;
	}

	public function getTypes() {
		$db = $this->dbConnect();
		$req = $db->query('SELECT id, name FROM Types');
        return $req;
	}

	public function getUnit($id) {
		$db = $this->dbConnect();
		$req = $db->prepare('SELECT kind_id, type_id FROM Units WHERE id=?');
		$req->execute($id);
		$unit = $req->fetch(\PDO::FETCH_ASSOC);
		return $unit;
	}

	public function getUnits($params) {
		$db = $this->dbConnect();
		$req = $db->prepare('SELECT Units.id, Units.name AS name, Kinds.name AS kind, Units.kind_id, Units.type_id,Types.name AS type, Units.stat_id FROM Units LEFT JOIN Kinds ON Units.kind_id = Kinds.id LEFT JOIN Types ON Units.type_id = Types.id WHERE Units.kind_id = ? AND Units.type_id = ?');
		$req->execute($params);
		$units = array();
		while ($unit = $req->fetch(\PDO::FETCH_ASSOC)) {
			$stats = $db->prepare('SELECT SUM(life) AS life, SUM(vision) AS vision, SUM(mouve) AS mouve, SUM(physicalDefense) AS physicalDefense, SUM(distantDefense) AS distantDefense, SUM(magicalDefense) AS magicalDefense, SUM(physicalDammages) AS physicalDammages, SUM(distantDammages) AS distantDammages, SUM(magicalDammages) AS magicalDammages, SUM(points) AS points, SUM(grade) AS grade FROM Stats WHERE Stats.id IN (?, (SELECT Kinds.stat_id FROM Kinds WHERE Kinds.id = ?), (SELECT Types.stat_id FROM Types WHERE Types.id = ?), ?)');
			$stats->execute(array($unit['stat_id'], $unit['kind_id'], $unit['type_id'], 9));
			$stats = $stats->fetch(\PDO::FETCH_ASSOC);
			foreach ($stats as $key => $value) {
				$unit[$key] = $value;
			}
			$units[] = $unit;
		}
		return $units;
	}

	public function getAllUnits($params) {
		$db = $this->dbConnect();
		$Where = (strlen($params[0])>0)? ' WHERE Units.kind_id = (SELECT Kinds.id FROM Kinds WHERE Kinds.name = ?)' : '';
		$req = $db->prepare('SELECT Units.id, Units.name AS name, Kinds.name AS kind, Units.kind_id, Units.type_id, Units.stat_id FROM Units INNER JOIN Kinds ON Units.kind_id = Kinds.id'.$Where);
		$req->execute($params);
		$units = array();
		while ($unit = $req->fetch(\PDO::FETCH_ASSOC)){
			$statReq = $db->prepare('SELECT SUM(life) AS life, SUM(vision) AS vision, SUM(mouve) AS mouve, SUM(physicalDefense) AS physicalDefense, SUM(distantDefense) AS distantDefense, SUM(magicalDefense) AS magicalDefense, SUM(physicalDammages) AS physicalDammages, SUM(distantDammages) AS distantDammages, SUM(magicalDammages) AS magicalDammages, SUM(points) AS points, SUM(grade) AS grade FROM Stats WHERE Stats.id IN (?, (SELECT Kinds.stat_id FROM Kinds WHERE Kinds.id = ?), (SELECT Types.stat_id FROM Types WHERE Types.id = ?), ?)');
			$statReq->execute(array($unit['stat_id'], $unit['kind_id'], $unit['type_id'], 9));
			$stats = $statReq->fetch(\PDO::FETCH_ASSOC);
			foreach ($stats as $key => $value) {
				$unit[$key] = $value;
			}
			$units[] = $unit;
		};
		return $units;
	}

	private function getStats($unit) {

	}

	// SELECT Units.id, Units.name AS name, Kinds.name AS kind, Stats.points, Stats.mouve, Stats.life, Stats.vision, Stats.physicalDefense, Stats.distantDefense, Stats.magicalDefense, Stats.physicalDammages, Stats.distantDammages, Stats.magicalDammages, Stats.grade FROM Units INNER JOIN Kinds ON Units.kind_id = Kinds.id INNER JOIN Stats ON Units.stat_id = Stats.id WHERE Units.kind_id = (SELECT Kinds.id FROM Kinds WHERE Kinds.name = ?
}