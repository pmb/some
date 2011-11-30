$(document).ready(function(){
// Общие
	// сбрасываем значения полей, если установлен плейсхолдер
	$('form').submit(function(){
		$(this).find('.placeholder-on').blur().filter('.placeholder-on').val('');
	});

	if($('#topMenu-search-input')) $('#topMenu-search-input').blur(function(){expandInputBlock(this, '40px');});
	if($('#topMenu-search-input')) $('#topMenu-search-input').focus(function(){expandInputBlock(this, '120px');});
	if($('#idBottomPrev')) $('#idBottomPrev').click(function(){$('a.nivo-prevNav').click(); return false;});
	if($('#idBottomNext')) $('#idBottomNext').click(function(){$('a.nivo-nextNav').click(); return false;});
	if($('#b-mytest-open1')) $('#b-mytest-open1').click(function(){$('#b-mytest').toggle(); return false;});
	
	// popup фильтра по городу
	$('.b-giftLocation').filter('.m-location2right-catalog').each(function(){
		$(this).find('a:first').click(function(){
		$(this).parent().find('.b-giftLocation-list').toggle();
		return false;
		});
	});

	if($('.page_content2scroll')) $('.page_content2scroll').each(function(){$(this).jScrollPane({showArrows: true, verticalArrowPositions: 'after', autoReinitialise: true, autoReinitialiseDelay: 100});});
/* это делает валидатор
*if($('#btn-mynomunal')) $('#btn-mynomunal').click(function(){
		$('#othersumm').val($('#mysumm').val());
		$('.b-loginform').css('display', 'none');
		$('.b-loginform-2').css('display', 'none');
		return false;
	});*/
/*$('.validemail .email').each(function(){
		$(this).validator({
			format: 'email',
			invalidEmpty: true,
			error: function() {
				$('.validemail .emailerror').text('Пожалуйста, заполните правильно поле E-mail');
				$('.validemail input[name=valid]').val(0);
			}
		});
	});
	$('.validemail').submit(function(){
		if($('.validemail input[name=valid]').val()=='0') return false;
	});*/
	/*
	$(document).keydown(function(e){
		if(e.which==27){
			$('#topMenu-search-input').blur();
			$('.b-loginform').css('display', 'none');
			$('.b-loginform-2').css('display', 'none');
			if($('.b-giftLocation-list')) $('.b-giftLocation-list').each(function(){$(this).css('display', 'none');});
		}
	})
	*/
	if($('#idSelectCity')) cuSel({
		changedEl: '#idSelectCity',
		scrollArrows: false
	});
	if($('#idSelectCity2')) cuSel({
		changedEl: '#idSelectCity2',
		scrollArrows: false
	});
	if($('#idSelectCity3')) cuSel({
		changedEl: '#idSelectCity3',
		scrollArrows: false
	});
	if($('#idSelectCity4')) cuSel({
		changedEl: '#idSelectCity4',
		scrollArrows: false
	});

	if($('.b-catalog-centerblock-right-prev')) $('.b-catalog-centerblock-right-prev a').click(function(){
		$('#prevBtn a').click();
		return false;
	});
	if($('.b-catalog-centerblock-right-next')) $('.b-catalog-centerblock-right-next a').click(function(){
		$('#nextBtn a').click();
		return false;
	});
	$('input.num_only').keypress(function(e){
		if($.browser.msie)
			return isNum(e.keyCode)
		else
			return (e.keyCode) ? true : isNum(e.charCode)
	});

// Тестовый сертификат
$("#test-cert-popup form").validate({
	submitHandler : function(form){
		var email = $(form).find('input[name="email"]').val();
		var subscribe = $(form).find('input[name="subscribe"]').is(':checked') ? 1 : 0;
		var product = $('#detail-make-order-form').find('input[name="id"]').val();

		if (email)
		{
			$('#test-cert-popup-msg', form).html('Отправка...');
			$(':submit', form).css({'visibility': 'hidden'});
			$('#test-cert-popup-ctrls', form).hide();

			$.ajax({
				type: 'POST',
				url: "/ajax.php?action=sendtest",
				data: {'email': email, 'subscribe': subscribe, 'product': product},
				success: function(res){
					if (res == 'ok')
					{
						$('#test-cert-popup-msg').html('Тестовый сертификат отправлен на указанный адрес.');
					}
					else
					{
						$('#test-cert-popup-msg').html(res);
					}
					
					// trackEvent('test_certificate_send', '');
				},
				dataType: 'html'
			});
		}

		return false;
	},
	// debug : true,
	rules : {
		'email': {
			required : true,
			email: true
		}
	},
	messages : {
		'email' : {
			required : "Укажите e-mail",
			email : "Неверный формат"
		}
	},
	errorPlacement : function(error, element) {
		error.insertAfter(element);
	}
});

$('.show-test-cert-popup,#b-mytest-open2').overlay({
	top: '25%',
	mask: {color: '#000', loadSpeed: 200, opacity: 0.5},
	closeOnClick: true,
	onBeforeLoad: function(){
		var msg = 'Подарочный сертификат и поздравительная открытка с вашим текстом отправляются \
		получателю на электронный адрес в виде pdf-файла.<br /> Вы можете бесплатно отправить на \
		свой адрес тестовый сертификат, чтобы посмотреть, как это работает.';

		$('#test-cert-popup-msg').html(msg);
		$('#test-cert-popup form :submit').css({'visibility': 'visible'});
		$('#test-cert-popup-ctrls').show();
		// var email = $('#test-cert-popup form input[name="email"]').val();
		// if (email==' ')
		// {
			// email = $.ajax({type: 'GET', url: '/ajax.php?action=getemail', dataType: 'html', async: false}).responseText;
			// $('#test-cert-popup form input[name="email"]').val(email);
			// trackEvent('test_certificate', '');
		// }
	},
	onLoad: function(){ $('#test-cert-popup form input:first').focus().select(); }
});

$('#test-cert-popup form input[name="email"]').defaultValue('Введите электронный адрес');

	
	
// Первая страница
	$('#slider').nivoSlider({
		effect: 'slideInLeft',
		pauseTime: 5000,
		directionNavHide: false,
		keyboardNav: false
	});
	if($('#indexslider')) $('#indexslider').easySlider();

	
	
// Оформление
// перенесено в компонент

	
	
// Каталог
	if($('#catalog-centerblock-right-popgiftslist')) $('#catalog-centerblock-right-popgiftslist').easySlider();
	if($('.b-catalog-centerblock-left-select')) $('.b-catalog-centerblock-left-select label').each(function(){
		$(this).click(function(){
			$(this).toggleClass('b-catalog-centerblock-left-select-active');
		});
	});
	if($('.b-catalog-centerblock-right')){
		if($('.b-catalog-centerblock-right').height()>$('.b-catalog-centerblock-left').height()) $('.b-catalog-centerblock-left').height($('.b-catalog-centerblock-right').height());
		if($('.b-catalog-centerblock-right').height()<$('.b-catalog-centerblock-left').height()) $('.b-catalog-centerblock-right').height($('.b-catalog-centerblock-left').height());
	}
	if($('.b-catalog-centerblock-left')) $(window).scroll(function(){
		if($(window).scrollTop()>180){
			var tNum=($(window).height()+$(window).scrollTop()-$('body').height()+$('.b-footer').height()+($('#b-catalog-centerblock-left-inner').height()-$(window).height()+$('.b-footer').height()))*-1;
			$('#b-catalog-centerblock-left-inner').addClass('m-catalog-centerblock-left-fixed');
			if(tNum<0){
				$('#b-catalog-centerblock-left-inner').css('top', tNum+'px');
			} else {
				$('#b-catalog-centerblock-left-inner').css('top', '0px');
			}
		} else {
			$('#b-catalog-centerblock-left-inner').removeClass('m-catalog-centerblock-left-fixed');
		}
	});

	
	
// Блог
	if($('#id-blog-rightcolumn-inner')) $(window).scroll(function(){
		$('.b-blog-rightcolumn').height($('#id-blog-rightcolumn-inner').height()+'px');
		if($(window).scrollTop()>180){
			var xPos=($('#id-blog-rightcolumn-inner').offset()!=null)?$('#id-blog-rightcolumn-inner').offset().left:0;
			var tNum=($(window).height()+$(window).scrollTop()-$('body').height()+$('.b-footer').height()+($('#id-blog-rightcolumn-inner').height()-$(window).height()+$('.b-footer').height()))*-1;
			$('#id-blog-rightcolumn-inner').addClass('b-blog-rightcolumn-fixed');
			$('#id-blog-rightcolumn-inner').css('left', xPos);
			if(tNum<0){
				$('#id-blog-rightcolumn-inner').css('top', tNum+'px');
			} else {
				$('#id-blog-rightcolumn-inner').css('top', '0px');
			}
		} else {
			$('#id-blog-rightcolumn-inner').removeClass('b-blog-rightcolumn-fixed');
		}
	});

// Как это работает
	if($('.b-lookanother-more-buttons')) $('.b-lookanother-more-buttons li').each(function(){
		$('a', $(this)).click(function(){
			$('.b-lookanother-more-buttons li').each(function(){
				$(this).removeClass('b-lookanother-more-buttons-active');
			});
			$(this).parent().addClass('b-lookanother-more-buttons-active');
			$('.b-page-content-lablocks').each(function(){$(this).css('display', 'none');});
			$($(this).attr('href')).css('display', 'block');
			
			return false;
		});
	});
	if($('.b-whuitwork-steps-center')) $('.b-whuitwork-steps-center').each(function(){
		$(this).click(function(){
			$($('.b-whuitwork-steps-collaps', this).attr('href')).toggle();
			if($($('.b-whuitwork-steps-collaps', this).attr('href')).css('display')=='block') $('.b-whuitwork-steps-collaps', this).text('Свернуть'); else $('.b-whuitwork-steps-collaps', this).text('Развернуть');
			return false;
		});
	});
	
	//DEBUG
	$('xmp').click(function(){$(this).hide();});
});

// Функиции
function isNum(cCode){
	return /[0-9@\.]/.test(String.fromCharCode(cCode))
}

function expandInputBlock(element, wdt){
	if(element.value!='') return;
	
	var colorArr=Array('#fff', '#bbb', '#666', '#000');
	$(element).animate(
		{width: wdt},
		{
			duration: 400, 
			step: function(now, fx){
				$('.b-topMenu-search-first').css('backgroundPosition', '0px -'+Math.floor((now-41)/20)*20+'px'); 
				$('.b-topMenu-search-last').css('backgroundPosition', 'right -'+Math.floor((now-41)/20)*20+'px'); 
				$(this).css('backgroundPosition', '-20px -'+Math.floor((now-41)/20)*20+'px');
				$(this).css('color', colorArr[Math.floor((now-41)/20)]);
			}
		}
	);
}
