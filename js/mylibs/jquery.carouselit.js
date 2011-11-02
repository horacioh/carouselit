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
			
			$(container).css({"width"		: ulSize+"px",
							  "left"		: -(current * liSize),
							  "position"	: "absolute"
			
			});
			
			$(this).css({ "width"		: divSize+"px",
						  "height"		: carousel_height+"px",
						  "visibility"	: "visible",
						  "overflow"	: "hidden",
						  "position"	: "relative"
			
			});
			
			if (current == 0){
				$(prevBtn).css("display", "none");
			}
	 
			$(nextBtn).click(function(e) {
				e.preventDefault();
				if(current + step < 0 || current + step > maximum - visible) {return; }
				else {
					current = current + step;
					$(container).animate({left: -(liSize * current)}, speed, null);
					$(prevBtn).css("display", "block");
					if (current + step == maximum) {
						$(this).css("display", "none");
					}
				}
				return false;
			});
	 
			$(prevBtn).click(function(e) {
				e.preventDefault();
				if(current - step < 0 || current - step > maximum - visible) {
					$(this).css("display", "none");
					return; 
				} else {
					current = current - step;
					$(container).animate({left: -(liSize * current)}, speed, null);
					$(nextBtn).css("display", "block");
					if (current == 0) { $(this).css("display", "none"); }
				}
				return false;
			});
		});
	}
})(jQuery);