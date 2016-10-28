$(function(){

	$.ajax({
		url: "http://netflixroulette.net/api/api.php",
		
		data:{
			title: "The Big Boss"
		},
		type: "GET",
		dataType: "json"
	})
	.done(function( json ) {
		$(".app" ).css( "background-image", "url("+json.poster+")" );
		$(".title h3" ).html(json.show_title);
		$(".rating").append(json.rating+'<i class="fa fa-star" aria-hidden="true"></i>');
		$(".description p" ).html( json.summary );
		$(".additional-information").append('<li>'+json.release_year+'<li>'+json.runtime+'</li><li>'+json.category+'</li>');
		$(".image" ).css( "background-image", "url("+json.poster+")" );
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
		}
	});
	$(".liu-kang").click(function(e){
		$(this).children().animate({opacity: '0'}, 500, function(){
			$(this).parent().removeClass("fight");
		});
		kkeys = [];
	});
});