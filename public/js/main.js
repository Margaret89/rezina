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

			var windowWidth = $(window).width();

			$(window).resize(function(){
				windowWidth = $(window).width();

				$(name).each(function(){
					console.log('11111');
					if ($(this).find('.js-tab-select').length) {
						console.log($(this));
						if (windowWidth < 768) {
							console.log('222');
							var dataTab = $(name+'-item.active').attr('data-item');
							console.log(dataTab);

							$(this).find('.js-tab-select option').removeAttr('selected');
							$(this).find('.js-tab-select option[data-item='+dataTab+']').attr('selected', 'selected')

							$(this).find('.js-tab-select').trigger('change');
						}
					}
				});
			});


			$(name+'-item').click(function(e) {
				e.preventDefault();
				var $parent = $(this).parents(name);
				var dataTab = $(this).attr('data-item');

				$parent.find(name+'-content-item').hide();
				$parent.find(name+'-item').removeClass('active');

				$(this).addClass("active");
				$parent.find('#' + dataTab).fadeIn();
			});

			$('.js-tab-select').change(function() {
				var $parent = $(this).parents(name);
				var dataTab = $(this).find('option:selected').data('item');

				$parent.find(name+'-content-item').hide();
				$parent.find(name+'-item').removeClass('active');

				$parent.find('[data-item ='+ dataTab+']').addClass("active");
				$parent.find('#' + dataTab).fadeIn();

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
	$('.js-slider-offer').slick({
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true,
				}
			},
		]
	});

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
					// dots: true,
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
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
					vertical: false,
					arrows: false,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3,
					vertical: false,
					arrows: false,
				}
			},
			{
				breakpoint: 420,
				settings: {
					slidesToShow: 2,
					vertical: false,
					arrows: false,
				}
			},
		]
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

// Добавление пункта "Еще" в меню
	var windowWidth = $(window).width();
	var arrWidthMenu = [];
	var moreMenu = false;

	$('.js-main-menu-item').each(function(index){
		var itemWidth = $(this).outerWidth();
		arrWidthMenu.push($(this).outerWidth());
	});

	addItemMenu();

	$('.js-main-menu').addClass('is-visible');

	$(window).resize(function(){
		windowWidth = $(window).width();
		addItemMenu();
	});

	function addItemMenu() {
		if (windowWidth >767) {
			var moreItemMenu = 100;
			var menuWidth = $('.js-main-menu-list').width() - moreItemMenu;
			var sumItemMenu = 0;

			for (var i = 0; i < arrWidthMenu.length; i++) {
				var $curItem = $('.js-main-menu-item[data-item='+ i +']');
				sumItemMenu = sumItemMenu + arrWidthMenu[i];

				// Добавляем пункт Еще и его подпункты
				if(sumItemMenu > menuWidth){
					$curItem.addClass('no-active');

					if (moreMenu == false) {
						$('.js-main-menu-list').append('<li class="main-menu__item js-menu-more">Еще<ul class="main-menu__more js-menu-more-sub"></ul></li>');
						moreMenu = true;
					}

					if (!$('.main-menu__more-item[data-item='+i+']').length) {
						$('.main-menu__more-item').attr('data-item')
						var $clone = $curItem.clone().appendTo(".js-menu-more-sub");
						$clone.removeClass('main-menu__item js-main-menu-item no-active');
						$clone.addClass('main-menu__more-item js-menu-more-item');
					}
				}else{
					$curItem.removeClass('no-active');
					$('.main-menu__more-item[data-item='+i+']').remove();
				}
			}

			// Удаляем пункт Еще, если все пункты вмещаются
			if ($('.js-menu-more-item').length == 0) {
				$('.js-menu-more').remove();
				moreMenu = false;
			}
		}else{
			if ($('.js-menu-more').length) {
				$('.js-main-menu-item').removeClass('no-active');
				$('.js-menu-more').remove();
				moreMenu = false;
			}
		}
	}

// Открыть/Закрыть мобильное меню, поиск и инфу
	openPopup('.js-open-menu', '.js-main-menu-mobile');
	openPopup('.js-btn-search', '.js-header-top-search');
	openPopup('.js-btn-call', '.js-header-middle');

	$('.js-close').click(function(){
		 closePopup();
	});

	$('.js-shadow').click(function(){
		closePopup();
	});

	function openPopup(btn, popup){
		$(btn).on('click', function(){
			$('.js-shadow').addClass('is-visible');
			$('.js-body').addClass('no-scroll');
			$('.js-header-top').addClass('open');
			$(popup).slideDown(200);
		});
	}

	function closePopup() {
		$('.js-shadow').removeClass('is-visible');
		$('.js-body').removeClass('no-scroll');
		$('.js-header-top').removeClass('open');
		$('.js-main-menu-mobile').slideUp(200);
		$('.js-header-top-search').slideUp(200);
		$('.js-header-middle').slideUp(200);
	}
});
