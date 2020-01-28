<?php
namespace Application\controllers;

use Application\models\CodexManager;

class CodexController {
	private $CodexManager;

	public function __construct() {
		$this->setCodexManager(new CodexManager());
	}

	private function setCodexManager($codexManager) {
		$this->CodexManager = $codexManager;
	}

	public function codexIndex() {
		$armies = $this->CodexManager->getKinds();
		require('views/pageContent/armies.php');
	}

	public function codexGallery($params) {
		// if (!isset($_SESSION['connected'])) header("Location: ../StratWars/");
		$units = $this->CodexManager->getAllUnits($params);
		require('views/pageContent/armiesKind.php');
	}
}