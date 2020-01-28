var active = false;
var menu = document.getElementById('ProfilBox');
var visibility = false;

function toggleVisibility(event) {
	if(!active) {
		active = true;
		relay(event);
		menu.classList.toggle('ProfilBoxUnvisible');
		setTimeout(function() {
			active = false;
			return true;
		}, 500);
	}
	else return false;
}

function relay(event) {
	if(!visibility) {
		event.currentTarget.removeEventListener('mouseover', toggleVisibility);
		event.currentTarget.addEventListener('mouseout', toggleVisibility);
	}
	else {
		event.currentTarget.removeEventListener('mouseout', toggleVisibility);
		event.currentTarget.addEventListener('mouseover', toggleVisibility);		
	}
	visibility = (visibility)? false : true;
}

document.getElementById('ProfilSection').addEventListener('mouseover', toggleVisibility);
