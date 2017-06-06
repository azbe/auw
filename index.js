const express = require('express');
const exec = require('child_process').exec;
const fs = require('fs');
const rs = require('randomstring');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.enable('trust proxy');

app.get('/', function(req, res)
{
	res.redirect('/aaaaaa');
})

app.get('/[A-Za-z0-9]{6}', (req, res) =>
{
	console.log(req.ip + ' joined ' + req.url);
	var path = __dirname + '/pages' + req.url;

	if (!fs.existsSync(path))
	{
		fs.mkdirSync(path);
	
		var htmlrd = fs.createReadStream('./template.html');
		htmlrd.on('error', (err) => { done(err); });
		var htmlwd = fs.createWriteStream(path + '/' + req.url + '.html');
		htmlwd.on('error', (err) => { done(err); });
		htmlwd.on('close', (ex) => { done(); });
		htmlrd.pipe(htmlwd);
		function done(err) {}	

		res.redirect(req.url);
		return;
	}
	
	res.set('content-type', 'text/html');
	res.send(fs.readFileSync(path + '/' + req.url + '.html', 'utf8'));
});

app.post('/[A-Za-z0-9]{6}', (req, res) =>
{
	var message = req.body.chatmessage;
	exec('python3 ./addmessage.py ' + __dirname + '/pages/' +  req.url + ' \'' + message + '\'', (error, stdout, stderr) =>
	{
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error != null)
		{
			console.log('Execution error: ' + error);
		}
	});

	res.send(message);
});

app.listen(2242, () =>
{
	//89.136.183.219:2242
	console.log('Listening on port 2242.');
});
