<?php ob_start(); ?>
	<div class="FormPosition">
		<div class="FormMarge"></div>
			<form method="post">
				<div class="InputBox">
					<label for="email">Email:</label>
					<input type="text" name="email" required>
				</div>
				<div class="InputBox">
					<label for="password">Password:</label>
					<input type="password" name="password" required>
				</div>
				<div class="InputBox">
					<input type="submit" value="Go">
				</div>
				<p style="color: red;"><?= (isset($err))? $err : ''?></p>
			</form>
		<div class="FormMarge"></div>
	</div>
<?php $content = ob_get_clean(); ?>

<?php require('views/template.php'); ?>