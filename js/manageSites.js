!function ( $ ) {

	"use strict"
	
	function getSites() {
		var sites = [];
		$('tr').find('[data-url]').each(function() {
			sites.push($(this).attr('data-url'));
		});
		return sites;
	}
	
	function getStateJson(blank) {
		var state = {};
		state.ver = 1;
		state.blank = Number(blank);
		state.sites = getSites();
		return JSON.stringify(state);
	}
	
	function getJsonState(json) {
		var state = $.parseJSON(json);

		if(!(state.ver >= 1)) {
			throw 'Invalid state version of '+state.ver;
		}
		
		return state;
	}
	
	function getSitesFromStateJson(json) {
		var sites;
		
		try{
			var state = getJsonState(json);
			sites = state.sites;
		} catch(e) {
			sites = [];
		}
		
		return sites;
	}
	
	
	
	function addSite(url) {
		//clean url
		url = url.replace(/http[s]?:\/\//,'');
		url = url.replace(/\/$/,'');
		url = url + '/';
		
		//skip blank
		if(!url) {
			console.log('Skipping blank url');
			return false;
		}
		
		//skip duplicates
		if($('[data-url="'+url+'"]').length) {
			console.log('Skipping dup: '+url);
			return false;
		}
		
		var newEntry = "\
			<tr>\
				<td data-url='"+url+"' class='url'></td>\
				<td><span data-uptodate='' class='label '>maybe</span></td>\
				<td><span data-version='' class='label '>#</span></td>\
				<td class='deleteWrapper'><div class='deleteButton'>&times;</div></td>\
			</tr>";
		
		console.log('Adding '+url);
		$('#site-list tbody').append(newEntry);
		$('body').updateList();
		$('.container .cmsCategory').updateUrls();
		
		$("table#site-list").tablesorter({ sortList: [[0,0]] });
		$("table#site-list").trigger("update").trigger("sorton", [[[0,1]]]);
		$('body').saveSites();
	}
	
	function addSites(sites) {
		for(var i in sites) {
			addSite(sites[i]);
		}
	}
	
	function loadSitesHash() {
		var hash = window.location.hash;
		hash = decodeURIComponent(hash.substring(1));
		var sites = getSitesFromStateJson(hash);
		
		//was it a proper state?
		if(sites.length) {
			window.location.hash = '';
		}
		
		return sites;
	}
	
	function firstVisitState() {
		return '{"ver":1,"blank":0,"sites":["wordpress.org/news/","wordpress.com","danieru.com"]}'
	}
	
	function loadSitesLocal() {
		//first visit?
		if(!localStorage.getItem('state')) {
			localStorage.setItem('state', firstVisitState());
		}
		
		return getSitesFromStateJson(localStorage.getItem('state'));
	}
	
	function saveSitesLocal() {
		localStorage.setItem('state', getStateJson(0));
	}
	
	$.fn.saveSites = function( options ) {
		saveSitesLocal();
		return this;
	}
	
	
	function populateSiteList() {
		addSites(loadSitesHash());
		addSites(loadSitesLocal());
	}
	
	
	$(document).ready(function () {	
		

		//populate site list
		populateSiteList();
		
		
		//export button
		$('#exportModal').modal({backdrop:true});
		 
		$('#exportBtn').on('click', function(event){
			event.preventDefault();
			
			
			$('#exportedSiteJson').text(getStateJson(0));
			var exportModal = $('#exportModal').modal(true);
			exportModal.toggle();
		});
		
		
		//import button
		$('#importModal').modal({backdrop:true});
		 
		$('#importBtn').on('click', function(event){
			event.preventDefault();
			
			
			var importModal = $('#importModal').modal(true);
			importModal.toggle();
			
		});
		
		$('#importBtnFinal').on('click', function(event){
			event.preventDefault();
			var jsonState = $('#importJsonInput').val();
			var sites = getSitesFromStateJson(jsonState);
			addSites(sites);
		});
		
		
		//get url button
		$('#linkModal').modal({backdrop:true});
		 
		$('#linkBtn').on('click', function(event){
			console.log("Requesting short url");
			event.preventDefault();

			var dataUrl = document.URL + "#" + encodeURIComponent(getStateJson(0));
			
			console.log("Short url is 「"+dataUrl+"」");
			$('#exportedUrl').text(dataUrl);
			$('#exportedUrl').attr('href',dataUrl);
			
			var linkModal = $('#linkModal').modal(true);
			linkModal.toggle();
		});
		
		
		//add new sites button
		$('#rawSiteButton').on('click', function(event){
			event.preventDefault();
			
			var sites = $('#rawSiteInput').val().split(/[\n]+/);
			
			for(var i in sites) {
				addSite(sites[i]);
			}
		});
	});
}( window.jQuery || window.ender );

