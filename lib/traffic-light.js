function TrafficLight(options){
	var options = options || {};

}

TrafficLight.prototype.off = function(){

};
TrafficLight.prototype.change = function(color){
	this[color]();
};
TrafficLight.prototype.green = function(){

};
TrafficLight.prototype.yellow = function(){

};
TrafficLight.prototype.red = function(){

};

module.exports = TrafficLight;