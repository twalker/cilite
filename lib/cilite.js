var five = require("johnny-five");

// Lite instance private data
// current color
var _color;
// array of color names
var colors = Lite.colors = ['red', 'green', 'blue'];

/**
 * Constructs a build status light
 * @param {Object} options: pins
 */
function Lite(options){
	if(!(this instanceof Lite)) {
		return new Lite(options);
	}
	var options = options || {};

	this.leds = options.pins || {red: 9, green: 10, blue: 11};

	// transform pin numbers to led instances
	colors.forEach(function(color){
		this[color] = new five.Led(this[color]);
	}, this.leds);

	Object.defineProperty(this, "color", {
			get: function(){
				return _color;
			},
			set: function(value){
				_color = value;
				//console.log('setting to ', value)
				Object.keys(this.leds).forEach(function(key){
					if(key === value) {
						if(!this.leds[key].isOn) this.leds[key].fadeIn();
					} else if(this.leds[key].isOn) {
						this.leds[key].fadeOut();
					}
				}, this);
			}
	});
}

// add red(), green(), blue() methods.
colors.forEach(function(key){
	Lite.prototype[key] = function(){
		this.color = key;
	}
});

// some aliases to use build status semantics.
Lite.prototype.failure = Lite.prototype.red;
Lite.prototype.success = Lite.prototype.green;
Lite.prototype.building = Lite.prototype.blue;

// turn off all the lights
Lite.prototype.off = function(){
	for(var led in this.leds) {
		this.leds[led].off();
	}
};

// turn on all the lights (white)
Lite.prototype.on = function(){
	for(var led in this.leds) {
		this.leds[led].on()
	}
};

// change to a color by color name
Lite.prototype.turn = function(color){
	if(!this.leds.hasOwnProperty(color)) throw new Error('No color with the key of ' + color);
	this[color]();
};

module.exports = Lite;