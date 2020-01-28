<?php
require_once('autoLoader.php');
require_once('initialisation.php');

if(isset($_GET['controller'])){
	$controller = $_GET['controller'].'Controller';
	$method = $_GET['controller'];
	$method = (strlen($_GET['method']) > 0)? $method.ucfirst($_GET['method']) : $method.'Index';
	$params = explode('/', $_GET['params']);
	if(!isset($AlphaController->{$controller}) || !method_exists($AlphaController->{$controller}, $method)) {
		$AlphaController->pageNotFound();
	}
	else $AlphaController->{$controller}->{$method}($params);
}
else {
	$AlphaController->home();
};