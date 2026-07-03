(function($) {
	
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			if (windowpos >= 1) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}
		}
	}
	
	headerStyle();
	
	
	//Hidden Sidebar
	if ($('.hidden-bar').length) {
		var hiddenBar = $('.sidebar-btn');
		var hiddenBarOpener = $('.sidebar-btn');
		var hiddenBarCloser = $('.hidden-bar-closer');
		$('.hidden-bar-wrapper').mCustomScrollbar();
		
		//Show Sidebar
		hiddenBarOpener.on('click', function () {
			hiddenBar.addClass('visible-sidebar');
		});
		
		//Hide Sidebar
		hiddenBarCloser.on('click', function () {
			hiddenBar.removeClass('visible-sidebar');
		});
	}
	
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		//Disable dropdown parent link
		$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
		
		//Dropdown Button
		$('.banner-section .carousel-column .inner-column .pager-box .pager.two').on('click', function() {
			$('.mobile-small-image').addClass('visible');
		});
		
		//Dropdown Button
		$('.banner-section .carousel-column .inner-column .pager-box .pager.one').on('click', function() {
			$('.mobile-small-image').removeClass('visible');
		});
		
		//Dropdown Button
		$('.banner-section .carousel-column .inner-column .pager-box .pager.three').on('click', function() {
			$('.mobile-small-image').removeClass('visible');
		});
		
		
		
		//Dropdown Button
		$('.banner-section .carousel-column .inner-column .pager-box .pager.three').on('click', function() {
			$('.heart-image-icon').addClass('visible-heart');
		});
		
		//Dropdown Button
		$('.banner-section .carousel-column .inner-column .pager-box .pager.one').on('click', function() {
			$('.heart-image-icon').removeClass('visible-heart');
		});
		//Dropdown Button
		$('.banner-section .carousel-column .inner-column .pager-box .pager.two').on('click', function() {
			$('.heart-image-icon').removeClass('visible-heart');
		});
		
		
		
		//Dropdown Button
		$('.banner-section .carousel-column .inner-column .pager-box .pager.three').on('click', function() {
			$('.plus-small-image').addClass('visible-plus');
		});
		
		//Dropdown Button
		$('.banner-section .carousel-column .inner-column .pager-box .pager.one').on('click', function() {
			$('.plus-small-image').removeClass('visible-plus');
		});
		//Dropdown Button
		$('.banner-section .carousel-column .inner-column .pager-box .pager.two').on('click', function() {
			$('.plus-small-image').removeClass('visible-plus');
		});
		
		
	}
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			var sticky_header = $('.main-header .sticky-header');
			if (windowpos > 100) {
				siteHeader.addClass('fixed-header');
				sticky_header.addClass("animated slideInDown");
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				sticky_header.removeClass("animated slideInDown");
				scrollLink.fadeOut(300);
			}
		}
	}
	
	headerStyle();
	
	
	
	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
		
		//Dropdown Button
		$('.pricing-tabs .tab-buttons .yearly').on('click', function() {
			$('.round').addClass('boll-right');
		});
		
		//Dropdown Button
		$('.pricing-tabs .tab-buttons .monthly').on('click', function() {
			$('.round').removeClass('boll-right');
		});
		
	}
	
	
	
	//Fixed Right Top Consultation Form Toggle
	if($('.main-header .header-upper .outer-box.info-btn').length){
		
		//Show Form
		$('.main-header .header-upper .outer-box.info-btn').on('click', function(e) {
			e.preventDefault();
			$('body').addClass('background-visible');
		});
		
		//Hide Form
		$('.form-back-drop').on('click', function(e) {
			e.preventDefault();
			$('body').removeClass('background-visible');
		});
		
		$('.form-back-drop').on('click', function(e) {
			$('.hidden-bar').removeClass("visible-sidebar");
		});
		
		$('.hidden-bar .hidden-bar-closer').on('click', function(e) {
			$('body').removeClass("background-visible");
		});
		
	}
	
	
	//Add One Page nav
	if($('.scroll-nav').length) {
		$('.scroll-nav ul').onePageNav();
	}
	
	
	//Parallax Scene for Icons
	if($('.parallax-scene-1').length){
		var scene = $('.parallax-scene-1').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-2').length){
		var scene = $('.parallax-scene-2').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-3').length){
		var scene = $('.parallax-scene-3').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	
	
	
	if($('.paroller').length){
		$('.paroller').paroller({
			  factor: 0.2,            // multiplier for scrolling speed and offset, +- values for direction control  
			  factorLg: 0.4,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			  type: 'foreground',     // background, foreground  
			  direction: 'horizontal' // vertical, horizontal  
		});
	}
	
	
	
	//Custom Pager Slider / Testimonials Slider
	if($('.banner-slider').length){
		var customPagerSlider = $(".banner-slider").bxSlider({
			adaptiveHeight: true,
			//auto:false,
			controls: true,
			pause: 5000,
			speed: 1000,
			nextText: '<span class="control-icon fa fa-angle-right"></span>',
			prevText: '<span class="control-icon fa fa-angle-left"></span>',
			pagerCustom: '#banner-pager',
			//onSlideAfter: function() {
				//customPagerSlider.stopAuto();
				//customPagerSlider.startAuto();
			//}
		});
	}
	
	
	
	// if ($('.testimonials-thumb-carousel').length) {
		// var galleryThumbs = new Swiper('.gallery-thumbs', {
		 // spaceBetween: 10,
		  // slidesPerView: 4,
		  // freeMode: true,
		  
		  // watchSlidesVisibility: true,
		  // watchSlidesProgress: true,
		// });
		// var galleryTop = new Swiper('.gallery-top', {
		  // spaceBetween: 10,
		  // navigation: {
			// nextEl: '.swiper-button-next',
			// prevEl: '.swiper-button-prev',
		  // },
		  // thumbs: {
			// swiper: galleryThumbs
		  // }
		// });
	// }
	
	
	
	//Custom Pager Slider / Testimonials Slider
	if($('.testimonials-slider').length){
		var customPagerSlider = $(".testimonials-slider").bxSlider({
			adaptiveHeight: true,
			auto:true,
			controls: true,
			pause: 5000,
			speed: 1000,
			nextText: '<span class="control-icon fa fa-angle-right"></span>',
			prevText: '<span class="control-icon fa fa-angle-left"></span>',
			pagerCustom: '#testimonials-pager',
			onSlideAfter: function() {
				customPagerSlider.stopAuto();
				customPagerSlider.startAuto();
			}
		});
	}
	
	
	
	
	
	
	
	
	
	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}
	
	
	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}
	
	
	if ($('.appScreenshotCarousel-container').length) {
		if ($('.appScreenshotCarousel-container').length) {

			var swiper = new Swiper('.appScreenshotCarousel-container', {
				effect: 'coverflow',
				loop: true,
				centeredSlides: true,
				slidesPerView: 4,
				initialSlide: 4,
				keyboardControl: true,
				mousewheelControl: false,
				lazyLoading: true,
				preventClicks: false,
				preventClicksPropagation: false,
				lazyLoadingInPrevNext: true,
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				coverflow: {
					rotate: 0,
					stretch: 0,
					depth: 250,
					modifier: .5,
					slideShadows: false,
				},
				breakpoints: {
					1199: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
					991: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
					767: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					575: {
						slidesPerView: 1,
						spaceBetween: 5,
					}
				}
			});

		}
	}
	
	
	// Single Item Carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoplay: 6000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				},
				1500:{
					items:1
				}
			}
		});    		
	}
	
	
	// Team Carousel
	if ($('.team-carousel').length) {
		$('.team-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			center:true,
			smartSpeed: 500,
			autoplay: 4000,
			navText: [ '<span class="icons-angle-pointing-to-left"></span>', '<span class="icons-angle-arrow-pointing-to-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:3
				},
				1024:{
					items:3
				}
			}
		});    		
	}
	
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}
	
	
	
	
	
	
	
	
	//Custom Seclect Box
	if($('.custom-select-box').length){
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}
	
	
	//Gallery Filters
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}
	
	
	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}
	
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				lastname: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
	});	

})(window.jQuery);