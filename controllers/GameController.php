<?php
namespace Application\controllers;

use Application\game\mouvement\Wave;

class GameController {

	// private $postsModel;
	// private $commentsModel;

	// function __construct() {
	// 	$this->postsModel = new PostsModel();
	// 	//$this->commentsModel = new CommentsModel();
	// }

	public function gameIndex() {
		// $wave = new Wave('coucou', 'toi');
		// var_dump($wave);
		require('./views/gameTemplate.php');
	}

	public function gameMap() {
		$json = file_get_contents('./game/maps/firstMap.json');
		$decoded = json_decode($json, true); 
		session_start();
		$_SESSION['battleField'] = $decoded['battleField']['field'];
		echo($json);
		session_write_close();
	}

	public function gameTest() {
		session_start();
		echo(json_encode($_SESSION['battleField']));
		session_write_close();
	}

	// public function postsComments(array $id) {
	// 	$post = $this->postsModel->getOnePost($id[0]);
	// 	require('views/pageContent/postsComments.php');
	// }
}