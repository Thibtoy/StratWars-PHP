<?php
namespace Application\controllers;

use Application\models\UserManager;

class UserController {

	public function __construct() {
		$this->setUserManager(new UserManager());
	}

	 private function setUserManager($UserManager) {
	 	$this->userManager = $UserManager;
	}

	public function userIndex() {
		session_start();
		if (!isset($_SESSION['authenticated']) && !isset($_SESSION['userId'])){
			return header("Location: ./user/login");
		} 
		if(isset($_SESSION['firstConnection'])) {
			echo('Congratulation, you have successfully registered');
		}
		session_write_close();
		return require('views/pageContent/home.php');
	}

	public function userLogin() {
		session_start();
		if(!isset($_SESSION['authenticated'])) {
			if($_SERVER['REQUEST_METHOD'] == 'POST') {
				if(!empty($_POST['email'])){
					if(!empty($_POST['password'])) {
						$user = $this->userManager->find(array(
							'fields' => array('id', 'pseudo', 'password'), 
							'where' => 'email', 
							'conditions' => array($_POST['email'])
						));
						if(!$user) $err = 'This account does not exist';
						else if (password_verify($_POST['password'], $user['password'])) {
							$_SESSION['authenticated'] = true;
							$_SESSION['user'] = $user['pseudo'];
							$_SESSION['userId'] = $user['id'];
							session_write_close();
							return header("Location: ./user");
						}else $err = 'Incorrect password';
					}else $err = 'Password must be filled';
				}else $err = 'Email must be filled';
			}
			session_write_close();
			return require('views/pageContent/login.php');
		}
		session_write_close();
		return header('Location: ./user');
	}

	public function userSignIn() {
		session_start();
		if(!isset($_SESSION['authenticated'])) {
			if($_SERVER['REQUEST_METHOD'] == 'POST') {
				$newUser;
				foreach ($_POST as $key => $value) {
					if ($key == 'password2') continue;
					if(empty($_POST[$key])) {
						session_write_close();
						$err = ucfirst($key).' must be filled.';
						return require('views/pageContent/signIn.php');
					}else $newUser[$key] = htmlspecialchars($value);
				}
				if($newUser['password'] == $_POST['password2']) {
					$user = $this->userManager->find(array(
						'fields' => array('id'), 
						'where' => 'email', 
						'conditions' => array($_POST['email'])
					));
					if(!$user) {
						$newUser['password'] = password_hash($newUser['password'], PASSWORD_DEFAULT);
						if(!$success = $this->userManager->register($newUser)) {
							$script = '<script>this.error("Something went wrong, please try again")</script>';
						}
						else {
							$_SESSION['authenticated'] = true;
							$_SESSION['user'] = $newUser['pseudo'];
							$_SESSION['userId'] = $success;
							$_SESSION['firstConnection'] = true;
							session_write_close();
							return header("Location: ./user");
						}
					}else $err = 'An account already exists with this email.';
				}else $err = 'Passwords doesn\'t match.';		
			}
			session_write_close();
			return require('views/pageContent/signIn.php');
		}
		session_write_close();
		return header("Location: ./user");
	}
}