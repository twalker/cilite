var socket = io.connect('http://localhost');
socket.on('status:change', function(msg){
	//console.log('recieved', msg.status)

	var status = msg.status,
		res = msg.body,
		src = document.getElementById(status + '-template'),
		template;

	document.body.className = status;
	document.title = status + ' <= ' + res.fullDisplayName;

	// mustache template exists, render the message
	if(src) {
		template = Handlebars.compile(src.innerHTML);
		document.querySelector('section.thought').innerHTML = template(res);
	}
});
