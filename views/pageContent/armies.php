<?php ob_start(); ?>
	<h3>Armies Codex</h3>
	<?php
		while($data = $armies->fetch()) {
	?>
			<a href=<?= "/StratWars/codex/gallery/".ucfirst($data['name']) ?> ><div><?= $data['name'] ?></div></a>
	<?php
		}
	?>
<?php $content = ob_get_clean(); ?>

<?php require('views/template.php'); ?>