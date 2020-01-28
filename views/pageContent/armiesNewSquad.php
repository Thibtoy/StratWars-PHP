<?php ob_start(); ?>
	<div class="FormPosition">
		<div class="FormMarge"></div>
		<h3>New Squad</h3>
			<form method="post">
				<div class="InputBox">
					<label for="name">Name:</label>
					<input type="text" name="name" value="Squad">
				</div>
				<div class="InputBox">
					<label for="type">Type</label>
					<select name="type">
					<?php
						while ($type = $types->fetch()){
						?>
							<option <?= (isset($_POST['type']) && $_POST['type'] == $type['id'])? 'selected' : '' ?> value=<?= $type['id'] ?>><?= $type['name'] ?></option>
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
<?php $content = ob_get_clean(); ?>

<?php require('views/template.php'); ?>