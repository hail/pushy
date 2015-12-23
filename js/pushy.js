/*! Pushy - v0.9.1 - 2013-9-16
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

(function($) {
	$.fn.pushy = function(options) {
		options = $.extend({
			pushy: $('.pushy'),
			body: $('body'),
			container: $('#container'),
			push: $('.push'),
			siteOverlay: $('.site-overlay'),
			pushyClass: 'pushy-left pushy-open',
			pushyActiveClass: 'pushy-active',
			containerClass: 'container-push',
			pushClass: 'push-push',
			menuBtn: $('.menu-btn, .pushy a'),
			menuSpeed: 200,
			menuWidth: $('.pushy').width() + 'px'
		});

		function togglePushy() {
			options.body.toggleClass(options.pushyActiveClass);
			options.pushy.toggleClass(options.pushyClass);
			options.container.toggleClass(options.containerClass);
			options.push.toggleClass(options.pushClass);
		}

		function openPushyFalback() {
			options.body.addClass(options.pushyActiveClass);
			options.pushy.animate({left: '0px'}, options.menuSpeed);
			options.container.toggleClass(options.containerClass);
			options.push.toggleClass(options.pushClass);
		}

		function closePushyFallback() {
			options.body.removeClass(options.pushyActiveClass);
			options.pushy.animate({left: '0px'}, options.menuSpeed);
		}

		$.fn.pushy.reattachMenuBtn = function() {
			options.menuBtn.off('click');

			if (Modernizr.csstransforms3d) {
				$('.menu-btn').click(function(e) {
					e.preventDefault();
					togglePushy();
				});
			} else {
				$('.menu-btn').click(function(e) {
					e.preventDefault();
					if (state) {
						openPushyFallback();
						state = false;
					} else {
						closePushyFallback();
						state = true;
					}
				});
			}
		};

		if (Modernizr.csstransforms3d) {

			options.menuBtn.click(function(e) {
				e.preventDefault();
				togglePushy();
			});

			options.siteOverlay.click(function() {
				togglePushy();
			});

		} else {

			options.pushy.css({left: "-" + options.menuWidth}); //hide menu by default
			options.container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

			//keep track of menu state (open/close)
			var state = true;

			//toggle menu
			options.menuBtn.click(function(e) {
				e.preventDefault();
				if (state) {
					openPushyFallback();
					state = false;
				} else {
					closePushyFallback();
					state = true;
				}
			});

			options.siteOverlay.click(function() {
				if (state) {
					openPushyFallback();
					state = false;
				} else {
					closePushyFallback();
					state = true;
				}
			});

		}
	};
})(jQuery);
