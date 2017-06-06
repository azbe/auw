const express = require('express');
const fs = require('fs');
const rs = require('randomstring');
const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res)
{
	res.redirect('/aaaaaa');
})

app.get('/[A-za-z0-9]{6}', (req, res) =>
{
	path = __dirname + '/pages' + req.url;

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

app.listen(2242, () =>
{
	//89.136.183.219:2242
	console.log('Listening on port 2242.');
});
