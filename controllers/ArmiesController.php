<?php
namespace Application\controllers;

use Application\models\CodexManager;
use Application\models\ArmyManager;

class ArmiesController {
	private $Managers;
	private $UserId;

	public function __construct() {
		$this->addManager('Codex', new CodexManager());
		$this->addManager('Army', new ArmyManager());
	}

	private function addManager($key, $manager) {
		return $this->Managers[$key] = $manager;
	}

	private function setUserId($id) {
		return $this->UserId = $id;
	}

	private function getUserId() {
		return $this->UserId;
	}

	public function armiesIndex() {
		$this->isAuth();
		$armies = $this->Managers['Codex']->getKinds();
		return require('views/pageContent/armies.php');
	}

	public function armiesCreate() {
		$this->isAuth(1);
		$kinds = $this->Managers['Codex']->getKinds();
		if($_SERVER['REQUEST_METHOD'] == 'POST') {
			if(isset($_POST['name'])) {
				if(isset($_POST['kind'])) {
					$army = array($this->getUserId(), $_POST['name'], $_POST['kind']);
					if(!$success = $this->Managers['Army']->newArmy($army)) echo('echec');
					else return header('Location: ./interface/'.$success);
				}
			}
		}
		return require('views/pageContent/armiesCreate.php');
	}

	public function armiesInterface($params) {
		$this->isAuth(2);
		$army = $this->Managers['Army']->getArmy($params[0]);
		if ($army['user_id'] != $this->getUserId()) return header('Location: ../../armies');
		$kinds = $this->Managers['Codex']->getKinds();
		return require('views/pageContent/armiesInterface.php');
	}

	public function armiesNewSquad($params) {
		$this->isAuth(2);
		$army = $this->Managers['Army']->getArmy($params[0]);
		if ($army['user_id'] != $this->getUserId()) return header('Location: ../../armies');
		$types = $this->Managers['Codex']->getTypes();
		if($_SERVER['REQUEST_METHOD'] == 'POST') {
			if(isset($_POST['name'])) {
				if(isset($_POST['type'])) {
					$squad = array($_POST['name'], $army['id'], $_POST['type']);
					if(!$success = $this->Managers['Army']->newSquad($squad)) echo('echec');
					
				}
			}
		}
		return require('views/pageContent/armiesNewSquad.php');
	}

	public function armiesFillSquad($params) {
		$this->isAuth(3);
		$army = $this->Managers['Army']->getArmy($params[0]);
		$squad = $this->Managers['Army']->getSquad($params[1]);
		if ($army['user_id'] != $this->getUserId() || $squad['army_id'] != $army['id']) return header('Location: ../../../armies');
		session_start();
		$_SESSION['unit'] = array($squad['kindId'], $squad['typeId']);
		$_SESSION['squad'] = $params[1];
		session_write_close();
		return require('views/pageContent/armiesFillSquad.php');
	}

	public function armiesGetSquadUnit() {
		$unit = $this->Managers['Army']->getSquadUnit($id);
	}

	public function armiesGetUnits() {
		session_start();
		$unitParams = $_SESSION['unit'];
		session_write_close();
		$units = $this->Managers['Codex']->getUnits($unitParams);
		echo(json_encode($units));
		return true;
	}

	public function armiesAddUnit() {		
		$this->isAuth(1);
		$unit = $this->Managers['Codex']->getUnit(array($_POST['id']));
		session_start();
		if($unit['kind_id'] == $_SESSION['unit'][0] && $unit['type_id'] == $_SESSION['unit'][1] && $_POST['pos'] >= 0 && $_POST['pos'] < 7) {
			if($this->Managers['Army']->allowAddUnit($_SESSION['squad'], $_POST['pos'])) {
				if($success = $this->Managers['Army']->addUnit(array($_SESSION['squad'], $_POST['id'], $_POST['pos']))) {
					session_write_close();
					echo(json_encode($success));
					return true;
				}
			}
		}
		session_write_close();
		echo(json_encode(false));
		return false;
		
	}

	private function isAuth($back = 0) {
		session_start();
		if (!isset($_SESSION['authenticated']) && !isset($_SESSION['userId'])){
			$location;
			for ($i = 0; $i < $back; $i++){
				$location = ($i = $back)? $location.'.' : '../';
			}
			$location = $location.'./user/login';
			return header('Location: '.$location);
		}
		else $this->setUserId(($_SESSION['userId'])); 
		session_write_close();
	}

	// public function codexGallery($params) {
	// 	// if (!isset($_SESSION['connected'])) header("Location: ../StratWars/");
	// 	$units = $this->CodexManager->getAllUnits($params);
	// 	require('views/pageContent/armiesKind.php');
	// }
}