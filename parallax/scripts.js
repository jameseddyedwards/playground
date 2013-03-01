
$(document).ready(function(){

	$('section[data-type="background"]').each(function(){
		var $bgObj = $(this);

		$(window).scroll(function() {
			var yPos = -($(window).scrollTop() / $bgObj.data('speed'));
			var coords = '50% ' + yPos + 'px';

			$bgObj.css({backgroundPosition:coords})
		});
	});


});