<?php ob_start(); ?>
	<div class="UnitBoard">
	<?php
		foreach ($units as $unit) {
		?>
			<div class="UnitBox">
				<div class="UnitFile">
					<div class="UnitIdentity">
						<h3><?= $unit['name'] ?></h3>
						<h4><?= $unit['kind'] ?></h4>
					</div>
					<img class="UnitImage" src=<?= 'public/images/'.implode('', explode(' ',$unit['name'])).'.png'?>>
				</div>
				<div class="UnitDescription">
					<div class="UnitStats">
					 	<div class="UnitStatsMain">
					 	<?php
					 		foreach ($unit as $key => $value) {
					 		 	if (in_array($key, array('life', 'mouve', 'vision', 'grade', 'points'))) {
					 			?>
					 				<div class="UnitStat">
					 					<h5><?= $key ?> :</h5>
					 					<p><?= $value ?></p>
					 				</div>
					 			<?php
					 			}
					 		}
					 	?>
					 	</div>
						<div class="UnitText">De la merde ce que tu veux mais là c'est un peu plus long pour pouvoir tester<br/>De la merde ce que tu veux et c'est plus long pour test le visu<br/>De la merde ce que tu veux et là il manquait 'el' à la ligne précedente<br/></div>
						<div class="UnitStatsFight">
						 	<div class="UnitStatsCombat">
						 	<?php
						 		foreach ($unit as $key => $value) {
						 			if (in_array($key, array('physicalDammages', 'distantDammages', 'magicalDammages'))) {
									?>
						 				<div class="UnitStat">
						 					<h5><?= $key ?> :</h5>
						 					<p><?= $value ?></p>
						 				</div>
						 			<?php
						 			}
						 		}
						 	?>
							</div>
						 	<div class="UnitStatsCombat">
						 	<?php
						 		foreach ($unit as $key => $value) {
						 			if (in_array($key, array('physicalDefense', 'distantDefense', 'magicalDefense'))){
					 				?>
					 					<div class="UnitStat">
					 						<h5><?= $key ?> :</h5>
					 						<p><?= $value ?></p>
					 					</div>
					 				<?php
					 				}
					 			}
					 		?>
					 		</div>
					 	</div>
					</div>
				</div>
			</div>
		<?php
		}
	?>
	</div>
<?php $content = ob_get_clean(); ?>

<?php require('views/template.php'); ?>