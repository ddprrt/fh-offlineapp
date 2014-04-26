var stuff = { entries: []};
var $data = $('#data');
var $newentry = $('#newentry');
var $message = $('#message');
var $window = $(window);
var dataToSave = false;

function append(d) {
	$data.append('<li>' + d + '</li>');
}

function showStuff() {
	$data.html('');
	for(var i = 0; i < stuff.entries.length; i++) {
		append(stuff.entries[i]);
	}
}

function saveStuff() {
	window.localStorage.setItem("stuff", JSON.stringify(stuff));
	$.post('/api', JSON.stringify(stuff), function(data) {
		stuff = data;
		showStuff();
		dataToSave = false;
	});	
}

$window.on('online', function() {
	if(dataToSave) {
		saveStuff();
	}
});

if(!navigator.onLine) {
	$message.text("Sie sind gerade offline.");
	stuff = JSON.parse(window.localStorage.getItem("stuff"));
	showStuff();
}

$.get('/api', function(data) {
	stuff = data;
	showStuff();
});

$('#submit').on('click', function(e) {
	e.preventDefault();
	stuff.entries.push($newentry.val());
	if(navigator.onLine) {
		saveStuff();
	} else {
		$message.text("Aber ich bin doch offline! Speichern wir später");
		dataToSave = true;
		append('<li class="tosave">' + $newentry.val() + "</li>");
	}
});