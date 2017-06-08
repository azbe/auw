var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) =>
{
	res.sendFile(__dirname + '/client.html');
});

var ips = [];
var ids = [];
var nrIds = [];
io.on('connection', (socket) =>
{
	var ip = socket.conn.remoteAddress + '';
	if (ips.indexOf(ip) === -1)
	{
		ips.push(ip);
		ids.push(socket.id);
		nrIds.push(0);
		console.log(socket.id + ' (' + ip + ') connected!');
		socket.broadcast.emit('user connect', socket.id);
	}
	else if (nrIds[ips.indexOf(ip)] === 0)
	{
		console.log(ids[ips.indexOf(ip)] + ' (' + ip + ') connected!');
		socket.broadcast.emit('user connect', ids[ips.indexOf(ip)]);
	}
	nrIds[ips.indexOf(ip)]++;
	socket.emit('you connect', ids[ips.indexOf(ip)]);

	socket.on('disconnect', () =>
	{
		var ip = socket.conn.remoteAddress + '';	
		nrIds[ips.indexOf(ip)]--;
		if (nrIds[ips.indexOf(ip)] === 0)
		{
			console.log(ids[ips.indexOf(ip)] + ' (' + ip + ') has disconnected.');
			socket.broadcast.emit('user disconnect', ids[ips.indexOf(ip)]);
		}
	});

	socket.on('chat message', (msg, timestamp) =>
	{
		msg = msg.replace(/\s*[\r\n]+/gm, '\n');
		if (msg.length === 0 || msg === ' ' || msg.length > 8192)
			return;
		var ip = socket.conn.remoteAddress + '';
		io.emit('chat message', ids[ips.indexOf(ip)], msg, timestamp);
	});

});

http.listen(2242, () => {});
