
var socket = io.connect('http://localhost');

var statusColorMap = {
	success: 'green',
	building: 'yellow',
	failure: 'red'
};

socket.on('status:change', function(msg){
	//console.log('recieved', msg.status)
	document.body.className = statusColorMap[msg.status];
});
