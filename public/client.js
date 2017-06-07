var socket = io();

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

	socket.on('chat message', (color, msg, timestamp) =>
	{
		$('#messages').append($('<br>'));
		$('#messages').append($('<div class="message" style="background: ' + color + ';">').text(msg));
		$('#messages').append($('<div class="message_time">').text(timestamp));		
	});

});
