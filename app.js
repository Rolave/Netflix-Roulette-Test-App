$(function(){

	$.ajax({
		url: "https://netflixroulette.net/api/api.php",
		
		data:{
			actor: "Bruce Lee"
		},
		type: "GET",
		dataType: "json"
	})
	.done(function( json ) {
		var movie = '';
		$.each(json, function(i, val){
			movie += '<div class="image" style="background-image: url('+json[i].poster+');"><div class="info"><div class="title">';
			movie += '<h3>'+json[i].show_title+'</h3>';
			movie += '<h5><strong>Director:</strong> '+json[i].director+'</h5>';
			movie += '<div class="rating">'+json[i].rating+'<i class="fa fa-star" aria-hidden="true"></i></div></div>';
			movie += '<div class="description"><p>'+json[i].summary+'</p>';
			movie += '<ul class="additional-information"><li>'+json[i].release_year+'</li><li>'+json[i].runtime+'</li><li>'+json[i].category+'</li></ul></div>';
			movie += '</div></div></div>';
		});
		$('.movies').html(movie);
		$('.image').first().fadeIn('fast');
		$('.rating').delay(1000).fadeIn('fast','swing');
		$('.rating').animate({top: '-30px'},'fast', 'swing');
		$(".dislike").click(function(e){
			$('.image').first().fadeOut("fast", function(){
				$(this).remove();
				$('.image').first().fadeIn('fast');
			});
		});
		$(".like").click(function(e){
			$('.image').first().fadeOut("fast", function(){
				$(this).clone().appendTo('.movies');
				$(this).remove();
				$('.image').first().fadeIn('fast');
			});
		});

	})
	.fail(function( xhr, status, errorThrown ) {
		alert( "Sorry, there was a problem!" );
		console.log( "Error: " + errorThrown );
		console.log( "Status: " + status );
		console.dir( xhr );
	})
	// Code to run regardless of success or failure;
	.always(function( xhr, status ) {
		console.log( "The request is complete!" );
	});


	//Konami Code
	var kkeys = [],
		konami = "38,38,40,40,37,39,37,39,66,65";
	$(document).keydown(function(e) {
		kkeys.push( e.keyCode );
		if ( kkeys.toString().indexOf( konami ) >= 0 ) {

			$(document).unbind('keydown',arguments.callee);
			// do something awesome
			$(".liu-kang").addClass("fight");
			var audio = {};
			audio["walk"] = new Audio();
			audio["walk"].src = "sounds/LiuTrke1.wav"
			audio["walk"].addEventListener('load', function () {
				audio["walk"].play();
			});
			}
	});
	$(document).keydown(function(e) {
		// ESCAPE key pressed
		if (e.keyCode == 27) {
			$(".liu-kang").animate({opacity: '0'}, 500, function(){
				$(this).removeClass("fight");
			});
		}
	});
	$(".liu-kang").click(function(e){
		$(this).children().animate({opacity: '0'}, 500, function(){
			$(this).parent().removeClass("fight");
		});
		kkeys = [];
	});
});