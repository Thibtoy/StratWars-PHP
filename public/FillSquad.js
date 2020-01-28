var unitList = document.getElementById('SquadUnitList');
var unitBox = unitList.getElementsByTagName('form')[0].cloneNode(true);
const props1 = ['life', 'mouve', 'vision', 'grade', 'points'];
var current = '';

function test(event) {
	current = event.getAttribute('id');
	unitList.innerHTML = "";
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'armies/getUnits');
	xhr.addEventListener('readystatechange', function() {
    	if (xhr.readyState === 4 && xhr.status === 200) {
         var units = JSON.parse(xhr.responseText);
         units.forEach(unit => {
         	let box = unitBox.cloneNode(true);
         	box.getElementsByTagName('h3')[0].innerHTML = unit.name;
         	box.getElementsByTagName('img')[0].setAttribute('src', 'public/images/'+unit.name.split(' ').join('')+'.png');
         	for (let prop in unit) {
         		if(props1.indexOf(prop) >= 0) {
         			let stat = document.createElement('div');
         			stat.setAttribute('class', 'UnitStat');
         			stat.innerHTML = '<h5>'+prop+' :</h5><p>'+unit[prop]+'</p>'
         			box.getElementsByClassName('SquadUnitListItemInfos1')[0].appendChild(stat);
         			box.getElementsByClassName('SquadUnitListItemButton')[0].setAttribute('value', unit.id);
         			box.getElementsByClassName('SquadUnitListItemButton')[0].addEventListener('click', addUnitToSquad);
         		}
         	}
         	unitList.appendChild(box);
         })
         	unitList.style.display = 'flex';
    	}
	});
	xhr.send(null);
}

function addUnitToSquad(event) {
	let target = document.getElementById('Position'+current).getElementsByClassName('SquadUnitEmplacement')[0];
	let src = event.target.parentNode.getElementsByTagName('img')[0].getAttribute('src');
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'armies/addUnit');
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.addEventListener('readystatechange', function() {
    	if (xhr.readyState === 4 && xhr.status === 200) {
    		if(!JSON.parse(xhr.responseText)) return;
			let img = document.createElement('img');
			img.setAttribute('style', 'width: 100%; Z-index: 3;');
			img.setAttribute('src', src);
			target.replaceChild(img, target.getElementsByTagName('h3')[0]);
		}
		unitList.style.display = 'none';
	});
	xhr.send('id='+event.target.getAttribute('value')+'&pos='+current);
}

