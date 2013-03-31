var five = require("johnny-five"),
	request = require("request"),
	argv = require('optimist').argv,
	CILite = require("./lib/cilite"),
	JenkinsStatus = require("./lib/jenkins-status"),
	lite, board, led;

var statusUrl = argv.url || "http://ci.jruby.org/api/json";

var status = new JenkinsStatus({
	url: statusUrl,
	interval: 1000
});

status.on('response', function(json, body){
	// do something with the lite.
	console.log('response event', json)
});

status.start();


setTimeout(function() {
	status.stop();
}, 5000);

/*
board = new five.Board();

board.on("ready", function() {
	console.log('board ready');
	var lite = new CILite({
		pin: 13
	});

	//getStatus(function(){});

	// Create a standard `led` hardware instance
	//led = new five.Led({
	//	pin: 13
	//});

	// "on" turns the led _on_
	//led.on();

	// "off" turns the led _off_
	//led.off();

	// Turn the led back on after 3 seconds (shown in ms)
	//this.wait( 3000, function() {

		//led.off();

	//});

});
*/
