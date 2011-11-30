$(document).ready(function(){
	$('.content-block form').validate({
		// debug : true,
		onkeyup : false,
		rules : {
			'USER_LOGIN': {
				required : true,
				remote: '/check_email.php'
			},
			'USER_PASSWORD': {
				required : true
			},
		},
		messages : {
			'USER_LOGIN' : {
				required : 'Укажите e-mail',
				remote: 'Аккаунт с таким адресом не зарегистрирован'
			},
			'USER_PASSWORD': {
				required : 'Укажите пароль'
			},
		},
		errorPlacement : function(error, element) {
			error.insertAfter(element);
		}
	});

	$('.content-block a.register-link').click(function(){
		$('#idRegHref').click();
		return false;
	})
	.css({'text-decoration': 'none', 'border-bottom' : '1px dotted #1A3DC1'});

	$('.content-block form input[name="USER_LOGIN"]').defaultValue('Введите электронный адрес');
});
