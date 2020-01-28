<?php
// ici lors de l'appel : use Application\Path;     $namespace égal à Application\Path
$autoLoader = function($namespace) {
	// on prépare le terrain : on déclare ce que l'on va remplacer et par quoi on le remplace;
	//ici on remplace 'Application' par une string vide car il représente la racine du projet.
	$search = array('Application\\','\\');
	$replace = array('', DIRECTORY_SEPARATOR);
 
	// on construit le chemin complet du fichier à inclure :
	// il faut que l'autoloader soit toujours à la racine du site : tout part de là avec __DIR__
	$path = __DIR__.DIRECTORY_SEPARATOR.str_replace($search, $replace, $namespace).'.php';    
	// $path = répertoire racine du site ici /Path.php
 
	// on vérfie qu'il existe bien et on l'inclut
	// sinon on passe la main à une autre autoloader (return false)
	// tu peux empiler les autoloader sans problèmes jusqu'à tomber sur celui qui sera capable de localiser physiquement sur ton disque le fichier recherché
	if (is_file($path)) {
    	include $path;
    	return true;
	} else {
    	return false;
    }
};

spl_autoload_register($autoLoader);
//On met notre fonction d'autoLoad dans la pile des fonctions d'autoload appelées par le serveur