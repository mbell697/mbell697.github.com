function sidebarHide() {
	var elm = $('.sidebar').filter(':not(:animated)');
	if (elm.length === 0) return;
	elm.animate({ 
		right: -250 
	}, 400, function() {sidebarOpen  = false;});
	$('.sidebar-toggle').fadeIn();
	$('.sidebar-close').hide();
}

function sidebarShow() {
	var elm = $('.sidebar').filter(':not(:animated)');
	if (elm.length === 0) return;
	elm.animate({ 
		right: 0 
	}, 400, function() {sidebarOpen = true;});
	$('.sidebar-toggle').fadeOut();
}

function sidebarHoverEnter() {
	if (sidebarOpen) return;
	var elm = $('.sidebar').filter(':not(:animated)'); 
	if (elm.length === 0) return;
	elm.animate({ 
		right: -240 
	}, 200);	
}

function sidebarHoverExit() {
	if (sidebarOpen) return;
	var elm = $('.sidebar').filter(':not(:animated)'); 
	if (elm.length === 0) return;
	elm.animate({ 
		right: -250 
	});	
}

var sidebarOpen = true;
var sidebarUserOpenned = false;

if (window.matchMedia( "(min-width: 992px)" ).matches) {
	$('.sidebar-toggle').click(function() {
		if(sidebarOpen) {
			sidebarHide();
			sidebarUserOpenned = false;
		} else {
			sidebarShow();
			$('.sidebar-close').show();
			sidebarUserOpenned = true;
		}
	});

	$('.sidebar-toggle').hover(function() {
		sidebarHoverEnter();
	}, function() {
		sidebarHoverExit();
	});

	$('.sidebar-close').click(function(event) {
		sidebarHide();
		sidebarUserOpenned = false;
		event.preventDefault();
	});

	$(window).scroll(function() {
		if ($(window).scrollTop() < 50) {
			if (!sidebarOpen) {
				sidebarShow();
			} else {
				$('.sidebar-close').hide();
				sidebarUserOpenned = false;
			}
		} else {
			if (sidebarOpen && !sidebarUserOpenned) {
				sidebarHide();
			}
		}
	});
}






