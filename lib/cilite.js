var five = require("johnny-five");

var colors = Lite.colors = {
	green: null,
	yellow: null,
	red: null
};

var _color;
/**
 * Constructs a traffic light
 * @param {[type]} options
 */
function Lite(leds){
	if(!(this instanceof Lite)) {
		return new Lite(leds);
	}

	//var options = options || {};
	//var self = this;
	this.leds = leds;
	//leds.green.on();
	//console.log(leds.red.on());
	//console.log(Object.keys(this.leds))
	/*this.leds = {
		red: new five.Led(11),
		yellow: new five.Led(10),
		green: new five.Led(9)
	};
	*/
	//colors.red = new five.Led(11);

	Object.defineProperty(this, "color", {
			get: function(){
				return _color;
			},
			set: function(value){
				_color = value;

				Object.keys(this.leds).forEach(function(key){
					if(key === value && !this.leds[key].isOn) {
						this.leds[key].fadeIn();
					} else if(this.leds[key].isOn) {
						this.leds[key].fadeOut();
					}
				}, this);
			}
	});

}

// add red(), yellow(), green() methods.
Object.keys(colors).forEach(function(key){
	Lite.prototype[key] = function(){
		this.color = key;
	}
});

// some aliases
Lite.prototype.go = Lite.prototype.green;
Lite.prototype.stop = Lite.prototype.red;
Lite.prototype.wait = Lite.prototype.yellow;

Lite.prototype.off = function(){
	// turn off all lights

};

Lite.prototype.on = function(){
	// turn on all lights

};


Lite.prototype.turn = function(color){
	if(!colors.hasOwnProperty(color)) throw new Error('No color with the key of ' + color);
	this[color]();
};



module.exports = Lite;