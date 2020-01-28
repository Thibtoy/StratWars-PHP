<?php
namespace Application\controllers;

use Application\controllers\AdminController;
use Application\controllers\ArmiesController;
use Application\controllers\UserController;
use Application\controllers\CodexController;
use Application\controllers\GameController;

class AlphaController {
	function __construct() {
		$this->adminController = new AdminController();
		$this->armiesController = new ArmiesController();
		$this->userController = new UserController();
		$this->codexController = new CodexController();
		$this->gameController = new GameController();
	}

	public function home() {
		session_start();
		$_SESSION = [];
		unset($_SESSION);
		session_destroy();
		require('views/pageContent/home.php');
	}

	public function pageNotFound() {
		echo('ouuuups');
		require('views/pageContent/home.php');
	}
}