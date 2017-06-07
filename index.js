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

	socket.on('chat message', (msg, timestamp) =>
	{
		if (msg.length > 0)
			io.emit('chat message', stringToColor(socket.id), msg, timestamp);
	});

});

http.listen(2242, () => {});

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
