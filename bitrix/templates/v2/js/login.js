	/*****************************************************************
	 * ******************** AUTH & REGISTER **************************
	 *****************************************************************/

$(document).ready(function() {
	
	$("#form-recovery").css('display', 'none');

	$('#idLoginHref').overlay({
		top: '25%',
		mask: {color: '#000', loadSpeed: 200, opacity: 0.5},
		closeOnClick: true,
		onBeforeLoad: function() { 
			toggleLogenTab($('#loginform-login'));
		}
	});
	
	$('#idRegHref').overlay({
		top: '25%',
		mask: {color: '#000', loadSpeed: 200, opacity: 0.5},
		closeOnClick: true,
		onBeforeLoad: function() { 
			toggleLogenTab($('#loginform-reg'));
		}
	});
	
	if ($('#loginform-reg')) {
		$('#loginform-reg').click(function() {
			return toggleLogenTab(this);
		});
	}
	if ($('#loginform-login')) {
		$('#loginform-login').click(function() {
			return toggleLogenTab(this);
		});
	}
	
	function toggleLogenTab(element){
		if($(element).attr('class')=='b-loginform-content-tgoggle-actie') return false;
		$('.b-loginform-content-tcontent').each(function(index){
			if($(this).css('display')=='block') $(this).css('display', 'none'); else $(this).css('display', 'block');
		});
		$('.b-loginform-content-tgoggle li a').each(function(index){
			$(this).toggleClass('b-loginform-content-tgoggle-actie');
		}); 
		return false;
	}
	
	if ($('#idLogoutHref')) {
		$('#idLogoutHref').click(function() {
			if($('#form-logout')) {
				$('#form-logout').submit();
			}
			return false;
		});
	}
	if ($('#idRecoveryFormHref')) {
		$('#idRecoveryFormHref').click(function() {
			$("#form-recovery").css('display', 'block');
			$("#form-login").css('display', 'none');
			return false;
		});
	}
	if ($('#idLoginFormHref')) {
		$('#idLoginFormHref').click(function() {
			$("#form-recovery").css('display', 'none');
			$("#form-login").css('display', 'block');
			return false;
		});
	}
	
	if ($('#form-login-error').length) { // show login error
		$("#l-login-msg").html($("#form-login-error").val()).css('display', 'block');
		$('#idLoginHref').click();
		toggleLogenTab($('#loginform-login'));
	}

	$("#form-reg").validate({
		submitHandler : function(form) {
			form.submit();
		},
		invalidHandler: function(form, validator) {
		      var errors = validator.numberOfInvalids();
		      if(errors == 1 && validator.errorMap['REGISTER[EMAIL]'] == ' ') {
		    	  $("#l-login").val($("#r-login").val());
		    	  $("#l-pass").val($("#r-pass").val());
		    	  //toggleLogenTab($('#loginform-login'));
		    	  document.getElementById('form-login').submit();
		      }
		},
		onkeyup : false,
		//debug : true,
		rules : {
			'REGISTER[EMAIL]' : {
				required : true,
				email : true,
				remote: "/check_email.php"
			},
			'REGISTER[PASSWORD]' : {
				required : true,
				minlength : 6
			}
		},
		messages : {
			'REGISTER[EMAIL]' : {
				required : "Необходимо ввести E-mail",
				email : "Недопустимый формат E-mail",
				remote : " "
			},
			'REGISTER[PASSWORD]' : {
				required : "Необходимо ввести пароль",
				minlength : "Не менее 6 символов"
			}
		},
		errorPlacement : function(error, element) {
			if($("#" + element.attr('id') + "-msg").length) {
				$("#" + element.attr('id') + "-msg").css('display', 'none');
			}
			if(error.html() != ' ') error.insertAfter(element);
		}
	});
	
	$("#form-login").validate({
		submitHandler : function(form) {
			form.submit();
		},
		//debug : true,
		rules : {
			'USER_LOGIN' : {
				required : true
			},
			'USER_PASSWORD' : {
				required : true
			}
		},
		messages : {
			'USER_LOGIN' : {
				required : "Необходимо ввести E-mail",
				email : "Недопустимый формат E-mail",
				remote : "Аккаунт с таким адресом не зарегистрирован"
			},
			'USER_PASSWORD' : {
				required : "Необходимо ввести пароль"
			}
		},
		errorPlacement : function(error, element) {
			error.insertAfter(element);
		}
	});
	
	$("#form-recovery").validate({
		submitHandler : function(form) {
			form.submit();
		},
		//debug : true,
		rules : {
			'USER_LOGIN' : {
				required : true,
				email : true,
				remote: "/check_email.php"
			}
		},
		messages : {
			'USER_LOGIN' : {
				required : "Необходимо ввести логин (E-mail)",
				email : "Недопустимый формат E-mail",
				remote: "Аккаунт с таким адресом не зарегистрирован"
			}
		},
		errorPlacement : function(error, element) {
			//if($("#" + element.attr('id') + "-msg").length) {
			//	$("#" + element.attr('id') + "-msg").css('display', 'none');
			//}
			error.insertAfter(element);
		}
	});

	// если известен логин - подставим
	var LOGIN = $('#form-login-user-login').val();
	if (LOGIN != '')
	{
		$("#r-login, #l-login, #f-login").val(LOGIN);
	}

	// синхронизация полей
	$("#r-login, #l-login, #f-login").change(function(){
		$("#r-login, #l-login, #f-login").not(this).val($(this).val()).blur();
	});

	$("#r-login").defaultValue("Введите E-mail");
	$("#r-pass").defaultValue("******");
	$("#l-login").defaultValue("Ваш E-mail");
	$("#l-pass").defaultValue("******");
	$("#f-login").defaultValue("Ваш логин");
});