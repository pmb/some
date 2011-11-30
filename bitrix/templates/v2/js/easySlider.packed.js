/*
 * 	Easy Slider - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/3783/jquery-plugin-easy-image-or-content-slider
 *
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
/*
 *	markup example for $("#images").easySlider();
 *	
 * 	<div id="images">
 *		<ul>
 *			<li><img src="images/01.jpg" alt="" /></li>
 *			<li><img src="images/02.jpg" alt="" /></li>
 *			<li><img src="images/03.jpg" alt="" /></li>
 *			<li><img src="images/04.jpg" alt="" /></li>
 *			<li><img src="images/05.jpg" alt="" /></li>
 *		</ul>
 *	</div>
 *
 */

(function($) {

	$.fn.easySlider = function(options){
	  
		// default configuration properties
		var defaults = {
			prevId: 		'prevBtn',
			prevText: 		'Previous',
			nextId: 		'nextBtn',	
			nextText: 		'Next',
			orientation:	'', //  'vertical' is optional;
			speed: 			800			
		}; 
		
		var options = $.extend(defaults, options);  
        var obj;
		
		return this.each(function() {  
			obj = $(this); 				
            var fc=$("li:first-child", obj).html();
            var lc=$("li:last-child", obj).html();
            
            var html='<ul><li>'+lc+'</li>';
            $('#'+$(this).attr('id')+' li').each(function(){
                html+='<li>'+$(this).html()+'</li>';
            });
            html+='<li>'+fc+'</li></ul>';
            $(this).html(html);
            
			var s = $("li", obj).length;
			var w = obj.width(); 
			var h = obj.height(); 
			var ts = s-2;
			var t = 1;
            var curLi=0;
            $("li",obj).each(function(){
                curLi++;
                if(t+1==curLi) $(this).addClass('active');
            });

			var vertical = (options.orientation == 'vertical');
			if(!vertical) $("ul", obj).css('width',s*w);			
			if(!vertical) $("li", obj).css('float','left');
			$(obj).after('<span id="'+ options.prevId +'"><a href=\"javascript:void(0);\">'+ options.prevText +'</a></span> <span id="'+ options.nextId +'"><a href=\"javascript:void(0);\">'+ options.nextText +'</a></span>');		
//			$("a","#"+options.prevId).hide();
//			$("a","#"+options.nextId).hide();
			$("a","#"+options.prevId).click(function(){
				animate("next");
                if (t>ts) animate("first");
//				if (t>=ts) $(this).fadeOut();
//				$("a","#"+options.prevId).fadeIn();
			});
			$("a","#"+options.nextId).click(function(){		
				animate("prev");
                if (t<0) animate("last");
//				if (t<=0) $(this).fadeOut();
//				$("a","#"+options.nextId).fadeIn();
			});
            
            var animateB=true;
            var p =0;
            if(!vertical){
                p=(t*w*-1);
                $("ul",obj).css('marginLeft', p+'px');
            } else {
                p=(t*h*-1);
                $("ul",obj).css('marginTop', p+'px');
            }
			function animate(dir){
                animateB=true;
				if(dir == "next"){
                    t=t+1;    
                    if(t>ts) {
                        t=0;
                        animateB=false;
                    }
//					t = (t>=ts) ? ts : t+1;	
				} else {
                    t = t-1;
                    if(t<0) {
                        t=ts;
                        animateB=false;
                    }
//					t = (t<=0) ? 0 : t-1;
				};								
                if(dir == "first"){
                    t=0;
                }
                if(dir == "last"){
                    t=ts;
                }
                if(animateB==true){
				if(!vertical) {
					p = (t*w*-1);
					$("ul",obj).animate(
						{ marginLeft: p }, 
						options.speed
					);				
				} else {
					p = (t*h*-1);
					$("ul",obj).animate(
						{ marginTop: p }, 
						options.speed
					);					
				}
                } else {
                    if(!vertical){
                        p = (t*w*-1);
                        $("ul",obj).css('marginLeft', p+'px');
                    } else {
                        p = (t*h*-1);
                        $("ul",obj).css('marginTop', p+'px');
                    }
//                    if(t==0) t=1;
                    if(t==ts) $("a","#"+options.nextId).click();
                    if(t==0) $("a","#"+options.prevId).click();
                }
                
                $("li",obj).removeClass('active');
                var curLi=0;
                $("li",obj).each(function(){
                    curLi++;
                    if(t+1==curLi) $(this).addClass('active');
                });
                
//alert(t);
//                alert(t);
			};
//			if(s>1) $("a","#"+options.nextId).fadeIn();	
		});
	  
	};

})(jQuery);