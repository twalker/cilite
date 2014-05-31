var http = require('http')
  , path = require('path')
  , argv = require('optimist').argv
  , BuildStatus = require('./lib/build-status')
  , express = require('express')
  , stylus = require('stylus')
  , nib = require('nib');

var config = {
  port: process.env.PORT || 3001,
  ip: process.env.IP || '127.0.0.1',
  statusUrl: argv.url || 'http://ci.jruby.org/job/jruby-dist-master/lastBuild/api/json?pretty=true',
  interval: argv.interval || 3000
};

var app = module.exports = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var status = new BuildStatus({
  url: config.statusUrl,
  interval: config.interval
  // parsing function for debugging
  /*
  ,parse: function(res) {
    var stats = ['success', 'building', 'failure'];
    var rnd = Math.floor(Math.random() * 3);
    return stats[rnd];
  }
  */
});

io.on('connection', function(socket){
  // send next response to client so they don't have to wait for change.
  status.once('response',function(status, body){
    io.sockets.emit('status:change', {status: status, body: body});
  });

});

status.on('change', function(status, body){
  io.sockets.emit('status:change', {status: status, body: body});
});

app
  .set('host', config.ip + ':' + config.port)
  .set('views', __dirname + '/views')
  .set('view engine', 'jade');

app
  .use(require('morgan')('dev'))
  .use(stylus.middleware({
    src: __dirname + '/public',
    compile: function (str, path) {
        return stylus(str).set('filename', path).set('compress', true).use(nib());
      }
    }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(require('errorhandler')({ dumpExceptions: true, showStack: true }));

app.get('/', function(req, res){
  res.render('index');
});


server.listen(config.port, config.ip, function(){
  var address = server.address();
  console.log("cilite server listening on http://%s:%s", address.address, address.port);
  // start polling for build status
  status.start();
});
