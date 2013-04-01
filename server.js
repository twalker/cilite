
var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	path = require('path'),
	BuildStatus = require('./lib/build-status');


var status = new BuildStatus({
	url: 'http://ci.jruby.org/job/jruby-dist-master/lastBuild/api/json?pretty=true',
	interval: 1000,
	parse: function(res) {
		var stats = ['success', 'building', 'failure'];
		var rnd = Math.floor(Math.random() * 3);
		return stats[rnd];
	}
});

status.on('change', function(status, body){
	io.sockets.emit('status:change', {status: status, body: body});
});

app
	.set('port', process.env.PORT || 3000)
	.set('views', __dirname + '/views')
	.set('view engine', 'jade');

app
	.use(express.favicon())
	.use(express.logger('dev'))
	.use(app.router)
	.use(require('stylus').middleware(__dirname + '/public'))
	.use(express.static(path.join(__dirname, 'public')))
	.use(express.errorHandler());

app.get('/', function(req, res){
	res.render('index');
});


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  status.start();
});
