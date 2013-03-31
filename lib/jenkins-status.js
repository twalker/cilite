var lodash = require('lodash'),
	request = require('request'),
	util = require('util'),
	events = require('events');

function JenkinsStatus(options, onStatus){
	this.options = lodash.defaults(options || {}, {
		interval: 5000
	});

	if(!(this instanceof JenkinsStatus)) {
		return new JenkinsStatus(options);
	}
	this.timerId = null;
}

util.inherits(JenkinsStatus, events.EventEmitter);


var parse = JenkinsStatus.Parse = function(res){
	var json = JSON.parse(res);
	return json;
};

JenkinsStatus.prototype.fetch = function(url, cb){
	//console.log('fetching')
	var self = this;
	request(url, function(err, res, body){
		if(err) throw err;
		var status = parse(body);
		self.emit('response', status, body);
		cb(status);
	});
};

JenkinsStatus.prototype.start = function(){
	var url = this.options.url,
		interval = this.options.interval,
		self = this;

	var next = function next(){
		self.timerId = setTimeout(function(){
			self.fetch(url, next);
		}, interval);
	};

	this.fetch(url, next);

};

JenkinsStatus.prototype.stop = function(){
	clearTimeout(this.timerId);
};


module.exports = JenkinsStatus;