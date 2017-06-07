var socket = io();

$(() =>
{
	$('#input_send').click(() =>
	{
		socket.emit('chat message', $('#input_text').val());
		$('#input_text').val('');
		return false;
	});

	socket.on('chat message', (msg) =>
	{
		$('#messages').append($('<div class="message">').text(msg));
	});
});
