!function ( $ ) {

  "use strict"

  var $window = $(window)

  function UpdateUrls( topbar, selector ) {
    this.$topbar = $(topbar)
    this.refresh()
  }

  UpdateUrls.prototype = {

      refresh: function () {
		var cms = this.$topbar.attr('id');
		
		this.$topbar.find('#site-list tr').map(function () {
			var uptodateLabel = $(this).find('[data-url]');
			var url = uptodateLabel.attr('data-url');
			var adminUrl;
			
			if(cms==='wordpress') {
				adminUrl = 'http://'+url+'wp-admin/';
			} else {
				adminUrl = 'http://' + url;
			}
			uptodateLabel.html('<a href="'+adminUrl+'">'+url+'</a>');
			
		});
      }
      
      
  }

  /* CHECK VERSIONS PLUGIN DEFINITION
   * =========================== */

  $.fn.updateUrls = function( options ) {
    var updateurls = this.data('updateurls')

	return this.each(function () {
		$(this).data('updateurls', new UpdateUrls( this, options ))
	})


    if ( options === true ) {
      return updateurls
    }

    if ( typeof options == 'string' ) {
      updateurls[options]()
    }

    return this
  }

  $(document).ready(function () {
    $('.container .cmsCategory').updateUrls()
  })

}( window.jQuery || window.ender );
