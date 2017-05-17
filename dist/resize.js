
$(document).ready(function(){

	$(".footer").show();

    /*$("#first").flip({
        trigger: 'hover',
		axis: 'x'

    });
	$(".flip").flip({
        trigger: 'click'
    });*/

});
$(document).ready(function(){
	new WOW().init();
	$("#owl-example").owlCarousel({

      slideSpeed : 600,
      paginationSpeed : 400,
	  autoPlay: 6000,
	  transitionStyle : "fade",
	  items: 3,
		itemsDesktop: false,
		itemsDesktopSmall: false,
		itemsTablet: false,
		itemsMobile: false


      // "singleItem:true" is a shortcut for:
      // items : 1,
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
	});

	//share
	$('.share_twitter').click(function(){
		window.open('http://twitter.com/share?text=這個粉專超讚！！%0A&url=https://www.facebook.com/NthuCarelife/',
		'test', 'left = 100, top = 200, width = 600, height = 400');
	});
	$('.share_facebook').click(function(){
		window.open('https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https://www.facebook.com/NthuCarelife/&redirect_uri=https://developers.facebook.com/tools/explorer',
		'test', 'left = 100, top = 200, width = 600, height = 600');
	});
	$('.share_google').click(function(){
		window.open('https://plus.google.com/share?url=https%3A//www.facebook.com/NthuCarelife/',
		'test', 'left = 100, top = 200, width = 600, height = 600');
	});

});

//when resize or load website
