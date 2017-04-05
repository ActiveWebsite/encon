var App = jQuery(document);

// document ready
App.ready(function ($) {
	var $win = $(window);
	var $header = $('#site-header');
	var $navAnchor = $('#nav-anchor');
	var didScroll;
	// Animation for Speakers section
	var speakerBlocks = $('#speakers .border-box'),
		offset = 0.5
	;
	// Animation for timeline blocks
	var timelineBlocks = $('#overview .border-box');

	// handles nav position
	function hasScrolled() {
		var st = $(this).scrollTop();
		var navScrollTop = $navAnchor.offset().top;

		if (st > $header.outerHeight()) {
			$header.addClass('scrolled');
		} else {
			$header.removeClass('scrolled');
		}

		if (st > navScrollTop) {
			$header.addClass('show');
		} else {
			$header.removeClass('show');
		}
	}

	function hideBlocks(blocks, offset) {
		blocks.each(function() {
			( $(this).offset().top > $win.scrollTop() + $win.height() * offset ) && $(this).addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(i) {
			var el = $(this);
			if (el.offset().top <= $win.scrollTop() + $win.height() * offset && el.hasClass('is-hidden')) {
				setTimeout(function() {
				    el.removeClass('is-hidden').addClass('bounce-in');
				}, 100 * i);
			}
		});
	}

	function hideBorders(blocks, offset) {
		blocks.each(function() {
			if ($(this).offset().top > $win.scrollTop() + $win.height() * offset ) {
				$(this).addClass('is-hidden');
			} else {
				$(this).find('.border').addClass('active');
			}
		});
	}

	function animateBorders(blocks, offset) {
		blocks.each(function() {
			var el = $(this);
			if (el.offset().top <= $win.scrollTop() + $win.height() * offset && el.hasClass('is-hidden')) {
				el.removeClass('is-hidden');
				el.find('.border').each(function(i) {
					var border = $(this);
					setTimeout(function() {
					    border.addClass('active');
					}, 200 * i);
				});
			}
		});
	}

	$win.on('scroll', function() {
		didScroll = true;

		// animates speaker blocks
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(speakerBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(speakerBlocks, offset); });

		// animates timeline borders
		(!window.requestTimelineAnimation) 
			? setTimeout(function(){ animateBorders(timelineBlocks, offset); }, 100)
			: window.requestTimelineAnimation(function(){ animateBorders(timelineBlocks, offset); });
	});

	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 250);

	// get nav position on load
	hasScrolled();

	// hide speaker blocks which are outside the viewport
	hideBlocks(speakerBlocks, offset);
	// remove borders from timeline blocks
	hideBorders(timelineBlocks, offset);
});