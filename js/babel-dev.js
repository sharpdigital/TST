/*
 * Babel v1.0
 * Copyright 2014 Limitless LLC
 */




jQuery(document).ready(function($) {
   'use strict';

	//Default Settings
	var homeVideoMuted = true;


   	//Vars
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	//Basics
	$(document).scroll(function() {
		var y = $(this).scrollTop();
		if($(this).scrollTop()>10) {
			$('header').stop().animate({ backgroundColor: 'rgba(0,0,0,1)' }, 'fast');
		} else {
			if(!$("body").hasClass("no-cover")) {
				$('header').stop().animate({ backgroundColor: 'rgba(0,0,0,0)' }, 'fast');
			}
		}
	});
	//Basics

	//Navigate
	$(".subscribe .arrow").click(function(e){
		$('html,body').animate({scrollTop: 0}, 'slow')
		return false;
	});

	$("header .logo").click(function(e){
		window.open("index.html", "_self");
	});

	$(".navigation li, .notfound button").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, "_self");
	});
	//Navigate

	//Navigation Menu
    $("header .menu").click(function(e){
    	if ($('header .navigation').is(":hidden")) {
			var md = windowHeight - ($('header .navigation li').length * 34);
    		$('header').stop().animate({ height: windowHeight }, 'slow');
    		$('header .logo').stop().animate({ top: windowHeight - 55 }, 'fast');
    		$('header .menu').stop().animate({ top: windowHeight - 45 }, 'fast');
			$('header .navigation').slideDown("fast","easeInQuart");
    		$('header .navigation ul').stop().animate({ marginTop: md / 2 }, 'fast');
		} else {
    		$('header .logo').stop().animate({ top: 15 }, 'fast');
    		$('header .menu').stop().animate({ top: 25 }, 'fast');
			$('header .navigation').slideUp("fast","easeOutQuart");
    		$('header').stop().animate({ height: 70 }, 'slow');
		}
    });
	//Navigation Menu

	//Home
	$(".home .slide").each(function() {
		$(this).css("background-image", "url("+$(this).attr("data-url")+")");
	});

	$('.home').flexslider({
	    animation: "fade",
	    animationLoop: true,
	    animationSpeed: 5000,
	    easing: "easeOutBack",
	    slideshow: true,
	    pauseOnHover: false,
	    controlNav: false,
	    directionNav: false
 	});

 	$(".home.en button.welcome").click(function(){
		window.open('about.html', '_self');
	});

 	$(".home.es button.welcome").click(function(){
		window.open('introduccion.html', '_self');
	});

	//$(".home video").prop('muted', homeVideoMuted);
	//Home

	//About
	$(".about .team .image, .works .quotes .image, .services .filter li, .comment-author .photo").each(function() {
		$(this).css("background-image", "url("+$(this).attr("data-url")+")");
	});

	$(".about .fact, .about .team .member").hover(function(e){
		$(".about .fact, .about .team .member").stop().animate({ opacity: 0.5 }, 'slow');
		$(this).stop().animate({ opacity: 1 }, 'slow');
	}, function(){
		$(".about .fact, .about .team .member").stop().animate({ opacity: 1 }, 'slow');
	});

	$(".about .team .member .twitter").click(function(){
		var url = $(this).text();
		window.open('http://www.twitter.com/' + url, '_blank');
	});
	//About

	//Featured
	$(".featured .logos .item div").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, '_blank');
	});
	//Featured

	//Work
	$(".works .filter li").click(function(){
		var cat = $(this).text().toLowerCase();
		if(cat != "all") {
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			$(".works .work").stop().animate({ opacity: 1 }, 'slow');
			$(".works .work").each(function() {
				var wrk = $(this).find(".subtitle").text().toLowerCase();
				if( wrk != cat) {
					$(this).stop().animate({ opacity: 0.1 }, 'slow');
				}
			});
		} else {
			$(".works .work").stop().animate({ opacity: 1 }, 'slow');
		}
	});

	$(".work .info").hover(function(e){
		$(this).stop().animate({ opacity: 1 }, 'slow');
	}, function(){
		$(this).stop().animate({ opacity: 0 }, 'slow');
	});

	$(".work").click(function(){
		var projectUrl = $(this).attr("data-url");
		var projectLocation = $(this).offset().top;
		console.log(projectLocation);
        $.ajax({
            url: projectUrl
        }).success(function (data) {
            $('.works .preview').fadeIn("fast");
            $('.works .preview').html(data);
            $('html,body').animate({
                scrollTop: $('.works .preview').offset().top - 70
            }, 500);
            $('.project .close').click(function () {

            	$('.works .preview').fadeOut("fast");
                $('html,body').animate({ scrollTop: projectLocation - 70 }, 500);
                setTimeout(function () {
                    $('.works .preview').html('');
                }, 1000);
            });

			$('.project .slider').flexslider({
				animation: "slide",
				slideshow: true,
				directionNav: false,
				controlNav: true,
				animationSpeed: 600
			});

			var t = $('.project .player').attr("data-type");
			var u = $('.project .player').attr("data-url");

			if(t==="youtube") {

				var d = '<iframe width="440" height="330" src="//www.youtube.com/embed/'+ u +'?rel=0" frameborder="0" allowfullscreen></iframe>';
				$('.project .player').html(d);

			} else if (t==="vimeo") {
				var d = '<iframe src="//player.vimeo.com/video/'+ u + '?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="440" height="330" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
				$('.project .player').html(d);

			} else if (t==="soundcloud") {
				var d = '<iframe width="440" height="333" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + u + '&amp;auto_play=false&amp;hide_related=false&amp;visual=true"></iframe>'
				$('.project .player').html(d);
			}

        });

		return false;
	});

	$(".works .quote").hover(function(e){
		$(".works .quote").stop().animate({ opacity: 0.5 }, 'slow');
		$(this).stop().animate({ opacity: 1 }, 'slow');
	}, function(){
		$(".works .quote").stop().animate({ opacity: 1 }, 'slow');
	});

	$(".works .start button").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, '_self');
	});
	//Work

	//Services
	$(".services .filter li").click(function(){
		var srv = $('.services .filter li').index($(this));
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		var y = $(".services .service").eq(srv).position().top - 80;
		$('html,body').animate({scrollTop: y}, 'slow');
	});

	$('.services .service').each(function() {
		var srv = $('.services .service').index($(this));
		if (srv%2 != 0) {
			$(this).addClass("dark");
			$(this).find(".image").css('padding-left', "20px");
			$(this).find(".info").css('padding-right', "20px");
		} else {
			$(this).find(".info").css('padding-left', "20px");
		}
	});

	var sectionOffset = '15%';
	$(".services .service").waypoint({
		handler: function(event, direction) {
			var name=$(this).attr("id");
			if (direction === "up")  name = $(this).prev().attr("id");
			if (direction === "up")  sectionOffset = '30%';
			var srv = $('.services .service').index($(this));
			$('.services .filter li').removeClass('active', {duration:300});
			$('.services .filter li').eq(srv).addClass('active', {duration:300});
	  	},
		offset: sectionOffset
	});
	//Services

	//History
	$('.history .milestones').flexslider({
	    animation: "slide",
	    animationLoop: true,
	    animationSpeed: 1400,
	    easing: "easeOutBack",
	    slideshow: true,
	    pauseOnHover: false,
	    controlNav: true,
	    directionNav: false,
	    start: function(){
	        $(".history .flex-control-nav li").each(function() {
	        	$(this).find(".date").stop().remove();
	        });
	        var dte = $(".history .milestones").find(".flex-active-slide").find('.title').text();
	        $(".history .flex-control-nav").find(".flex-active").parent().stop().append("<span class='date'>"+ dte +"</span>");
	    },
	    after: function(){
	        $(".history .flex-control-nav li").each(function() {
	        	$(this).find(".date").stop().remove();
	        });
	        var dte = $(".history .milestones").find(".flex-active-slide").find('.title').text();
	        $(".history .flex-control-nav").find(".flex-active").parent().stop().append("<span class='date'>"+ dte +"</span>");
	    }
 	});

	$('.blog .slider').flexslider({
	    animation: "slide",
	    animationLoop: true,
	    animationSpeed: 600,
	    easing: "easeOutBack",
	    slideshow: true,
	    pauseOnHover: false,
	    controlNav: true,
	    directionNav: false
 	});

	//History

	//Contact
	$('#submit').click(function(){

		$('.input-error').removeClass('input-error');
		$('#agreed').parent().css('background-color','');


		var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		var error = false;

		$.each($('[required]'), function (idx, el) {


			if (!$(el).val().trim() || ($(el).attr('type') && $(el).attr('type').toLowerCase() === 'email' && !email_compare.test($(el).val().trim()))) {
				$(el).addClass('input-error');
				error = true;
			}

		});

		if ($('#agreed').length && !$('#agreed').is(':checked')) {
			error = true;
			$('#agreed').parent().css('background-color','#E7ADAD');
		}

		if (error) { return false; }

		var data_string = $('.contact form').serialize();

		$.ajax({
			type: "POST",
			url: $('.contact form').attr('action'),
			data: data_string,

			success: function(message) {
				if(message === 'ok'){
					$('.message-success').fadeIn('slow');
					$('input').val('');
					$('textarea').val('');
					$('#agreed').parent().css('background-color','');
				}
				else{
					$('.message-error').fadeIn('slow');
				}
			}
		});

		return false;
	});
	//Contact

	//Footer
	$("footer .top").click(function(){
		$('html,body').animate({scrollTop: 0}, 'slow');
	});

	$("footer .social li").click(function(){
		var url = $(this).attr("data-url");
		window.open(url, '_blank');
	});
	//Footer

});


$(window).load(function() {

	fixSizes();

	if($(this).scrollTop() > 10) {
		$('header').stop().animate({ backgroundColor: 'rgba(0,0,0,1)' }, 'fast');
	} else {
		if(!$("body").hasClass("no-cover")) {
			$('header').stop().animate({ backgroundColor: 'rgba(0,0,0,0)' }, 'fast');
		}
	}


  //$(".loader").delay(1000).fadeOut('slow');
  //$(".loader").fadeOut('slow');
  $(".loader").hide();
});


$(window).resize(function() {
	fixSizes();
});

function fixSizes() {

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	$(".fullscreen").css('height', windowHeight);


	var rat = windowWidth / windowHeight;



	if (rat > (16/9)) {

		var v = windowWidth * (16/9);
		$(".home video").css('width', windowWidth);
		$(".home video").css('height', v);

		var vc = ($(".home video").height() - windowHeight) / 2;
		$(".home video").css('margin-top', '-'+vc+'px');
		$(".home video").css('margin-left', '0px');

	} else {

		var v = windowHeight * (16/9);
		$(".home video").css('height', windowHeight);
		$(".home video").css('width', v);

		var vc = ($(".home video").width() - windowWidth) / 2;
		$(".home video").css('margin-top', '0px');
		$(".home video").css('margin-left', '-'+vc+'px');

	}

	// var video = document.getElementById("movie");
	// document.addEventListener('touchstart', function(event) {
	// 	if(video) { video.play(); }
	// }, false);

	$(".vertical-center").each(function() {
		$(this).css('margin-top', ($(this).parent().height() - $(this).height()) / 2);
	});


	$('.services .service').each(function() {

		var i = $(this).find(".image").height();
		var f = $(this).find(".info").height();

		console.log(i + " " + f);

		if(i > f) {
			$(this).find(".info").css('margin-top', (i - f) / 2);
		}

	});

}
