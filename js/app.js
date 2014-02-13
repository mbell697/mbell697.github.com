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

var sidebarToggleClick = function() {
	if(sidebarOpen) {
		sidebarHide();
		sidebarUserOpenned = false;
	} else {
		sidebarShow();
		$('.sidebar-close').show();
		sidebarUserOpenned = true;
	}
};

var sidebarCloseClick = function() {
	sidebarHide();
	sidebarUserOpenned = false;
	event.preventDefault();
};

var sidebarScroll = function() {
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
};

var sidebarOpen = true;
var sidebarUserOpenned = false;

var widthMatcher = window.matchMedia( "(min-width: 992px)" );

if (widthMatcher.matches) {
	$('.sidebar-toggle').on('click', sidebarToggleClick);
	$('.sidebar-toggle').on('mouseenter', sidebarHoverEnter);
	$('.sidebar-toggle').on('mouseleave', sidebarHoverExit);
	$('.sidebar-close').on('click', sidebarCloseClick);
	$(window).on('scroll', sidebarScroll);
}

widthMatcher.addListener(function(matcher) {
	if (matcher.matches) {
		$('.sidebar-toggle').on('click', sidebarToggleClick);
		$('.sidebar-toggle').on('mouseenter', sidebarHoverEnter);
		$('.sidebar-toggle').on('mouseleave', sidebarHoverExit);
		$('.sidebar-close').on('click', sidebarCloseClick);
		$(window).on('scroll', sidebarScroll);
	} else {
		if (!sidebarOpen) {
			sidebarShow();
		}
		$('.sidebar-toggle').off('click', sidebarToggleClick);
		$('.sidebar-toggle').off('mouseenter', sidebarHoverEnter);
		$('.sidebar-toggle').off('mouseleave', sidebarHoverExit);
		$('.sidebar-close').off('click', sidebarCloseClick);
		$(window).off('scroll', sidebarScroll);
	}
});






