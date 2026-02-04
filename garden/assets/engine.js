$(function() {
		
	$('#time').jclock();
	
	/* columnise folders */
	var fN = $('.folder').length;
	var fH = $('#folders').height() + 100;
	var wH = $(window).height();
	var wW = $(window).width();
	
	if(fH > wH)
	{
		var fIH = fH / fN;
		var fpW = wH / fIH;
		fpW = parseInt(fpW);
		var colN = ( parseInt(fH / wH)+1 );
		
		for(i=0;i<(colN-1);i++) {
			$('#folders').after('<div id="folders'+(i+2)+'" class="folders"/>');
			$('.folder_wrapper').slice((fpW*(i+1)), ((fpW*2)*(i+1))).appendTo('#folders'+(i+2));
		}
	}
	
	/* make folders draggable and invert icon when drag starts */
	$('.folder').draggable({
		scroll: false,
		start: function(){
		
			$('.folder').contents().find('img').attr({src: 'assets/gfx/disk.gif'});
			$(this).contents().find('img').attr({src: 'assets/gfx/disk_black.gif'});

			$('.folder_text').removeClass('folder_text-inverted');
			$(this).contents().find('.folder_text').addClass('folder_text-inverted');

		}
	});
	
	$('.plant').draggable();

	$('.folder').bind("click", function(){

			$('.folder').contents().find('img').attr({src: 'assets/gfx/disk.gif'});
			$(this).contents().find('img').attr({src: 'assets/gfx/disk_black.gif'});

			$('.folder_text').removeClass('folder_text-inverted');
			$(this).contents().find('.folder_text').addClass('folder_text-inverted');
	});
	

	/* this variable is used to make a selected window come up on top of the others
	   after an icon is double-clicked */
	var z = 50;
	
	first = true;
	
	/* load windows of icon double-clicked on */
	$('.folder').bind("dblclick", function(){
		
		if(first) {
			first = false;
			$('.note').delay(2000).show('blind', 500).delay(5000).hide('blind', 500);
		}

		var name = $(this).find('.folder_text').html();

		$('#description').fadeOut(2000);
	 	//var icon = $(this).contents().text();
	 	var icon = $(this).data('src');
		
		if (icon) {
			if (icon.toString().indexOf('http') === 0) {
				window.open(icon, '_blank');
				return;
			}
			if (icon.toString().indexOf('../') === 0) {
				window.location.href = icon;
				return;
			}
		}

		var content = '<div class="img_holder" style="position: absolute; top: 50px; left: 50px; z-index: 100; width: 300px;">' +
			'<div style="background: url(\'assets/gfx/window_bg.gif\'); height: 17px; width: 100%;">' +
				'<div class="window_left">' +
					'<img src="assets/gfx/window_left.gif" style="border:none;">' +
				'</div>' +
				'<div style="float: right;">' +
					'<img src="assets/gfx/window_right.gif" style="border:none;">' +
				'</div>' +
			'</div>' +
			'<div class="img_wrapper" style="background: white; border-top: none; padding: 20px; font-family: \'bas\', sans-serif; font-size: 12px; line-height: 1.4;">' +
				'<h3 style="margin-top: 0; font-family: \'chi\'; font-size: 14px;">My Music</h3>' +
				'<p>Welcome to my generic window. The folders are currently under construction.</p>' +
				'<hr>' +
				'<p>Now playing: Iskandar</p>' +
				'<audio controls style="width: 100%;">' +
					'<source src="assets/music/iskandar.mp3" type="audio/mpeg">' +
					'Your browser does not support audio.' +
				'</audio>' +
			'</div>' +
		'</div>';

		$('#windows').html(content);

		// Initialize draggable and events for the new content
		$('div.img_holder').draggable({ 
			start: function(){ 
				z = z + 1; 
				$(this).css({ 'z-index': z }); 
			}
		}).click(function(){ 
			z = z + 1; 
			$(this).css({ 'z-index': z }); 
		});
		
		$("div.img_holder").bind("dblclick", function(){ $(this).remove(); });
	
		$('.window_left').mousedown(function(){
			$(this).find('img').attr('src', 'assets/gfx/window_left-close.gif');
		});
		$('.window_left').mouseup(function(){
			$(this).closest('.img_holder').remove();
		});	  
		
		/* invert icon when double-clicked, as when dragged */		
		$('.folder').contents().find('img').attr({src: 'assets/gfx/disk.gif'});
		$(this).contents().find('img').attr({src: 'assets/gfx/disk_black.gif'});
		$('.folder_text').removeClass('folder_text-inverted');
		$(this).contents().find('.folder_text').addClass('folder_text-inverted');

	});
	
	// reset inverted icon when clicking bg
	$('#bg').click(function(){
		$('.folder').contents().find('img').attr({src: 'assets/gfx/disk.gif'});
		$('.folder_text').removeClass('folder_text-inverted');
	});



	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	    //$('#no-mobile').show();
	    window.location = '/mobile/';
	}

		
});