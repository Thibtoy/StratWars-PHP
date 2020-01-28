<?php ob_start(); ?>
	<div id="MainPage">
		<div class="FormPosition">
			<div class="FormMarge"></div>
				<form method="post">
					<h3 style="text-align: center;">New Army:</h3>
					<div class="InputBox">
						<label for="name">Name:</label>
						<input type="name" required name="name" value=<?= $army['name']?>>
					</div>
					<div class="InputBox">
						<label for="kind">Kind:</label>
						<select name="kind">
						<?php
							while ($kind = $kinds->fetch()){
							?>
								<option <?= ($kind['name'] == $army['kind'])? 'selected' : '' ?> value=<?= $kind['id'] ?>><?= $kind['name'] ?></option>
							<?php
							}
						?> 
						</select>
					</div>
					<div class="InputBox">
						<label for="squads">Squads:</label>
						<div id="SquadBox">
						</div>
					</div>
					<div class="InputBox">
						<input type="submit" value="Modify">
					</div>
					<p style="color: red;"><?= (isset($err))? $err : ''?></p>
				</form>
			<div class="FormMarge"></div>
		</div>
	</div>
<?php $content = ob_get_clean(); ?>

<?php require('views/template.php'); ?>