var five = require('johnny-five'),
	request = require('request'),
	argv = require('optimist').argv,
	CILite = require('./lib/cilite'),
	BuildStatus = require('./lib/build-status'),
	lite, board, led;


var lite = new CILite({});

var statusUrl = argv.url || 'http://ci.jruby.org/job/jruby-dist-master/lastBuild/api/json?pretty=true';

var status = new BuildStatus({
	url: statusUrl,
	interval: 1000,
	parse: function(res) {
		var stats = ['success', 'building', 'failure'];
		var rnd = Math.floor(Math.random() * 3);
		return stats[rnd];
	}
});


status.on('response', function(status, body){
	console.log('response event', status, JSON.parse(body).fullDisplayName);
});

status.on('change', function(status, body){
	console.log(JSON.parse(body).fullDisplayName, 'changed to', status);
	var statusColorMap = {
		success: 'green',
		building: 'yellow',
		failure: 'red'
	};
	// do something with the lite.
	//lite.turn(statusColorMap[status])
	// OR
	// use lite.red(), lite.yellow(), or lite.green();
	//lite[statusColorMap[status]]();
	// OR
	switch(status) {
		case 'success':
			lite.green();
			break;
		case 'failure':
			lite.red();
			break;
		case 'building':
			lite.yellow();
			break;
		default:
			lite.on();
	}

});

status.start();


setTimeout(function() {
	status.stop();
}, 5000);

/*
board = new five.Board();

board.on('ready', function() {
	console.log('board ready');
	var lite = new CILite({
		pin: 13
	});

	//getStatus(function(){});

	// Create a standard `led` hardware instance
	//led = new five.Led({
	//	pin: 13
	//});

	// 'on' turns the led _on_
	//led.on();

	// 'off' turns the led _off_
	//led.off();

	// Turn the led back on after 3 seconds (shown in ms)
	//this.wait( 3000, function() {

		//led.off();

	//});

});
*/
