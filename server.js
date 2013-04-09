
var http = require('http'),
	path = require('path'),
	argv = require('optimist').argv,
	BuildStatus = require('./lib/build-status'),
	express = require('express'),
	stylus = require('stylus'),
	nib = require('nib');

var app = module.exports = express();
var	server = http.createServer(app);
var io = require('socket.io').listen(server);

var statusUrl = argv.url || 'http://ci.jruby.org/job/jruby-dist-master/lastBuild/api/json?pretty=true';

var status = new BuildStatus({
	url: statusUrl,
	interval: 3000
	// parsing function for debugging
	/*
	,parse: function(res) {
		var stats = ['success', 'building', 'failure'];
		var rnd = Math.floor(Math.random() * 3);
		return stats[rnd];
	}
	*/
});

io.on('connection', function(socket){
	// send next response to client so they don't have to wait for change.
	status.once('response',function(status, body){
		io.sockets.emit('status:change', {status: status, body: body});
	});

});

status.on('change', function(status, body){
	io.sockets.emit('status:change', {status: status, body: body});
});

app
	.set('port', process.env.PORT || 3001)
	.set('views', __dirname + '/views')
	.set('view engine', 'jade');

app
	.use(express.favicon())
	.use(express.logger('dev'))
	.use(app.router)
	.use(stylus.middleware({
		src: __dirname + '/public',
		compile: function (str, path) {
				return stylus(str).set('filename', path).set('compress', true).use(nib());
			}
		}))
	.use(express.static(path.join(__dirname, 'public')))
	.use(express.errorHandler());

app.get('/', function(req, res){
	res.render('index');
});


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  // start polling for build status
  status.start();
});
