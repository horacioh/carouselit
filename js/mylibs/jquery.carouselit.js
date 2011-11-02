/*

--> carouselit jQuery Plugin <--

author			: Horacio Herrera
website			: hherrerag.com
twitter			: @hhg2288
email:			: me@hherrerag.com

description		: plugin to made a simple carousel of list objects


	SYNTAX:
	"selector" .myCarousel( step, visible, speed, liSize, prevBtn, nextBtn );
		step		--->	 how many blocks it move
		visible		--->	 how many block are visible
		speed		--->	 in miliseconds
		liSize		--->	 width of every li object in pixels
		prevBtn		--->	 selector of previews anchor object
		nextBtn		--->	 selector of next anchor object
*/

(function($) {
	$.fn.carouselit = function( options ){
		
		var settings = {
      		'step'			: 1,
      		'visible'		: 1,
      		'speed'			: 1000,
      		'liSize'		: 0,
      		'prevBtn'		: '#prev',
      		'nextBtn'		: '#next'
    	};
		
		return this.each(function(){
      		
      		if ( options ) {											// If options exist, lets merge them
        		$.extend( settings, options );							// with our default settings
      		}
		
			var $this = $(this);
			var container = $this.children();
			var maximum = $(container).find('li').size(); 
			var carousel_height = $this.height()+20;
	 		var current = 0;
			var ulSize = settings.liSize * maximum;   
			var divSize = settings.liSize * settings.visible;
			
			
			// adding some css to the container object (ul)
			$(container).css({"width"		: ulSize+"px",				// setting the total width of the container object to the total widht of all 'li' childs
							  "left"		: current * settings.liSize,			// starting position for the container
							  "position"	: "absolute"				// setting it to absolute to get control of it for future positioning changes
			
			});
			
			// adding some css to the wrapper object (the one you call) ; this element works as a mask for the container, is the visible area of your carousel
			$this.css({ "width"		: divSize+"px",					// setting the width of the mask or wrapper
						  "height"		: carousel_height+"px",			// setting the height of the element
						  "visibility"	: "visible",
						  "overflow"	: "hidden",
						  "position"	: "relative"					// this is to set the absolute position of the container relative to this element,
						  												// and not relative to the whole HTML 
			
			});
			
			if (current == 0){
				$(settings.prevBtn).addClass('disable');  // conditional to hide 
			}
	 
			$(settings.nextBtn).click(function(e) {
				e.preventDefault();
				if(current + settings.step < 0 || current + settings.step > maximum - settings.visible) {return; }
				else {
					current = current + settings.step;
					$(container).animate({left: -(settings.liSize * current)}, settings.speed, null);
					$(settings.prevBtn).removeClass('disable');
					if (current + settings.step == maximum) {
						$(this).addClass('disable');
					}
				}
				return false;
			});
	 
			$(settings.prevBtn).click(function(e) {
				e.preventDefault();
				if(current - settings.step < 0 || current - settings.step > maximum - settings.visible) {
					$(this).addClass('disable');
					return; 
				} else {
					current = current - settings.step;
					$(container).animate({left: -(settings.liSize * current)}, settings.speed, null);
					$(settings.nextBtn).removeClass('disable');
					if (current == 0) { $(this).addClass('disable'); }
				}
				return false;
			});
		});
	}
})(jQuery);