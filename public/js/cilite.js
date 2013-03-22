$(function(){
	$('nav a').on('click', function(e){
		
		var $target = $(e.currentTarget);
		console.log('click', $target.text())
		$(document.body).removeClass('red yellow green')
		$(document.body).addClass($target.text());
	});
});