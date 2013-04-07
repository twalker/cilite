
var socket = io.connect('http://localhost');
socket.on('status:change', function(msg){
	//console.log('recieved', msg.status)

	var status = msg.status,
		res = msg.body,
		src = document.getElementById(status + '-template'),
		template;

	document.body.className = status;
	document.title = status + ' <= ' + res.fullDisplayName;

	//console.log('src', src);
	if(src) {
		template = Handlebars.compile(src.innerHTML);
		document.querySelector('section.thought').innerHTML = template(res);
	}
});
