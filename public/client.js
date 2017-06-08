var socket = io();

const messageSound = new Audio('message.wav');
const connectSound = new Audio('connect.wav');
const disconnectSound = new Audio('disconnect.wav');
var actualID = '';

$(() =>
{
	$('#input_send').click(() =>
	{
		socket.emit('chat message', $('#input_text').val(), (new Date()).toUTCString());
		$('#input_text').val('');
		return false;
	});

	$('#input_text').keyup((e) =>
	{
		if (e.which == 13 && e.shiftKey == false)
			$('#input_send').click();
	});

	socket.on('you connect', (id) =>
	{
		actualID = id;
	});

	socket.on('user connect', (id) =>
	{
		$('#messages').append($('<br>'));
		$('#messages').append($('<div class="message connection" style="color: ' + stringToColor(id) + ';">').text(id + ' has just connected.'));
		connectSound.play();
	});

	socket.on('user disconnect', (id) =>
	{
		$('#messages').append($('<br>'));
		$('#messages').append($('<div class="message connection" style="color: ' + stringToColor(id) + ';">').text(id + ' has disconnected.'));
		disconnectSound.play();
	});

	socket.on('chat message', (id, msg, timestamp) =>
	{
		$('#messages').append($('<br>'));
		var div = $('<div class="message" style="background: ' + stringToColor(id) + ';">').text(msg);
		var time = $('<div class="message_time">').text(timestamp);	
		if (id == actualID)
		{
			div.addClass('own');
			time.addClass('own');
		}
		else			
			messageSound.play();
		$('#messages').append(div);
		$('#messages').append(time);
	});

});

function stringToColor (str) 
{
	var hash = 0;
	for (var i = 0; i < str.length; i++) 
	{
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	var color = '#';
	for (var i = 0; i < 3; i++) 
	{
  		var value = (hash >> (i * 8)) & 0xFF;
    	color += ('00' + value.toString(16)).substr(-2);
	}
	return color;
}
