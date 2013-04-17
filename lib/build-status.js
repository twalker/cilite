var lodash = require('lodash'),
  request = require('request'),
  util = require('util'),
  events = require('events');

function BuildStatus(options, onStatus){
  if(!(this instanceof BuildStatus)) {
    return new BuildStatus(options);
  }
  this.options = lodash.defaults(options || {}, {
    interval: 5000
  });
  // allow a custom parse function, it should return a status string.
  this.parse = this.options.parse || defaultParse;
  this.timerId = null;
  this.status = null;
}

util.inherits(BuildStatus, events.EventEmitter);

// parses the response to return 'building', 'success', or 'failure'.
// this parser is specific to the json data from Jenkins' last build API.
var defaultParse = function(res){
  var json = res;
  var status;
  if(json.building) {
    status = 'building';
  } else if(json.result) {
    status = json.result.toLowerCase();
  } else {
    status = 'unknown';
  }
  return status;
};

// make a http request for the last build status
BuildStatus.prototype.fetch = function(url, cb){
  //console.log('fetching')
  var self = this;
  request(url, function(err, res, body){
    if(err) throw err;

    var resJson = JSON.parse(body);
    var status = self.parse(resJson);

    self.emit('response', status, resJson);
    if(status !== self.status) {
      self.emit('change', self.status = status, resJson);
    }
    cb();
  });
};

// start polling
BuildStatus.prototype.start = function(){
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

// stop polling
BuildStatus.prototype.stop = function(){
  clearTimeout(this.timerId);
};

module.exports = BuildStatus;