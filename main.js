var five = require("johnny-five"),
	request = require("request"),
	CILite = require("./lib/cilite"),
	Status = require("./lib/jenkins-status"),
	lite, board, led;

function getStatus(cb){
	request('http://ci.jruby.org/api/json', function(err, res, body){

		console.log('body', JSON.parse(body));
	});
}

getStatus(function(){});
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
