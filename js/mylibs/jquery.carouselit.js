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
	$.fn.carouselit = function(step, visible, speed, liSize, prevBtn, nextBtn){
		return this.each(function(){
		
			var container = $(this).children();
			var maximum = $(container).find('li').size(); 
			var carousel_height = $(this).height()+20;
	 		var current = 0;
			var ulSize = liSize * maximum;   
			var divSize = liSize * visible;
			
			
			// adding some css to the container object (ul)
			$(container).css({"width"		: ulSize+"px",				// setting the total width of the container object to the total widht of all 'li' childs
							  "left"		: current * liSize,			// starting position for the container
							  "position"	: "absolute"				// setting it to absolute to get control of it for future positioning changes
			
			});
			
			// adding some css to the wrapper object (the one you call) ; this element works as a mask for the container, is the visible area of your carousel
			$(this).css({ "width"		: divSize+"px",					// setting the width of the mask or wrapper
						  "height"		: carousel_height+"px",			// setting the height of the element
						  "visibility"	: "visible",
						  "overflow"	: "hidden",
						  "position"	: "relative"					// this is to set the absolute position of the container relative to this element,
						  												// and not relative to the whole HTML 
			
			});
			
			if (current == 0){
				$(prevBtn).addClass('disable');  // conditional to hide 
			}
	 
			$(nextBtn).click(function(e) {
				e.preventDefault();
				if(current + step < 0 || current + step > maximum - visible) {return; }
				else {
					current = current + step;
					$(container).animate({left: -(liSize * current)}, speed, null);
					$(prevBtn).removeClass('disable');
					if (current + step == maximum) {
						$(this).addClass('disable');
					}
				}
				return false;
			});
	 
			$(prevBtn).click(function(e) {
				e.preventDefault();
				if(current - step < 0 || current - step > maximum - visible) {
					$(this).addClass('disable');
					return; 
				} else {
					current = current - step;
					$(container).animate({left: -(liSize * current)}, speed, null);
					$(nextBtn).removeClass('disable');
					if (current == 0) { $(this).addClass('disable'); }
				}
				return false;
			});
		});
	}
})(jQuery);