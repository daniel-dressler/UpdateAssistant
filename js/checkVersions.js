!function ( $ ) {

  "use strict"

  var $window = $(window)

  function CheckVersions( topbar, selector ) {
    this.$topbar = $(topbar)
    this.refresh()
  }

  CheckVersions.prototype = {

      refresh: function () {
		var cms = this.$topbar.attr('id');
		//cms version
		var cmsVersion = this.$topbar.find('.stableVersion').text();
		
		//has the version been found yet?
		if(!cmsVersion) {
			return;
		}
		
		
		this.$topbar.find('[data-uptodate=""]').each( function() {
			var row = $(this).parents('tr');
			var url = row.find('[data-url]').attr('data-url');
			var uptodateLabel = row.find('[data-uptodate]');
			var versionLabel = row.find('[data-version]');
			var siteVersion = versionLabel.attr('data-version');
			
			if(uptodateLabel &&  siteVersion && siteVersion != '?') {
				if(siteVersion < cmsVersion) {
					versionLabel.removeClass().addClass('label important');
					uptodateLabel.removeClass().addClass('label important').text('no');
					
					uptodateLabel.attr('data-uptodate',false);
					console.log(url+' is not up to date');
				} else {
					versionLabel.removeClass().addClass('label success');
					uptodateLabel.removeClass().addClass('label success').text('yes');
					
					uptodateLabel.attr('data-uptodate',true);
					console.log(url+' is up to date');
				}
				
				
			}
		});
      }
      
      
  }

  /* CHECK VERSIONS PLUGIN DEFINITION
   * =========================== */
  
  $.fn.checkVersions = function( options ) {
	return this.each(function () {
		$(this).data('checkversions', new CheckVersions( this, options ))
	})

  }

}( window.jQuery || window.ender );
