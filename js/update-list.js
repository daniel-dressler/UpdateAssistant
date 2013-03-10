!function ( $ ) {

  "use strict"

  var $window = $(window)

  function UpdateList( topbar, selector ) {
    this.$topbar = $(topbar)
    this.selector = selector || '#site-list'
    this.refresh()
  }

  UpdateList.prototype = {

      refresh: function () {
		this.$topbar.find(this.selector).find("[data-version='']").map(function () {
			var row = $(this).parents('tr').first();
			var url = row.find("[data-url]").attr('data-url');
			
			var versionLabel = row.find('[data-version]');
			
			//locks row so that other instances of updatelist do
			//not check this
			versionLabel.attr('data-version', '?');
						
			$.get('../backend/getSiteVersion.php?url=' + url, function(data) {
				var siteVersion = data.toString();
				
				if(siteVersion && !/WordPress.com/.test(siteVersion)) {
					siteVersion = siteVersion.match(/WordPress\s*(.*)/)[1];
				}
				
				console.log(url + ' is 「' + siteVersion + '」');
				
				
				//not a wp install or error
				if(!siteVersion) {
					siteVersion = '?'
				}
				
				versionLabel.text(siteVersion);
				versionLabel.attr('data-version', siteVersion);
				
				//calculate update-ness
				$('.container .cmsCategory').checkVersions()
			});
			
		});
      }
      
  }

  /* UPDATE LIST PLUGIN DEFINITION
   * =========================== */

  $.fn.updateList = function( options ) {
    var updatelist = this.data('updatelist')

    return this.each(function () {
        $(this).data('updatelist', new UpdateList( this, options ))
      })

    if ( options === true ) {
      return updatelist
    }

    if ( typeof options == 'string' ) {
      updatelist[options]()
    }

    return this
  }

  $(document).ready(function () {
    $('body').updateList()
  })

}( window.jQuery || window.ender );
