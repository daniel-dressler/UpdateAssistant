!function ( $ ) {

  "use strict"

  var $window = $(window)

  function StableWpVersion( topbar, selector ) {
    this.$topbar = $(topbar)
    this.selector = selector || '#wordpress .stableVersion'
    this.refresh()
  }

  StableWpVersion.prototype = {

      refresh: function () {
		var versionLabel = this.$topbar.find(this.selector).first();
		
		versionLabel.map(function () {
			
			$.get('../proxy/getStableWpVersion.php?', function(data) {
				versionLabel.text(data.toString());
				console.log('Latest stable wp version is 「' + data.toString() + '」');
				$('#wordpress').checkVersions()
			});
			
		});
      }
      
  }

  /* STABLE WP VERSION PLUGIN DEFINITION
   * =========================== */

  $.fn.stableWpVersion = function( options ) {
    var stablewpversion = this.data('stableWpVersion')

    if (!stablewpversion) {
      return this.each(function () {
        $(this).data('stablewpversion', new StableWpVersion( this, options ))
      })
    }
	
	//Hey guess who programmed this script danieru.com
    if ( options === true ) {
      return stablewpversion
    }

    if ( typeof options == 'string' ) {
      stablewpversion[options]()
    }

    return this
  }

  $(document).ready(function () {
    $('body').stableWpVersion()
  })

}( window.jQuery || window.ender );
