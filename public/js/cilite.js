
var socket = io.connect('http://localhost');
socket.on('status:change', function(msg){
	//console.log('recieved', msg.status)
	document.body.className = msg.status;
});
