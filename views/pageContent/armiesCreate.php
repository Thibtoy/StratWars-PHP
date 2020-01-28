<?php ob_start(); ?>
	<div id="MainPage">
		<div class="FormPosition">
			<div class="FormMarge"></div>
				<form method="post">
					<h3 style="text-align: center;">New Army:</h3>
					<div class="InputBox">
						<label for="name">Name:</label>
						<input type="name" required name="name" value=<?= (isset($_POST['name']))? htmlspecialchars($_POST['name']) : '' ?>>
					</div>
					<div class="InputBox">
						<label for="kind">Kind:</label>
						<select name="kind">
						<?php
							while ($kind = $kinds->fetch()){
							?>
								<option <?= (isset($_POST['kind']) && $_POST['kind'] == $kind['id'])? 'selected' : '' ?> value=<?= $kind['id'] ?>><?= $kind['name'] ?></option>
							<?php
							}
						?> 
						</select>
					</div>
					<div class="InputBox">
						<input type="submit" value="Create">
					</div>
					<p style="color: red;"><?= (isset($err))? $err : ''?></p>
				</form>
			<div class="FormMarge"></div>
		</div>
	</div>
<?php $content = ob_get_clean(); ?>

<?php require('views/template.php'); ?>