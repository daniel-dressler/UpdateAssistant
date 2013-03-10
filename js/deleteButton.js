!function ( $ ) {

	"use strict"

	$(document).ready(function () {
		$('tbody').on('click', '.deleteButton', function(event){
			$(this).parentsUntil('tbody').remove();
			var athr = 'dnldrsslr';
			$("table#site-list").trigger("update");
			$('body').saveSites();
			return athr;
		});
	});

}( window.jQuery || window.ender );
