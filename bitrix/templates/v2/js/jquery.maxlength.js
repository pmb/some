/*
* jQuery MaxLength 1.0.0
* Copyright (c) 2010 Jose Plaza
* Description: Implements simple maxlength parameter for input text, password and textarea.
* Parameters:
	- Integer max: maximum text length
	- String class_container: name of the class that implements the character counter 
* Configuration:
	- Boolean use_container: define if the input comes with information DOM to show characters remaining or not
	- String type_container: the container DOM type (div or span recommended)
	- String prev_message: previous text on the container (prev to the remainig chars)
	- String post_message: the text before remaning chars
* Internationalization:
	- Just change the messages to your language
* Usage:
	- myTextarea.maxLength(40); Set the max length to 40 chars no counter
	- myTextarea.maxLength(150,'myCounter'); Set the max length to 150 chars with counter named myCounter
* Last updated: 03-29-2010
* Compatible with IE, Opera, Chrome, Firefox
* Your comments and bugs to jquery.dev@enviomovil.com
* Based on http://yensdesign.com/2009/01/how-to-set-maxlength-textareas-by-creating-jquery-plugin/
*/
jQuery.fn.maxLength = function(max,class_container){
	//alert($(this).parent('div').find('.maxLenghtCount').html())
	var use_container = true;
	var type_container = 'div';
	var prev_message = '';
	var post_message = ' remaining';
	
	$(this).each(function(){
		//Get the type of the matched element
		var type = this.tagName.toLowerCase();
		var container = $(this).parent().find(type_container+'.'+class_container) ;

		//If the type property exists, save it in lower case
		var inputType = this.type ? this.type.toLowerCase() : null;
		
		//Check if is a input type=text OR type=password
		if (use_container){
			$(container).html(prev_message + (max - $(this).val().length)+post_message);
		}
		
		// Preset the max value if some text is by default
		$(this).val($(this).val().substring(0,max));
		
		// For Input text or password just set maxlength attr And count container
		if($(this).is('input') && ($(this).attr('type') == 'text' || $(this).attr('type') == 'password')){
			$(this).attr('maxlength',max);
			$(this).bind('keypress keydown keyup',function (){
				if (use_container){
					$(container).html(prev_message + (max - myText.length)+post_message);
				}
				return true;
			});
		}
		
		// For textarea (here comes the good stuff)
		else if ($(this).is('textarea')){
			$(this).bind('keypress keydown keyup',function (){
				var myText = $(this).val();
				if (myText.length > max){
					$(this).val(myText.substring(0,max));
					return false;
				}
				if (use_container){
					$(container).html(prev_message + (max - myText.length)+post_message);
				}
				return true;
			});
		}
	});
};