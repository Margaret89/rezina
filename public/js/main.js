$(document).ready(function () {
// Табуляция
	tabPage('.js-tabs-page');
	tabPage('.js-tabs-inner');

	function tabPage(name) {
		if ($(name).length) {
			$(name+'-list').each(function(){
				$(this).find(name+'-item:first').addClass("active");
			});

			$(name+'-content').each(function(){
				$(this).find(name+'-content-item:first').fadeIn();
			});

			$(name+'-item').click(function(e) {
				e.preventDefault();
				var $parent = $(this).parents(name);

				$parent.find(name+'-content-item').hide();
				$parent.find(name+'-item').removeClass('active');

				$(this).addClass("active");
				$parent.find('#' + $(this).attr('data-item')).fadeIn();
			});
		}
	}

// Стилизация выпадающего списка
	if ($('.js-select').length) {
		$('.js-select').select2({
			minimumResultsForSearch: Infinity,
			 placeholder: function(){
				$(this).attr('data-placeholder');
			},
		});
	}

// Стрелка вверх
	$(window).scroll(function(){
		if($(this).scrollTop()>300){
			$('.js-move-up').addClass('visible');
		}else{
			$('.js-move-up').removeClass('visible');
		}
	});
	
	$('.js-move-up').click(function(){$('body,html').animate({scrollTop:0},800);return false;});

// Слайдер лозунгов
	$('.js-slider-post').slick({
		arrows: false,
		dots: true,
	});

});