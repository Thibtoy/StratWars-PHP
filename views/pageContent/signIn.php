<?php ob_start(); ?>
	<div id="MainPage">
		<div class="FormPosition">
			<div class="FormMarge"></div>
				<form method="post">
					<h3 style="text-align: center;">Sign In:</h3>
					<div class="InputBox">
						<label for="pseudo">Pseudo:</label>
						<input type="pseudo" required name="pseudo" value=<?=(isset($_POST['pseudo']))? $_POST['pseudo'] : '' ?>>
					</div>
					<div class="InputBox">
						<label for="email">Email:</label>
						<input type="text" required name="email" value=<?=(isset($_POST['email']))? $_POST['email'] : ''?>>
					</div>
					<div class="InputBox">
						<label for="password">Password:</label>
						<input type="password" required name="password" value=<?=(isset($_POST['password']))? $_POST['password'] : '' ?>>
					</div>
					<div class="InputBox">
						<label for="password2">Password Validation:</label>
						<input type="password" required name="password2" value=<?=(isset($_POST['password2']))? $_POST['password2'] : '' ?>>
					</div>
					<div class="InputBox">
						<input type="submit" value="Register">
					</div>
					<p style="color: red;"><?= (isset($err))? $err : ''?></p>
				</form>
			<div class="FormMarge"></div>
		</div>
	</div>
<?php $content = ob_get_clean(); ?>

<?php require('views/template.php'); ?>