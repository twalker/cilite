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
		pins: {
			red: 9,
			green: 10,
			blue: 11
		}
	});

	var status = new BuildStatus({
		url: statusUrl,
		interval: 1000
		/*
		// parsing function for debugging
		,parse: function(res) {
			var stats = ['success', 'building', 'failure'];
			var rnd = Math.floor(Math.random() * 3);
			return stats[rnd];
		}
		*/
	});



	status.on('change', function(status, body){
		console.log(JSON.parse(body).fullDisplayName, 'changed to', status);

		var statusColorMap = {
			success: 'go',
			building: 'wait',
			failure: 'stop'
		};
		// invoke lite.red(), lite.green(), or lite.blue()
		lite[statusColorMap[status]]();
	});

	status.start();

});

