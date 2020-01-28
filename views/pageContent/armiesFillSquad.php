<?php 
$life = 0;
$vision = 0;
$mouve = 0;
$physicalDammages = 0;
$distantDammages = 0;
$magicalDammages = 0;
$physicalDefense = 0;
$distantDefense = 0;
$magicalDefense = 0;
$points = 0;
?>
<?php ob_start(); ?>
	<?php require('views/includedModules/squadUnitList.php') ?>
	<div id="SquadBoard">
		<div class="FormMarge"></div>
			<form method="post">
				<h3>Fill Squad</h3>
				<div class="InputBox">
					<label for="name">Name:</label>
					<input type="text" name="name" value=<?= $squad['name'] ?>>
				</div>
				<div class="InputBox">
					<label for="type">Type:</label>
					<select name="type">
						<option><?= $squad['type'] ?></option>
					</select>
				</div>
				<div id="SquadArea">
				<?php
					for ($i = 0, $l = 3; $i < $l; $i++) {
					?>
						<div class="SquadLine"id=<?= 'Line'.($l - $i)?>>
					<?php
						for($j = 0; $j < $l; $j++) {
							$x = ($i != 0 && ($l%$i) == 1)? ($j+1) : $j;
							if($i != 1 && $j == 2) continue;
							$id = (($l*2) - (($i*2)+$x));
						?>
							<span  class="SquadUnitPosition" id=<?= 'Position'.$id ?>>
								<div class="SquadUnitEmplacement">
								<?php
									$set = false;
									foreach ($squad['units'] as $key => $unit) {
										if ($unit['position'] == $id) {
											foreach ($unit['stats'] as $key => $value) {
												if ($key == 'grade') continue;
												else if ($key == 'vision' || $key == 'mouve') {
													if (${$key} < $value) ${$key} = $value;
													else continue;
												} 
												else if(preg_match('/Defense/', $key)) ${$key} += $value/sizeof($squad['units']);
												else ${$key} += $value;
											}
											$set = true;
									?>
										<img style="width: 100%; z-index: 3;" src=<?= 'public/images/'.implode('',explode(' ', $unit['name'])).'.png' ?> >
									<?php
										}
									}
								?>
									<?= ($set)? '' : '<h3 onclick="test(this)"style="margin-bottom: 62.5px;" id="'.$id.'">Empty</h3>'; ?>
									<span style="height: 0px;"><div class='SquadSocle'></div></span>
								</div>
							</span>
						<?php
						}
					?>
						</div>
					<?php
					}
				?>
				</div>
				<div class="InputBox">
					<input type="submit" value="Modify">
				</div>
				<p style="color: red;"><?= (isset($err))? $err : ''?></p>
			</form>
		<div class="FormMarge"></div>
	</div>
	<?php require('views/includedModules/squadUnitStats.php') ?>
	<script type="text/javascript" src="public/FillSquad.js"></script>
<?php $content = ob_get_clean(); ?>
<?php $additionalLinks = '<link href="public/FillSquad.css" rel="stylesheet" />' ?>
<?php require('views/template.php'); ?>