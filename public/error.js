function error(message) {
	document.getElementById('Error').innerHTML = message;
	document.getElementById('ErrorBox').classList.remove('UnVisible');
	document.getElementById('ErrorOk').addEventListener('click', ok);
}

function ok(event) {
	document.getElementById('Error').innerHTML = '';
	document.getElementById('ErrorBox').classList.add('UnVisible');
	document.getElementById('ErrorOk').removeEventListener('click', ok);
	window.location = 'user/signIn'
}