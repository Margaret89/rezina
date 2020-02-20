$(document).ready(function () {
// Табуляция
	if ($('.js-tabs-page').length) {
		if (!$('.js-tabs-page-item').hasClass('active')) {
			$('.js-tabs-page-list').each(function(){
				$(this).find('.js-tabs-page-item:first').addClass("active");
			});

			$('.js-tabs-page-content').each(function(){
				$(this).find('.js-tabs-page-content-item:first').addClass("active");
				$(this).find('.js-tabs-page-content-item:first').fadeIn();
			});
		}else{
			$('.js-tabs-page-content').find('#' + $('.js-tabs-page-item.active').attr('data-item')).addClass("active");
			$('.js-tabs-page-content').find('#' + $('.js-tabs-page-item.active').attr('data-item')).fadeIn();
		}

		$('.js-tabs-page-item').click(function(e) {
			e.preventDefault();
			var $parent = $(this).parents('.js-tabs-page');

			$parent.find('.js-tabs-page-content-item').hide();
			$parent.find('.js-tabs-page-content-item').removeClass('active');
			$parent.find('.js-tabs-page-item').removeClass('active');

			$(this).addClass("active");
			$parent.find('#' + $(this).attr('data-item')).addClass("active");
			$parent.find('#' + $(this).attr('data-item')).fadeIn();
		});
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

});