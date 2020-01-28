<?php
namespace Application\models;
use Application\models\Manager;

class UserManager extends Manager {
	public function find($options) {
		$db = $this->dbConnect();
		$fields = '';
		$results = array();
		foreach ($options['fields'] as $key => $value) {
			if(($key == 0 && $key == (sizeof($options['fields'])-1)) || $key == (sizeof($options['fields'])-1)) {
				$fields = $fields.' '.$value;
			}else $fields = $fields.' '.$value.',';
		}
		$where = (isset($options['where']))? ' WHERE '.$options['where'].'= ?' : '';
		$conditions =(isset($options['conditions']))? $options['conditions'] : array();
		$req = $db->prepare('SELECT '.$fields.' FROM Users'.$where);
		$req->execute($conditions);
		$user = $req->fetch();	
		return $user;
	}

	public function register($user) {
		$db = $this->dbConnect();
		$fields = '';
		$placeHolders = '';
		$values = array();
		$count = 0;
		foreach ($user as $key => $value) {
			if(($count == 0 && $count == (sizeof($user)-1)) || $count == (sizeof($user)-1)) {
				$fields = $fields.'`'.$key.'`';
				$placeHolders = $placeHolders.'?';
			}
			else {
				$fields = $fields.'`'.$key.'`, ';
				$placeHolders = $placeHolders.'?, ';
			}
			$values[] = $value;
			$count++;
		}
		$req = $db->prepare('INSERT INTO `Users` ('.$fields.') VALUES ('.$placeHolders.')');
		try {
			$req->execute($values);
			return $db->lastInsertId();
		}
		catch(\PDOException $e) {
			return false;
		}
	}
}