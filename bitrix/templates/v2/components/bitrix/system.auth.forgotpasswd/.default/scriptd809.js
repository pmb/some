$(document).ready(function(){

	$(".content-block form").validate({
		// debug : true,
		onkeyup : false,
		rules : {
			'USER_LOGIN': {
				required : true,
				remote: '/check_email.php'
			}
		},
		messages : {
			'USER_LOGIN' : {
				required : "Укажите e-mail",
				remote: 'Аккаунт с таким адресом не зарегистрирован'
			}
		},
		errorPlacement : function(error, element) {
			error.insertAfter(element);
		}
	});	

	$('.content-block form input[name="USER_LOGIN"]').defaultValue('Введите электронный адрес');
});
