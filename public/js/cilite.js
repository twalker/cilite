$(function(){
	$('nav a').on('click', function(e){

		var $target = $(e.currentTarget);

		$(document.body)
			.removeClass('red yellow green')
			.addClass($target.text());
	});
});