$(document).ready(function () {
// Табуляция
	tabPage('.js-tabs-page');
	tabPage('.js-tabs-inner');

	function tabPage(name) {
		if ($(name).length) {

			$(name).each(function(){
				if (!$(this).hasClass('js-tabs-no-active')) {
					$(this).find(name+'-item:first').addClass("active");
					$(this).find(name+'-content-item:first').fadeIn();
				}
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

// Слайдер предложений
	$('.js-slider-offer').slick();

// Переключение вида каталога
	if ($('.js-view-item').length) {
		$('.js-view-item').on('click', function(){
			var typeView = $(this).data('view');

			$('.js-view-item').removeClass('active');
			$(this).addClass('active');

			if (typeView =='table') {
				$('.js-catalog-list').addClass('catalog-list_table');
			} else {
				$('.js-catalog-list').removeClass('catalog-list_table');
			}
		});
	}

// Слайдер карточки товаров
	$('.js-product-slide-img').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		vertical: true,
		focusOnSelect: true,
		asNavFor: '.js-product-slide-thumb',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: true,
					vertical: false,
				}
			},
		]
	});

	$('.js-product-slide-thumb').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.js-product-slide-img',
		dots: false,
		arrows: true,
		vertical: true,
		focusOnSelect: true,
	});

// Счетчик
	if ($('.js-counter').length) {
		$('.js-counter-min').click(function(){
			var $countNum = $(this).siblings(".js-counter-input");

			if ($countNum.val() > 1) {
				$countNum.val(+$countNum.val() - 1);
			}
		});

		$('.js-counter-max').click(function(){
			var $countNum = $(this).siblings(".js-counter-input");
			$countNum.val(+$countNum.val() + 1);
		});
	}
});