<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Strat Wars</title>
	<base href="/StratWars/">
	<link href="public/style.css" rel="stylesheet" />
	<?= $additionalLinks = (isset($additionalLinks))? $additionalLinks : null; ?>
</head>
<body>
	<!--<div id="Content">
		<?= $content ?>
	</div>-->
	<canvas id="Canva"></canvas>
	<script type="module" src="public/game/javascript/initialisation.js"></script>
</body>
</html>