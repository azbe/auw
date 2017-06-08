var socket = io();

$(() =>
{
	$('#input_send').click(() =>
	{
		var timestamp = (new Date()).toUTCString();
		var msg = $('#input_text').val();
		socket.emit('chat message', msg, timestamp);
		$('#input_text').val('');
		$('#messages').append($('<br>'));
		$('#messages').append($('<div class="message own" style="background: ' + stringToColor(socket.id) + ';">').text(msg));				
		$('#messages').append($('<div class="message_time own">').text(timestamp));	
		return false;
	});

	$('#input_text').keyup((e) =>
	{
		if (e.which == 13 && e.shiftKey == false)
			$('#input_send').click();
	});

	socket.on('chat message', (id, msg, timestamp) =>
	{
		//if (socket.id != id)
		{
			$('#messages').append($('<br>'));
			$('#messages').append($('<div class="message" style="background: ' + stringToColor(id) + ';">').text(msg));
			$('#messages').append($('<div class="message_time">').text(timestamp));		
		}	
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
