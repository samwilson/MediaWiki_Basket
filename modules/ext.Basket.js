( function ( mw, oo ) {

	/**
	 * Create and show the basket panel at the bottom of the window.
	 */
	function main() {
		// Add the basket framework to the bottom of the page.
		$box = $("<div id='ext-basket' class='on'>" +
			"  <span class='handle'>" + mw.msg("basket") + "</span>" +
			"  <div class='inner'>" +
			"    <p>" + mw.msg("basket-contents", ["<span class=''>x</span>"]) + "</p>" +
			"    <ul></ul>" +
			"  </div>" +
			"</div>");
		$( 'body' ).append( $box );

		// Handle clicks on the handle.
		$("#ext-basket .handle").on('click', function() {
			var $basket = $("#ext-basket");
			if (!$basket.hasClass("on")) {
				turnOn($basket);
			} else {
				turnOff($basket);
			}
		}).click();
	}

	/**
	 * Turn Basket on.
	 */
	function turnOn($basket) {
		console.log("Turning basket on");
		$basket.addClass("on");
		$basket.css("bottom", "0");
		$("#mw-content-text a, #catlinks a").on('click', function(e) {
			e.preventDefault();
			addItem($(this).attr("href"));
			return false;
		} );
	}

	/**
	 * Turn Basket off.
	 */
	function turnOff($basket) {
		console.log("Turning basket off");
		$basket.removeClass("on");
		var basketHeight = $basket.outerHeight();
		var handleHeight = $basket.find(".handle").outerHeight();
		$basket.css("bottom", "-"+(basketHeight - handleHeight)+"px");
		$("#mw-content-text a").off('click');
	}

	/**
	 */
	function addItem(url) {
		// Only works with existing page links for now.
		var articlePath = mw.config.get("wgArticlePath").replace(/\$1/, "");
		var title = url.substr(articlePath.length);

		var api = new mw.Api();
		api.get( {
			action: 'query',
			prop: 'info',
			titles: title
		} ).done( function ( data ) {
			var pageInfo = data.query.pages[Object.keys(data.query.pages)[0]];
			var title = pageInfo.title;
			console.log(pageInfo);
			console.log("Adding " + title );
			$("#ext-basket ul").append("<li>"+title+"</li>");
		} ).fail( function() {
			console.log("Unable to get title from "+url);
		});
		
	}

	// Launch Basket.
	main();
}( mediaWiki, OO ) );
