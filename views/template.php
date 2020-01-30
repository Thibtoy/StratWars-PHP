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
	<?php require('views/includedModules/header.php'); ?>
	<div id="ErrorBox" class="UnVisible">
		<h4>Error:</h4>
		<p id="Error">Something went wrong,</p>
		<div id="ErrorOk">OK</div>
	</div>
	<div id="Content">
		<?= $content ?>
	</div>
</body>
</html>