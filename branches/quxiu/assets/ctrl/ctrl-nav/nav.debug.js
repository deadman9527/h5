;(function(win, ctrl) {
	var $ = win['Zepto'];

	ctrl.nav = function() {
		var el = [
			'<div class="toolbar">',
				'<a href="javascript:void(0);" class="tool-main"></a>',
				'<a href="http://h5.quxiu.me/index.html" class="tool-home"></a>',
				'<a href="http://h5.quxiu.me/discover.html" class="tool-find"></a>',
				'<a href="http://h5.quxiu.me/cart.html" class="tool-cart"></a>',
				'<a href="http://h5.quxiu.me/myve.html" class="tool-my"></a>',
			'</div>'
		].join('');
		$(document.body).append(el);
		
		$('.tool-main').on('touchstart', function(e){
			$(this).closest('.toolbar').toggleClass('active');
			e.preventDefault();
		});
	}
	
	ctrl.nav();
})(window, window['ctrl'] || (window['ctrl'] = {}))