<nav id="NavBar">
	<a href="#"><h3>Armies</h3></a>
	<a href="/StratWars/codex"><h3>Codex</h3></a>
	<div id="ProfilSection">
	<?php
		if(isset($_SESSION['authenticated']) && isset($_SESSION['userId'])) require('profilMenu.php');
		else require('loginMenu.php');
	?>
	</div>
</nav>