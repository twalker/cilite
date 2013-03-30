
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path');

var app = module.exports = express();


app.set('port', process.env.PORT || 3000)
	.set('views', __dirname + '/views')
	.set('view engine', 'jade');

app
	.use(express.favicon())
	.use(express.logger('dev'))
	.use(express.bodyParser())
	.use(app.router)
	.use(require('stylus').middleware(__dirname + '/public'))
	.use(express.static(path.join(__dirname, 'public')))
	.use(express.errorHandler());


app.get('/', function(req, res){
	res.render('index');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
