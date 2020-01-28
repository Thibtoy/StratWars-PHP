<?php
namespace Application\models;

class Manager {
	protected function dbConnect() {
		try {
			$db = new \PDO('mysql:host=localhost;dbname=StratWars;charset=utf8', 'root', 'root');
			$db->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
			return $db;
		}
		catch(Exception $e) {
			die('Erreur: '.$e->getMessage());
		}
	}
}