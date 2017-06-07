var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', (req, res) =>
{
	res.sendFile(__dirname + '/client.html');
});

io.on('connection', (socket) =>
{
	console.log('A user connected!');

	socket.on('disconnect', () =>
	{
		console.log('A user has disconnected.');
	});

	socket.on('chat message', (msg) =>
	{
		if (msg.length > 0)
			io.emit('chat message', msg);
	});

});

http.listen(2242, () => {});
