var five = require('johnny-five'),
	request = require('request'),
	argv = require('optimist').argv,
	CILite = require('./lib/cilite'),
	BuildStatus = require('./lib/build-status');

var statusUrl = argv.url || 'http://ci.jruby.org/job/jruby-dist-master/lastBuild/api/json?pretty=true';
var board = new five.Board();

board.on('ready', function() {
	//console.log('board ready');
	var lite = new CILite({
		red: new five.Led(11),
		yellow: new five.Led(10),
		green: new five.Led(9)
	});

	var status = new BuildStatus({
		url: statusUrl,
		interval: 1000,
		parse: function(res) {
			var stats = ['success', 'building', 'failure'];
			var rnd = Math.floor(Math.random() * 3);
			return stats[rnd];
		}
	});

	var statusColorMap = {
		success: 'go',
		building: 'wait',
		failure: 'stop'
	};

	status.on('change', function(status, body){
		console.log(JSON.parse(body).fullDisplayName, 'changed to', status);
		// invoke lite.red(), lite.yellow(), or lite.green();
		lite[statusColorMap[status]]();

	});

	status.start();

});

